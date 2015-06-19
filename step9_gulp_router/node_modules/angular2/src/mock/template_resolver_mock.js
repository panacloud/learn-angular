var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var view_1 = require('angular2/src/core/annotations_impl/view');
var template_resolver_1 = require('angular2/src/core/compiler/template_resolver');
var MockTemplateResolver = (function (_super) {
    __extends(MockTemplateResolver, _super);
    function MockTemplateResolver() {
        _super.call(this);
        this._views = collection_1.MapWrapper.create();
        this._inlineTemplates = collection_1.MapWrapper.create();
        this._viewCache = collection_1.MapWrapper.create();
        this._directiveOverrides = collection_1.MapWrapper.create();
    }
    /**
     * Overrides the {@link View} for a component.
     *
     * @param {Type} component
     * @param {ViewDefinition} view
     */
    MockTemplateResolver.prototype.setView = function (component, view) {
        this._checkOverrideable(component);
        collection_1.MapWrapper.set(this._views, component, view);
    };
    /**
     * Overrides the inline template for a component - other configuration remains unchanged.
     *
     * @param {Type} component
     * @param {string} template
     */
    MockTemplateResolver.prototype.setInlineTemplate = function (component, template) {
        this._checkOverrideable(component);
        collection_1.MapWrapper.set(this._inlineTemplates, component, template);
    };
    /**
     * Overrides a directive from the component {@link View}.
     *
     * @param {Type} component
     * @param {Type} from
     * @param {Type} to
     */
    MockTemplateResolver.prototype.overrideViewDirective = function (component, from, to) {
        this._checkOverrideable(component);
        var overrides = collection_1.MapWrapper.get(this._directiveOverrides, component);
        if (lang_1.isBlank(overrides)) {
            overrides = collection_1.MapWrapper.create();
            collection_1.MapWrapper.set(this._directiveOverrides, component, overrides);
        }
        collection_1.MapWrapper.set(overrides, from, to);
    };
    /**
     * Returns the {@link View} for a component:
     * - Set the {@link View} to the overridden view when it exists or fallback to the default
     * `TemplateResolver`,
     *   see `setView`.
     * - Override the directives, see `overrideViewDirective`.
     * - Override the @View definition, see `setInlineTemplate`.
     *
     * @param component
     * @returns {ViewDefinition}
     */
    MockTemplateResolver.prototype.resolve = function (component) {
        var view = collection_1.MapWrapper.get(this._viewCache, component);
        if (lang_1.isPresent(view))
            return view;
        view = collection_1.MapWrapper.get(this._views, component);
        if (lang_1.isBlank(view)) {
            view = _super.prototype.resolve.call(this, component);
        }
        if (lang_1.isBlank(view)) {
            // dynamic components
            return null;
        }
        var directives = view.directives;
        var overrides = collection_1.MapWrapper.get(this._directiveOverrides, component);
        if (lang_1.isPresent(overrides) && lang_1.isPresent(directives)) {
            directives = collection_1.ListWrapper.clone(view.directives);
            collection_1.MapWrapper.forEach(overrides, function (to, from) {
                var srcIndex = directives.indexOf(from);
                if (srcIndex == -1) {
                    throw new lang_1.BaseException("Overriden directive " + lang_1.stringify(from) + " not found in the template of " + lang_1.stringify(component));
                }
                directives[srcIndex] = to;
            });
            view = new view_1.View({ template: view.template, templateUrl: view.templateUrl, directives: directives });
        }
        var inlineTemplate = collection_1.MapWrapper.get(this._inlineTemplates, component);
        if (lang_1.isPresent(inlineTemplate)) {
            view = new view_1.View({ template: inlineTemplate, templateUrl: null, directives: view.directives });
        }
        collection_1.MapWrapper.set(this._viewCache, component, view);
        return view;
    };
    /**
     * Once a component has been compiled, the AppProtoView is stored in the compiler cache.
     *
     * Then it should not be possible to override the component configuration after the component
     * has been compiled.
     *
     * @param {Type} component
     */
    MockTemplateResolver.prototype._checkOverrideable = function (component) {
        var cached = collection_1.MapWrapper.get(this._viewCache, component);
        if (lang_1.isPresent(cached)) {
            throw new lang_1.BaseException("The component " + lang_1.stringify(component) + " has already been compiled, its configuration can not be changed");
        }
    };
    return MockTemplateResolver;
})(template_resolver_1.TemplateResolver);
exports.MockTemplateResolver = MockTemplateResolver;
exports.__esModule = true;
//# sourceMappingURL=template_resolver_mock.js.map