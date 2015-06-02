import { Type } from 'angular2/src/facade/lang';
import { GetterFn, SetterFn, MethodFn } from './types';
export declare class ReflectionCapabilities {
    private _reflect;
    constructor(reflect?: any);
    factory(t: Type): Function;
    _zipTypesAndAnnotaions(paramTypes: any, paramAnnotations: any): List<List<any>>;
    parameters(typeOfFunc: any): List<List<any>>;
    annotations(typeOfFunc: any): List<any>;
    getter(name: string): GetterFn;
    setter(name: string): SetterFn;
    method(name: string): MethodFn;
}
export declare var __esModule: boolean;
