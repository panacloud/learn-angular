var di_1 = require('angular2/di');
var lang_1 = require('angular2/src/facade/lang');
var browser_adapter_1 = require('angular2/src/dom/browser_adapter');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var compiler_1 = require('./compiler/compiler');
var reflection_1 = require('angular2/src/reflection/reflection');
var change_detection_1 = require('angular2/change_detection');
var exception_handler_1 = require('./exception_handler');
var template_loader_1 = require('angular2/src/render/dom/compiler/template_loader');
var template_resolver_1 = require('./compiler/template_resolver');
var directive_resolver_1 = require('./compiler/directive_resolver');
var collection_1 = require('angular2/src/facade/collection');
var async_1 = require('angular2/src/facade/async');
var ng_zone_1 = require('angular2/src/core/zone/ng_zone');
var life_cycle_1 = require('angular2/src/core/life_cycle/life_cycle');
var shadow_dom_strategy_1 = require('angular2/src/render/dom/shadow_dom/shadow_dom_strategy');
var emulated_unscoped_shadow_dom_strategy_1 = require('angular2/src/render/dom/shadow_dom/emulated_unscoped_shadow_dom_strategy');
var xhr_1 = require('angular2/src/services/xhr');
var xhr_impl_1 = require('angular2/src/services/xhr_impl');
var event_manager_1 = require('angular2/src/render/dom/events/event_manager');
var key_events_1 = require('angular2/src/render/dom/events/key_events');
var hammer_gestures_1 = require('angular2/src/render/dom/events/hammer_gestures');
var component_url_mapper_1 = require('angular2/src/core/compiler/component_url_mapper');
var url_resolver_1 = require('angular2/src/services/url_resolver');
var style_url_resolver_1 = require('angular2/src/render/dom/shadow_dom/style_url_resolver');
var style_inliner_1 = require('angular2/src/render/dom/shadow_dom/style_inliner');
var dynamic_component_loader_1 = require('angular2/src/core/compiler/dynamic_component_loader');
var testability_1 = require('angular2/src/core/testability/testability');
var view_pool_1 = require('angular2/src/core/compiler/view_pool');
var view_manager_1 = require('angular2/src/core/compiler/view_manager');
var view_manager_utils_1 = require('angular2/src/core/compiler/view_manager_utils');
var proto_view_factory_1 = require('angular2/src/core/compiler/proto_view_factory');
var api_1 = require('angular2/src/render/api');
var dom_renderer_1 = require('angular2/src/render/dom/dom_renderer');
var view_1 = require('angular2/src/render/dom/view/view');
var compiler_2 = require('angular2/src/render/dom/compiler/compiler');
var view_ref_1 = require('angular2/src/core/compiler/view_ref');
var application_tokens_1 = require('./application_tokens');
var _rootInjector;
// Contains everything that is safe to share between applications.
var _rootBindings = [di_1.bind(reflection_1.Reflector).toValue(reflection_1.reflector), testability_1.TestabilityRegistry];
function _injectorBindings(appComponentType) {
    return [
        di_1.bind(dom_renderer_1.DOCUMENT_TOKEN)
            .toValue(dom_adapter_1.DOM.defaultDoc()),
        di_1.bind(application_tokens_1.appComponentTypeToken).toValue(appComponentType),
        di_1.bind(application_tokens_1.appComponentRefToken)
            .toAsyncFactory(function (dynamicComponentLoader, injector, testability, registry) {
            // TODO(rado): investigate whether to support bindings on root component.
            return dynamicComponentLoader.loadAsRoot(appComponentType, null, injector)
                .then(function (componentRef) {
                var domView = view_1.resolveInternalDomView(componentRef.hostView.render);
                // We need to do this here to ensure that we create Testability and
                // it's ready on the window for users.
                registry.registerApplication(domView.boundElements[0], testability);
                return componentRef;
            });
        }, [dynamic_component_loader_1.DynamicComponentLoader, di_1.Injector, testability_1.Testability, testability_1.TestabilityRegistry]),
        di_1.bind(appComponentType).toFactory(function (ref) { return ref.instance; }, [application_tokens_1.appComponentRefToken]),
        di_1.bind(life_cycle_1.LifeCycle)
            .toFactory(function (exceptionHandler) { return new life_cycle_1.LifeCycle(exceptionHandler, null, lang_1.assertionsEnabled()); }, [exception_handler_1.ExceptionHandler]),
        di_1.bind(event_manager_1.EventManager)
            .toFactory(function (ngZone) {
            var plugins = [new hammer_gestures_1.HammerGesturesPlugin(), new key_events_1.KeyEventsPlugin(), new event_manager_1.DomEventsPlugin()];
            return new event_manager_1.EventManager(plugins, ngZone);
        }, [ng_zone_1.NgZone]),
        di_1.bind(shadow_dom_strategy_1.ShadowDomStrategy)
            .toFactory(function (styleUrlResolver, doc) {
            return new emulated_unscoped_shadow_dom_strategy_1.EmulatedUnscopedShadowDomStrategy(styleUrlResolver, doc.head);
        }, [style_url_resolver_1.StyleUrlResolver, dom_renderer_1.DOCUMENT_TOKEN]),
        // TODO(tbosch): We need an explicit factory here, as
        // we are getting errors in dart2js with mirrors...
        di_1.bind(dom_renderer_1.DomRenderer)
            .toFactory(function (eventManager, shadowDomStrategy, doc) {
            return new dom_renderer_1.DomRenderer(eventManager, shadowDomStrategy, doc);
        }, [event_manager_1.EventManager, shadow_dom_strategy_1.ShadowDomStrategy, dom_renderer_1.DOCUMENT_TOKEN]),
        compiler_2.DefaultDomCompiler,
        di_1.bind(api_1.Renderer).toAlias(dom_renderer_1.DomRenderer),
        di_1.bind(api_1.RenderCompiler).toAlias(compiler_2.DefaultDomCompiler),
        proto_view_factory_1.ProtoViewFactory,
        // TODO(tbosch): We need an explicit factory here, as
        // we are getting errors in dart2js with mirrors...
        di_1.bind(view_pool_1.AppViewPool).toFactory(function (capacity) { return new view_pool_1.AppViewPool(capacity); }, [view_pool_1.APP_VIEW_POOL_CAPACITY]),
        di_1.bind(view_pool_1.APP_VIEW_POOL_CAPACITY).toValue(10000),
        view_manager_1.AppViewManager,
        view_manager_utils_1.AppViewManagerUtils,
        compiler_1.Compiler,
        compiler_1.CompilerCache,
        template_resolver_1.TemplateResolver,
        di_1.bind(change_detection_1.PipeRegistry).toValue(change_detection_1.defaultPipeRegistry),
        di_1.bind(change_detection_1.ChangeDetection).toClass(change_detection_1.DynamicChangeDetection),
        template_loader_1.TemplateLoader,
        directive_resolver_1.DirectiveResolver,
        change_detection_1.Parser,
        change_detection_1.Lexer,
        exception_handler_1.ExceptionHandler,
        di_1.bind(xhr_1.XHR).toValue(new xhr_impl_1.XHRImpl()),
        component_url_mapper_1.ComponentUrlMapper,
        url_resolver_1.UrlResolver,
        style_url_resolver_1.StyleUrlResolver,
        style_inliner_1.StyleInliner,
        dynamic_component_loader_1.DynamicComponentLoader,
        testability_1.Testability
    ];
}
function _createNgZone(givenReporter) {
    var defaultErrorReporter = function (exception, stackTrace) {
        var longStackTrace = collection_1.ListWrapper.join(stackTrace, "\n\n-----async gap-----\n");
        dom_adapter_1.DOM.logError(exception + "\n\n" + longStackTrace);
        throw exception;
    };
    var reporter = lang_1.isPresent(givenReporter) ? givenReporter : defaultErrorReporter;
    var zone = new ng_zone_1.NgZone({ enableLongStackTrace: lang_1.assertionsEnabled() });
    zone.initCallbacks({ onErrorHandler: reporter });
    return zone;
}
/**
 * Bootstrapping for Angular applications.
 *
 * You instantiate an Angular application by explicitly specifying a component to use as the root
 * component for your
 * application via the `bootstrap()` method.
 *
 * ## Simple Example
 *
 * Assuming this `index.html`:
 *
 * ```html
 * <html>
 *   <!-- load Angular script tags here. -->
 *   <body>
 *     <my-app>loading...</my-app>
 *   </body>
 * </html>
 * ```
 *
 * An application is bootstrapped inside an existing browser DOM, typically `index.html`. Unlike
 * Angular 1, Angular 2
 * does not compile/process bindings in `index.html`. This is mainly for security reasons, as well
 * as architectural
 * changes in Angular 2. This means that `index.html` can safely be processed using server-side
 * technologies such as
 * bindings. Bindings can thus use double-curly `{{ syntax }}` without collision from Angular 2
 * component double-curly
 * `{{ syntax }}`.
 *
 * We can use this script code:
 *
 * ```
 * @Component({
 *    selector: 'my-app'
 * })
 * @View({
 *    template: 'Hello {{ name }}!'
 * })
 * class MyApp {
 *   name:string;
 *
 *   constructor() {
 *     this.name = 'World';
 *   }
 * }
 *
 * main() {
 *   return bootstrap(MyApp);
 * }
 * ```
 *
 * When the app developer invokes `bootstrap()` with the root component `MyApp` as its argument,
 * Angular performs the
 * following tasks:
 *
 *  1. It uses the component's `selector` property to locate the DOM element which needs to be
 * upgraded into
 *     the angular component.
 *  2. It creates a new child injector (from the platform injector) and configures the injector with
 * the component's
 *     `appInjector`. Optionally, you can also override the injector configuration for an app by
 * invoking
 *     `bootstrap` with the `componentInjectableBindings` argument.
 *  3. It creates a new `Zone` and connects it to the angular application's change detection domain
 * instance.
 *  4. It creates a shadow DOM on the selected component's host element and loads the template into
 * it.
 *  5. It instantiates the specified component.
 *  6. Finally, Angular performs change detection to apply the initial data bindings for the
 * application.
 *
 *
 * ## Instantiating Multiple Applications on a Single Page
 *
 * There are two ways to do this.
 *
 *
 * ### Isolated Applications
 *
 * Angular creates a new application each time that the `bootstrap()` method is invoked. When
 * multiple applications
 * are created for a page, Angular treats each application as independent within an isolated change
 * detection and
 * `Zone` domain. If you need to share data between applications, use the strategy described in the
 * next
 * section, "Applications That Share Change Detection."
 *
 *
 * ### Applications That Share Change Detection
 *
 * If you need to bootstrap multiple applications that share common data, the applications must
 * share a common
 * change detection and zone. To do that, create a meta-component that lists the application
 * components in its template.
 * By only invoking the `bootstrap()` method once, with the meta-component as its argument, you
 * ensure that only a
 * single change detection zone is created and therefore data can be shared across the applications.
 *
 *
 * ## Platform Injector
 *
 * When working within a browser window, there are many singleton resources: cookies, title,
 * location, and others.
 * Angular services that represent these resources must likewise be shared across all Angular
 * applications that
 * occupy the same browser window.  For this reason, Angular creates exactly one global platform
 * injector which stores
 * all shared services, and each angular application injector has the platform injector as its
 * parent.
 *
 * Each application has its own private injector as well. When there are multiple applications on a
 * page, Angular treats
 * each application injector's services as private to that application.
 *
 *
 * # API
 * - `appComponentType`: The root component which should act as the application. This is a reference
 * to a `Type`
 *   which is annotated with `@Component(...)`.
 * - `componentInjectableBindings`: An additional set of bindings that can be added to `appInjector`
 * for the
 * {@link Component} to override default injection behavior.
 * - `errorReporter`: `function(exception:any, stackTrace:string)` a default error reporter for
 * unhandled exceptions.
 *
 * Returns a `Promise` with the application`s private {@link Injector}.
 *
 * @exportedAs angular2/core
 */
