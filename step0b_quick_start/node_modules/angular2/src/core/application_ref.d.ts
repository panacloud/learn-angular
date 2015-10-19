import { NgZone } from 'angular2/src/core/zone/ng_zone';
import { Type } from 'angular2/src/core/facade/lang';
import { Provider, Injector } from 'angular2/src/core/di';
import { Promise } from 'angular2/src/core/facade/async';
import { ComponentRef } from 'angular2/src/core/linker/dynamic_component_loader';
/**
 * Constructs the set of providers meant for use at the platform level.
 *
 * These are providers that should be singletons shared among all Angular applications
 * running on the page.
 */
export declare function platformBindings(): Array<Type | Provider | any[]>;
/**
 * Construct a default set of providers which should be included in any Angular
 * application, regardless of whether it runs on the UI thread or in a web worker.
 */
export declare function applicationCommonBindings(): Array<Type | Provider | any[]>;
/**
 * Create an Angular zone.
 */
export declare function createNgZone(): NgZone;
export declare function platformCommon(bindings?: Array<Type | Provider | any[]>, initializer?: () => void): PlatformRef;
/**
 * The Angular platform is the entry point for Angular on a web page. Each page
 * has exactly one platform, and services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 *
 * A page's platform is initialized implicitly when {@link bootstrap}() is called, or
 * explicitly by calling {@link platform}().
 */
export declare abstract class PlatformRef {
    /**
     * Retrieve the platform {@link Injector}, which is the parent injector for
     * every Angular application on the page and provides singleton providers.
     */
    injector: Injector;
    /**
     * Instantiate a new Angular application on the page.
     *
     * # What is an application?
     *
     * Each Angular application has its own zone, change detection, compiler,
     * renderer, and other framework components. An application hosts one or more
     * root components, which can be initialized via `ApplicationRef.bootstrap()`.
     *
     * # Application Bindings
     *
     * Angular applications require numerous providers to be properly instantiated.
     * When using `application()` to create a new app on the page, these providers
     * must be provided. Fortunately, there are helper functions to configure
     * typical providers, as shown in the example below.
     *
     * # Example
     * ```
     * var myAppBindings = [MyAppService];
     *
     * platform()
     *   .application([applicationCommonBindings(), applicationDomBindings(), myAppBindings])
     *   .bootstrap(MyTopLevelComponent);
     * ```
     * # See Also
     *
     * See the {@link bootstrap} documentation for more details.
     */
    abstract application(bindings: Array<Type | Provider | any[]>): ApplicationRef;
    /**
     * Instantiate a new Angular application on the page, using providers which
     * are only available asynchronously. One such use case is to initialize an
     * application running in a web worker.
     *
     * # Usage
     *
     * `bindingFn` is a function that will be called in the new application's zone.
     * It should return a `Promise` to a list of providers to be used for the
     * new application. Once this promise resolves, the application will be
     * constructed in the same manner as a normal `application()`.
     */
    abstract asyncApplication(bindingFn: (zone: NgZone) => Promise<Array<Type | Provider | any[]>>): Promise<ApplicationRef>;
    /**
     * Destroy the Angular platform and all Angular applications on the page.
     */
    abstract dispose(): void;
}
export declare class PlatformRef_ extends PlatformRef {
    private _injector;
    private _dispose;
    constructor(_injector: Injector, _dispose: () => void);
    injector: Injector;
    application(bindings: Array<Type | Provider | any[]>): ApplicationRef;
    asyncApplication(bindingFn: (zone: NgZone) => Promise<Array<Type | Provider | any[]>>): Promise<ApplicationRef>;
    private _initApp(zone, providers);
    dispose(): void;
}
/**
 * A reference to an Angular application running on a page.
 *
 * For more about Angular applications, see the documentation for {@link bootstrap}.
 */
export declare abstract class ApplicationRef {
    /**
     * Register a listener to be called each time `bootstrap()` is called to bootstrap
     * a new root component.
     */
    abstract registerBootstrapListener(listener: (ref: ComponentRef) => void): void;
    /**
     * Bootstrap a new component at the root level of the application.
     *
     * # Bootstrap process
     *
     * When bootstrapping a new root component into an application, Angular mounts the
     * specified application component onto DOM elements identified by the [componentType]'s
     * selector and kicks off automatic change detection to finish initializing the component.
     *
     * # Optional Bindings
     *
     * Bindings for the given component can optionally be overridden via the `providers`
     * parameter. These providers will only apply for the root component being added and any
     * child components under it.
     *
     * # Example
     * ```
     * var app = platform.application([applicationCommonBindings(), applicationDomBindings()];
     * app.bootstrap(FirstRootComponent);
     * app.bootstrap(SecondRootComponent, [provide(OverrideBinding, {useClass: OverriddenBinding})]);
     * ```
     */
    abstract bootstrap(componentType: Type, bindings?: Array<Type | Provider | any[]>): Promise<ComponentRef>;
    /**
     * Retrieve the application {@link Injector}.
     */
    injector: Injector;
    /**
     * Retrieve the application {@link NgZone}.
     */
    zone: NgZone;
    /**
     * Dispose of this application and all of its components.
     */
    abstract dispose(): void;
    /**
     * Get a list of component types registered to this application.
     */
    componentTypes: Type[];
}
export declare class ApplicationRef_ extends ApplicationRef {
    private _platform;
    private _zone;
    private _injector;
    private _bootstrapListeners;
    private _rootComponents;
    private _rootComponentTypes;
    constructor(_platform: PlatformRef_, _zone: NgZone, _injector: Injector);
    registerBootstrapListener(listener: (ref: ComponentRef) => void): void;
    bootstrap(componentType: Type, providers?: Array<Type | Provider | any[]>): Promise<ComponentRef>;
    injector: Injector;
    zone: NgZone;
    dispose(): void;
    componentTypes: any[];
}
