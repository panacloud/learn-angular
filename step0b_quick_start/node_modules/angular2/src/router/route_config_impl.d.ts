import { Type } from 'angular2/src/core/facade/lang';
import { RouteDefinition } from './route_definition';
export { RouteDefinition } from './route_definition';
/**
 * The `RouteConfig` decorator defines routes for a given component.
 *
 * It takes an array of {@link RouteDefinition}s.
 */
export declare class RouteConfig {
    configs: RouteDefinition[];
    constructor(configs: RouteDefinition[]);
}
/**
 * `Route` is a type of {@link RouteDefinition} used to route a path to a component.
 *
 * It has the following properties:
 * - `path` is a string that uses the route matcher DSL.
 * - `component` a component type.
 * - `as` is an optional `CamelCase` string representing the name of the route.
 * - `data` is an optional property of any type representing arbitrary route metadata for the given
 * route. It is injectable via the {@link ROUTE_DATA} token.
 *
 * ## Example
 * ```
 * import {RouteConfig} from 'angular2/router';
 *
 * @RouteConfig([
 *   {path: '/home', component: HomeCmp, as: 'HomeCmp' }
 * ])
 * class MyApp {}
 * ```
 */
export declare class Route implements RouteDefinition {
    data: any;
    path: string;
    component: Type;
    as: string;
    loader: Function;
    redirectTo: string;
    constructor({path, component, as, data}: {
        path: string;
        component: Type;
        as?: string;
        data?: any;
    });
}
/**
 * `AuxRoute` is a type of {@link RouteDefinition} used to define an auxiliary route.
 *
 * It takes an object with the following properties:
 * - `path` is a string that uses the route matcher DSL.
 * - `component` a component type.
 * - `as` is an optional `CamelCase` string representing the name of the route.
 * - `data` is an optional property of any type representing arbitrary route metadata for the given
 * route. It is injectable via the {@link ROUTE_DATA} token.
 *
 * ## Example
 * ```
 * import {RouteConfig, AuxRoute} from 'angular2/router';
 *
 * @RouteConfig([
 *   new AuxRoute({path: '/home', component: HomeCmp})
 * ])
 * class MyApp {}
 * ```
 */
export declare class AuxRoute implements RouteDefinition {
    data: any;
    path: string;
    component: Type;
    as: string;
    loader: Function;
    redirectTo: string;
    constructor({path, component, as}: {
        path: string;
        component: Type;
        as?: string;
    });
}
/**
 * `AsyncRoute` is a type of {@link RouteDefinition} used to route a path to an asynchronously
 * loaded component.
 *
 * It has the following properties:
 * - `path` is a string that uses the route matcher DSL.
 * - `loader` is a function that returns a promise that resolves to a component.
 * - `as` is an optional `CamelCase` string representing the name of the route.
 * - `data` is an optional property of any type representing arbitrary route metadata for the given
 * route. It is injectable via the {@link ROUTE_DATA} token.
 *
 * ## Example
 * ```
 * import {RouteConfig} from 'angular2/router';
 *
 * @RouteConfig([
 *   {path: '/home', loader: () => Promise.resolve(MyLoadedCmp), as: 'MyLoadedCmp'}
 * ])
 * class MyApp {}
 * ```
 */
export declare class AsyncRoute implements RouteDefinition {
    data: any;
    path: string;
    loader: Function;
    as: string;
    constructor({path, loader, as, data}: {
        path: string;
        loader: Function;
        as?: string;
        data?: any;
    });
}
/**
 * `Redirect` is a type of {@link RouteDefinition} used to route a path to an asynchronously loaded
 * component.
 *
 * It has the following properties:
 * - `path` is a string that uses the route matcher DSL.
 * - `redirectTo` is a string representing the new URL to be matched against.
 *
 * ## Example
 * ```
 * import {RouteConfig} from 'angular2/router';
 *
 * @RouteConfig([
 *   {path: '/', redirectTo: '/home'},
 *   {path: '/home', component: HomeCmp}
 * ])
 * class MyApp {}
 * ```
 */
export declare class Redirect implements RouteDefinition {
    path: string;
    redirectTo: string;
    as: string;
    loader: Function;
    data: any;
    constructor({path, redirectTo}: {
        path: string;
        redirectTo: string;
    });
}