function bootstrap(appComponentType, componentInjectableBindings, errorReporter) {
    if (componentInjectableBindings === void 0) { componentInjectableBindings = null; }
    if (errorReporter === void 0) { errorReporter = null; }
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
    var bootstrapProcess = async_1.PromiseWrapper.completer();
    var zone = _createNgZone(errorReporter);
    zone.run(function () {
        // TODO(rado): prepopulate template cache, so applications with only
        // index.html and main.js are possible.
        var appInjector = _createAppInjector(appComponentType, componentInjectableBindings, zone);
        async_1.PromiseWrapper.then(appInjector.asyncGet(application_tokens_1.appComponentRefToken), function (componentRef) {
            var appChangeDetector = view_ref_1.internalView(componentRef.hostView).changeDetector;
            // retrieve life cycle: may have already been created if injected in root component
            var lc = appInjector.get(life_cycle_1.LifeCycle);
            lc.registerWith(zone, appChangeDetector);
            lc.tick(); // the first tick that will bootstrap the app
            bootstrapProcess.resolve(new ApplicationRef(componentRef, appComponentType, appInjector));
        }, function (err, stackTrace) { bootstrapProcess.reject(err, stackTrace); });
    });
    return bootstrapProcess.promise;
}
exports.bootstrap = bootstrap;
var ApplicationRef = (function () {
    function ApplicationRef(hostComponent, hostComponentType, injector) {
        this._hostComponent = hostComponent;
        this._injector = injector;
        this._hostComponentType = hostComponentType;
    }
    Object.defineProperty(ApplicationRef.prototype, "hostComponentType", {
        get: function () { return this._hostComponentType; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationRef.prototype, "hostComponent", {
        get: function () { return this._hostComponent.instance; },
        enumerable: true,
        configurable: true
    });
    ApplicationRef.prototype.dispose = function () {
        // TODO: We also need to clean up the Zone, ... here!
        return this._hostComponent.dispose();
    };
    Object.defineProperty(ApplicationRef.prototype, "injector", {
        get: function () { return this._injector; },
        enumerable: true,
        configurable: true
    });
    return ApplicationRef;
})();
exports.ApplicationRef = ApplicationRef;
function _createAppInjector(appComponentType, bindings, zone) {
    if (lang_1.isBlank(_rootInjector))
        _rootInjector = di_1.Injector.resolveAndCreate(_rootBindings);
    var mergedBindings = lang_1.isPresent(bindings) ?
        collection_1.ListWrapper.concat(_injectorBindings(appComponentType), bindings) :
        _injectorBindings(appComponentType);
    collection_1.ListWrapper.push(mergedBindings, di_1.bind(ng_zone_1.NgZone).toValue(zone));
    return _rootInjector.resolveAndCreateChild(mergedBindings);
}
exports.__esModule = true;
//# sourceMappingURL=application.js.map