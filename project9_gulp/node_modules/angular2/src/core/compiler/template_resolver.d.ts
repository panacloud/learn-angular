import { View } from 'angular2/src/core/annotations_impl/view';
import { Type } from 'angular2/src/facade/lang';
export declare class TemplateResolver {
    _cache: Map<Type, any>;
    constructor();
    resolve(component: Type): View;
    _resolve(component: Type): any;
}
export declare var __esModule: boolean;
