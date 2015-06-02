var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var di_1 = require('angular2/di');
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
var collection_1 = require('angular2/src/facade/collection');
var directive_resolver_1 = require('./directive_resolver');
var view_ref_1 = require('./view_ref');
var element_injector_1 = require('./element_injector');
var template_resolver_1 = require('./template_resolver');
var component_url_mapper_1 = require('./component_url_mapper');
var proto_view_factory_1 = require('./proto_view_factory');
var url_resolver_1 = require('angular2/src/services/url_resolver');
var renderApi = require('angular2/src/render/api');
/**
 * Cache that stores the AppProtoView of the template of a component.
 * Used to prevent duplicate work and resolve cyclic dependencies.
 */
var CompilerCache = (function () {
    function CompilerCache() {
        this._cache = collection_1.MapWrapper.create();
    }
    CompilerCache.prototype.set = function (component, protoView) {
        collection_1.MapWrapper.set(this._cache, component, protoView);
    };
    CompilerCache.prototype.get = function (component) {
        var result = collection_1.MapWrapper.get(this._cache, component);
        return lang_1.normalizeBlank(result);
    };
    CompilerCache.prototype.clear = function () { collection_1.MapWrapper.clear(this._cache); };
    CompilerCache = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CompilerCache);
    return CompilerCache;
})();
exports.CompilerCache = CompilerCache;
/**
 * @exportedAs angular2/view
 */
