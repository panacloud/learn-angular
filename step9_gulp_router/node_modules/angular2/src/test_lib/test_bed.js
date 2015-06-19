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
var lang_2 = require('angular2/src/facade/lang');
var template_resolver_1 = require('angular2/src/core/compiler/template_resolver');
var view_ref_1 = require('angular2/src/core/compiler/view_ref');
var dynamic_component_loader_1 = require('angular2/src/core/compiler/dynamic_component_loader');
var utils_1 = require('./utils');
var lang_utils_1 = require('./lang_utils');
var dom_renderer_1 = require('angular2/src/render/dom/dom_renderer');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
/**
 * @exportedAs angular2/test
 * TODO(juliemr): Deprecate in favor of TestComponentBuilder
 */
var TestBed = (function () {
    function TestBed(injector) {
        this._injector = injector;
    }
    /**
     * Overrides the {@link View} of a {@link Component}.
     *
     * @see setInlineTemplate() to only override the html
     *
     * @param {Type} component
     * @param {ViewDefinition} template
     */
    TestBed.prototype.overrideView = function (component, template) {
        this._injector.get(template_resolver_1.TemplateResolver).setView(component, template);
    };
    /**
     * Overrides only the html of a {@link Component}.
     * All the other propoerties of the component's {@link View} are preserved.
     *
     * @param {Type} component
     * @param {string} html
     */
    TestBed.prototype.setInlineTemplate = function (component, html) {
        this._injector.get(template_resolver_1.TemplateResolver).setInlineTemplate(component, html);
    };
    /**
     * Overrides the directives from the component {@link View}.
     *
     * @param {Type} component
     * @param {Type} from
     * @param {Type} to
     */
    TestBed.prototype.overrideDirective = function (component, from, to) {
        this._injector.get(template_resolver_1.TemplateResolver).overrideViewDirective(component, from, to);
    };
    /**
     * Creates an `AppView` for the given component.
     *
     * Only either a component or a context needs to be specified but both can be provided for
     * advanced use cases (ie subclassing the context).
     *
     * @param {Type} component
     * @param {*} context
     * @param {string} html Use as the component template when specified (shortcut for
     * setInlineTemplate)
     * @return {Promise<ViewProxy>}
     */
    TestBed.prototype.createView = function (component, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.context, context = _c === void 0 ? null : _c, _d = _b.html, html = _d === void 0 ? null : _d;
        if (lang_2.isBlank(component) && lang_2.isBlank(context)) {
            throw new lang_1.BaseException('You must specified at least a component or a context');
        }
        if (lang_2.isBlank(component)) {
            component = lang_utils_1.getTypeOf(context);
        }
        else if (lang_2.isBlank(context)) {
            context = lang_utils_1.instantiateType(component);
        }
        if (lang_1.isPresent(html)) {
            this.setInlineTemplate(component, html);
        }
        var doc = this._injector.get(dom_renderer_1.DOCUMENT_TOKEN);
        var rootEl = utils_1.el('<div id="root"></div>');
        dom_adapter_1.DOM.appendChild(doc.body, rootEl);
        var componentBinding = di_1.bind(component).toValue(context);
        return this._injector.get(dynamic_component_loader_1.DynamicComponentLoader)
            .loadAsRoot(componentBinding, '#root', this._injector)
            .then(function (hostComponentRef) { return new ViewProxy(hostComponentRef); });
    };
    TestBed = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [di_1.Injector])
    ], TestBed);
    return TestBed;
})();
exports.TestBed = TestBed;
/**
 * Proxy to `AppView` return by `createView` in {@link TestBed} which offers a high level API for
 * tests.
 * TODO(juliemr): Deprecate in favor of TestElement
 */
var ViewProxy = (function () {
    function ViewProxy(componentRef) {
        this._componentRef = componentRef;
        this._view = view_ref_1.internalView(componentRef.hostView).componentChildViews[0];
    }
    Object.defineProperty(ViewProxy.prototype, "context", {
        get: function () { return this._view.context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewProxy.prototype, "rootNodes", {
        get: function () { return utils_1.viewRootNodes(this._view); },
        enumerable: true,
        configurable: true
    });
    ViewProxy.prototype.detectChanges = function () {
        this._view.changeDetector.detectChanges();
        this._view.changeDetector.checkNoChanges();
    };
    ViewProxy.prototype.querySelector = function (selector) { return utils_1.queryView(this._view, selector); };
    ViewProxy.prototype.destroy = function () { this._componentRef.dispose(); };
    Object.defineProperty(ViewProxy.prototype, "rawView", {
        /**
         * @returns `AppView` returns the underlying `AppView`.
         *
         * Prefer using the other methods which hide implementation details.
         */
        get: function () { return this._view; },
        enumerable: true,
        configurable: true
    });
    return ViewProxy;
})();
exports.ViewProxy = ViewProxy;
exports.__esModule = true;
//# sourceMappingURL=test_bed.js.map