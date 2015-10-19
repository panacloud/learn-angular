import { RouteHandler } from './route_handler';
import { Promise } from 'angular2/src/core/facade/async';
import { Type } from 'angular2/src/core/facade/lang';
export declare class AsyncRouteHandler implements RouteHandler {
    private _loader;
    data: Object;
    componentType: Type;
    constructor(_loader: Function, data?: Object);
    resolveComponentType(): Promise<any>;
}