var Compiler = (function () {
    function Compiler(reader, cache, templateResolver, componentUrlMapper, urlResolver, render, protoViewFactory) {
        this._reader = reader;
        this._compilerCache = cache;
        this._compiling = collection_1.MapWrapper.create();
        this._templateResolver = templateResolver;
        this._componentUrlMapper = componentUrlMapper;
        this._urlResolver = urlResolver;
        this._appUrl = urlResolver.resolve(null, './');
        this._render = render;
        this._protoViewFactory = protoViewFactory;
    }
    Compiler.prototype._bindDirective = function (directiveTypeOrBinding) {
        if (directiveTypeOrBinding instanceof element_injector_1.DirectiveBinding) {
            return directiveTypeOrBinding;
        }
        else if (directiveTypeOrBinding instanceof di_1.Binding) {
            var annotation = this._reader.resolve(directiveTypeOrBinding.token);
            return element_injector_1.DirectiveBinding.createFromBinding(directiveTypeOrBinding, annotation);
        }
        else {
            var annotation = this._reader.resolve(directiveTypeOrBinding);
            return element_injector_1.DirectiveBinding.createFromType(directiveTypeOrBinding, annotation);
        }
    };
    // Create a hostView as if the compiler encountered <hostcmp></hostcmp>.
    // Used for bootstrapping.
    Compiler.prototype.compileInHost = function (componentTypeOrBinding) {
        var _this = this;
        var componentBinding = this._bindDirective(componentTypeOrBinding);
        Compiler._assertTypeIsComponent(componentBinding);
        var directiveMetadata = componentBinding.metadata;
        return this._render.compileHost(directiveMetadata)
            .then(function (hostRenderPv) {
            return _this._compileNestedProtoViews(componentBinding, hostRenderPv, [componentBinding]);
        })
            .then(function (appProtoView) { return new view_ref_1.ProtoViewRef(appProtoView); });
    };
    Compiler.prototype.compile = function (component) {
        var componentBinding = this._bindDirective(component);
        Compiler._assertTypeIsComponent(componentBinding);
        var pvOrPromise = this._compile(componentBinding);
        var pvPromise = async_1.PromiseWrapper.isPromise(pvOrPromise) ? pvOrPromise :
            async_1.PromiseWrapper.resolve(pvOrPromise);
        return pvPromise.then(function (appProtoView) { return new view_ref_1.ProtoViewRef(appProtoView); });
    };
    Compiler.prototype._compile = function (componentBinding) {
        var _this = this;
        var component = componentBinding.key.token;
        var protoView = this._compilerCache.get(component);
        if (lang_1.isPresent(protoView)) {
            // The component has already been compiled into an AppProtoView,
            // returns a plain AppProtoView, not wrapped inside of a Promise.
            // Needed for recursive components.
            return protoView;
        }
        var pvPromise = collection_1.MapWrapper.get(this._compiling, component);
        if (lang_1.isPresent(pvPromise)) {
            // The component is already being compiled, attach to the existing Promise
            // instead of re-compiling the component.
            // It happens when a template references a component multiple times.
            return pvPromise;
        }
        var template = this._templateResolver.resolve(component);
        if (lang_1.isBlank(template)) {
            return null;
        }
        var directives = this._flattenDirectives(template);
        for (var i = 0; i < directives.length; i++) {
            if (!Compiler._isValidDirective(directives[i])) {
                throw new lang_1.BaseException("Unexpected directive value '" + lang_1.stringify(directives[i]) + "' on the View of component '" + lang_1.stringify(component) + "'");
            }
        }
        var boundDirectives = collection_1.ListWrapper.map(directives, function (directive) { return _this._bindDirective(directive); });
        var renderTemplate = this._buildRenderTemplate(component, template, boundDirectives);
        pvPromise =
            this._render.compile(renderTemplate)
                .then(function (renderPv) {
                return _this._compileNestedProtoViews(componentBinding, renderPv, boundDirectives);
            });
        collection_1.MapWrapper.set(this._compiling, component, pvPromise);
        return pvPromise;
    };
    Compiler.prototype._compileNestedProtoViews = function (componentBinding, renderPv, directives) {
        var _this = this;
        var protoViews = this._protoViewFactory.createAppProtoViews(componentBinding, renderPv, directives);
        var protoView = protoViews[0];
        // TODO(tbosch): we should be caching host protoViews as well!
        // -> need a separate cache for this...
        if (renderPv.type === renderApi.ProtoViewDto.COMPONENT_VIEW_TYPE &&
            lang_1.isPresent(componentBinding)) {
            // Populate the cache before compiling the nested components,
            // so that components can reference themselves in their template.
            var component = componentBinding.key.token;
            this._compilerCache.set(component, protoView);
            collection_1.MapWrapper.delete(this._compiling, component);
        }
        var nestedPVPromises = [];
        collection_1.ListWrapper.forEach(this._collectComponentElementBinders(protoViews), function (elementBinder) {
            var nestedComponent = elementBinder.componentDirective;
            var elementBinderDone = function (nestedPv) {
                elementBinder.nestedProtoView = nestedPv;
            };
            var nestedCall = _this._compile(nestedComponent);
            if (async_1.PromiseWrapper.isPromise(nestedCall)) {
                collection_1.ListWrapper.push(nestedPVPromises, nestedCall.then(elementBinderDone));
            }
            else if (lang_1.isPresent(nestedCall)) {
                elementBinderDone(nestedCall);
            }
        });
        if (nestedPVPromises.length > 0) {
            return async_1.PromiseWrapper.all(nestedPVPromises).then(function (_) { return protoView; });
        }
        else {
            return protoView;
        }
    };
    Compiler.prototype._collectComponentElementBinders = function (protoViews) {
        var componentElementBinders = [];
        collection_1.ListWrapper.forEach(protoViews, function (protoView) {
            collection_1.ListWrapper.forEach(protoView.elementBinders, function (elementBinder) {
                if (lang_1.isPresent(elementBinder.componentDirective)) {
                    collection_1.ListWrapper.push(componentElementBinders, elementBinder);
                }
            });
        });
        return componentElementBinders;
    };
    Compiler.prototype._buildRenderTemplate = function (component, view, directives) {
        var componentUrl = this._urlResolver.resolve(this._appUrl, this._componentUrlMapper.getUrl(component));
        var templateAbsUrl = null;
        if (lang_1.isPresent(view.templateUrl)) {
            templateAbsUrl = this._urlResolver.resolve(componentUrl, view.templateUrl);
        }
        else if (lang_1.isPresent(view.template)) {
            // Note: If we have an inline template, we also need to send
            // the url for the component to the render so that it
            // is able to resolve urls in stylesheets.
            templateAbsUrl = componentUrl;
        }
        return new renderApi.ViewDefinition({
            componentId: lang_1.stringify(component),
            absUrl: templateAbsUrl, template: view.template,
            directives: collection_1.ListWrapper.map(directives, function (directiveBinding) { return directiveBinding.metadata; })
        });
    };
    Compiler.prototype._flattenDirectives = function (template) {
        if (lang_1.isBlank(template.directives))
            return [];
        var directives = [];
        this._flattenList(template.directives, directives);
        return directives;
    };
    Compiler.prototype._flattenList = function (tree, out) {
        for (var i = 0; i < tree.length; i++) {
            var item = di_1.resolveForwardRef(tree[i]);
            if (collection_1.ListWrapper.isList(item)) {
                this._flattenList(item, out);
            }
            else {
                collection_1.ListWrapper.push(out, item);
            }
        }
    };
    Compiler._isValidDirective = function (value) {
        return lang_1.isPresent(value) && (value instanceof lang_1.Type || value instanceof di_1.Binding);
    };
    Compiler._assertTypeIsComponent = function (directiveBinding) {
        if (directiveBinding.metadata.type !== renderApi.DirectiveMetadata.COMPONENT_TYPE) {
            throw new lang_1.BaseException("Could not load '" + lang_1.stringify(directiveBinding.key.token) + "' because it is not a component.");
        }
    };
    Compiler = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [directive_resolver_1.DirectiveResolver, CompilerCache, template_resolver_1.TemplateResolver, component_url_mapper_1.ComponentUrlMapper, url_resolver_1.UrlResolver, renderApi.RenderCompiler, proto_view_factory_1.ProtoViewFactory])
    ], Compiler);
    return Compiler;
})();
exports.Compiler = Compiler;
exports.__esModule = true;
//# sourceMappingURL=compiler.js.map