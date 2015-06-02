import { Type } from 'angular2/src/facade/lang';
export declare class ComponentUrlMapper {
    getUrl(component: Type): string;
}
export declare class RuntimeComponentUrlMapper extends ComponentUrlMapper {
    _componentUrls: Map<Type, string>;
    constructor();
    setComponentUrl(component: Type, url: string): void;
    getUrl(component: Type): string;
}
export declare var __esModule: boolean;
