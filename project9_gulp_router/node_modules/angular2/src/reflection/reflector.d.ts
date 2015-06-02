import { Type } from 'angular2/src/facade/lang';
import { SetterFn, GetterFn, MethodFn } from './types';
export { SetterFn, GetterFn, MethodFn } from './types';
export declare class Reflector {
    _typeInfo: Map<Type, any>;
    _getters: Map<string, GetterFn>;
    _setters: Map<string, SetterFn>;
    _methods: Map<string, MethodFn>;
    reflectionCapabilities: any;
    constructor(reflectionCapabilities: any);
    registerType(type: Type, typeInfo: Map<Type, any>): void;
    registerGetters(getters: Map<string, GetterFn>): void;
    registerSetters(setters: Map<string, SetterFn>): void;
    registerMethods(methods: Map<string, MethodFn>): void;
    factory(type: Type): Function;
    parameters(typeOfFunc: any): List<any>;
    annotations(typeOfFunc: any): List<any>;
    getter(name: string): GetterFn;
    setter(name: string): SetterFn;
    method(name: string): MethodFn;
}
export declare var __esModule: boolean;
