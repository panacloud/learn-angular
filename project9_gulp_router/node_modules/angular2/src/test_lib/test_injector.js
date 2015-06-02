var di_1 = require('angular2/di');
var compiler_1 = require('angular2/src/core/compiler/compiler');
var reflection_1 = require('angular2/src/reflection/reflection');
var change_detection_1 = require('angular2/change_detection');
var exception_handler_1 = require('angular2/src/core/exception_handler');
var template_loader_1 = require('angular2/src/render/dom/compiler/template_loader');
var template_resolver_1 = require('angular2/src/core/compiler/template_resolver');
var directive_resolver_1 = require('angular2/src/core/compiler/directive_resolver');
var dynamic_component_loader_1 = require('angular2/src/core/compiler/dynamic_component_loader');
var shadow_dom_strategy_1 = require('angular2/src/render/dom/shadow_dom/shadow_dom_strategy');
var emulated_unscoped_shadow_dom_strategy_1 = require('angular2/src/render/dom/shadow_dom/emulated_unscoped_shadow_dom_strategy');
var xhr_1 = require('angular2/src/services/xhr');
var component_url_mapper_1 = require('angular2/src/core/compiler/component_url_mapper');
var url_resolver_1 = require('angular2/src/services/url_resolver');
var style_url_resolver_1 = require('angular2/src/render/dom/shadow_dom/style_url_resolver');
var style_inliner_1 = require('angular2/src/render/dom/shadow_dom/style_inliner');
var ng_zone_1 = require('angular2/src/core/zone/ng_zone');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var event_manager_1 = require('angular2/src/render/dom/events/event_manager');
var template_resolver_mock_1 = require('angular2/src/mock/template_resolver_mock');
var xhr_mock_1 = require('angular2/src/mock/xhr_mock');
var ng_zone_mock_1 = require('angular2/src/mock/ng_zone_mock');
var test_bed_1 = require('./test_bed');
var di_2 = require('angular2/di');
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var view_pool_1 = require('angular2/src/core/compiler/view_pool');
var view_manager_1 = require('angular2/src/core/compiler/view_manager');
var view_manager_utils_1 = require('angular2/src/core/compiler/view_manager_utils');
var proto_view_factory_1 = require('angular2/src/core/compiler/proto_view_factory');
var api_1 = require('angular2/src/render/api');
var dom_renderer_1 = require('angular2/src/render/dom/dom_renderer');
var compiler_2 = require('angular2/src/render/dom/compiler/compiler');
/**
 * Returns the root injector bindings.
 *
 * This must be kept in sync with the _rootBindings in application.js
 *
 * @returns {any[]}
 */
function _getRootBindings() {
    return [
        di_1.bind(reflection_1.Reflector)
            .toValue(reflection_1.reflector),
    ];
}
/**
 * Returns the application injector bindings.
 *
 * This must be kept in sync with _injectorBindings() in application.js
 *
 * @returns {any[]}
 */
function _getAppBindings() {
    var appDoc;
    // The document is only available in browser environment
    try {
        appDoc = dom_adapter_1.DOM.defaultDoc();
    }
    catch (e) {
        appDoc = null;
    }
    return [
        di_1.bind(dom_renderer_1.DOCUMENT_TOKEN)
            .toValue(appDoc),
        di_1.bind(shadow_dom_strategy_1.ShadowDomStrategy)
            .toFactory(function (styleUrlResolver, doc) {
            return new emulated_unscoped_shadow_dom_strategy_1.EmulatedUnscopedShadowDomStrategy(styleUrlResolver, doc.head);
        }, [style_url_resolver_1.StyleUrlResolver, dom_renderer_1.DOCUMENT_TOKEN]),
        dom_renderer_1.DomRenderer,
        compiler_2.DefaultDomCompiler,
        di_1.bind(api_1.Renderer).toAlias(dom_renderer_1.DomRenderer),
        di_1.bind(api_1.RenderCompiler).toAlias(compiler_2.DefaultDomCompiler),
        proto_view_factory_1.ProtoViewFactory,
        view_pool_1.AppViewPool,
        view_manager_1.AppViewManager,
        view_manager_utils_1.AppViewManagerUtils,
        di_1.bind(view_pool_1.APP_VIEW_POOL_CAPACITY).toValue(500),
        compiler_1.Compiler,
        compiler_1.CompilerCache,
        di_1.bind(template_resolver_1.TemplateResolver).toClass(template_resolver_mock_1.MockTemplateResolver),
        di_1.bind(change_detection_1.PipeRegistry).toValue(change_detection_1.defaultPipeRegistry),
        di_1.bind(change_detection_1.ChangeDetection).toClass(change_detection_1.DynamicChangeDetection),
        template_loader_1.TemplateLoader,
        dynamic_component_loader_1.DynamicComponentLoader,
        directive_resolver_1.DirectiveResolver,
        change_detection_1.Parser,
        change_detection_1.Lexer,
        exception_handler_1.ExceptionHandler,
        di_1.bind(xhr_1.XHR).toClass(xhr_mock_1.MockXHR),
        component_url_mapper_1.ComponentUrlMapper,
        url_resolver_1.UrlResolver,
        style_url_resolver_1.StyleUrlResolver,
        style_inliner_1.StyleInliner,
        test_bed_1.TestBed,
        di_1.bind(ng_zone_1.NgZone).toClass(ng_zone_mock_1.MockNgZone),
        di_1.bind(event_manager_1.EventManager)
            .toFactory(function (zone) {
            var plugins = [
                new event_manager_1.DomEventsPlugin(),
            ];
            return new event_manager_1.EventManager(plugins, zone);
        }, [ng_zone_1.NgZone]),
    ];
}
function createTestInjector(bindings) {
    var rootInjector = di_2.Injector.resolveAndCreate(_getRootBindings());
    return rootInjector.resolveAndCreateChild(collection_1.ListWrapper.concat(_getAppBindings(), bindings));
}
exports.createTestInjector = createTestInjector;
/**
 * Allows injecting dependencies in `beforeEach()` and `it()`.
 *
 * Example:
 *
 * ```
 * beforeEach(inject([Dependency, AClass], (dep, object) => {
 *   // some code that uses `dep` and `object`
 *   // ...
 * }));
 *
 * it('...', inject([AClass, AsyncTestCompleter], (object, async) => {
 *   object.doSomething().then(() => {
 *     expect(...);
 *     async.done();
 *   });
 * })
 * ```
 *
 * Notes:
 * - injecting an `AsyncTestCompleter` allow completing async tests - this is the equivalent of
 *   adding a `done` parameter in Jasmine,
 * - inject is currently a function because of some Traceur limitation the syntax should eventually
 *   becomes `it('...', @Inject (object: AClass, async: AsyncTestCompleter) => { ... });`
 *
 * @param {Array} tokens
 * @param {Function} fn
 * @return {FunctionWithParamTokens}
 * @exportedAs angular2/test
 */
function inject(tokens, fn) {
    return new FunctionWithParamTokens(tokens, fn);
}
exports.inject = inject;
var FunctionWithParamTokens = (function () {
    function FunctionWithParamTokens(tokens, fn) {
        this._tokens = tokens;
        this._fn = fn;
    }
    FunctionWithParamTokens.prototype.execute = function (injector) {
        var params = collection_1.ListWrapper.map(this._tokens, function (t) { return injector.get(t); });
        lang_1.FunctionWrapper.apply(this._fn, params);
    };
    return FunctionWithParamTokens;
})();
exports.FunctionWithParamTokens = FunctionWithParamTokens;
exports.__esModule = true;
//# sourceMappingURL=test_injector.js.map