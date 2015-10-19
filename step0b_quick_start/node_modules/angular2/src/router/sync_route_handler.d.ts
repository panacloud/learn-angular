import { RouteHandler } from './route_handler';
import { Promise } from 'angular2/src/core/facade/async';
import { Type } from 'angular2/src/core/facade/lang';
export declare class SyncRouteHandler implements RouteHandler {
    componentType: Type;
    data: Object;
    constructor(componentType: Type, data?: Object);
    resolveComponentType(): Promise<any>;
}
