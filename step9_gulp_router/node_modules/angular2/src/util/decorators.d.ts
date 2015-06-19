import { Type } from 'angular2/src/facade/lang';
export interface ClassDefinition {
    extends?: Type;
    constructor: (Function | Array<any>);
}
export interface TypeDecorator {
    (cls: any): any;
    annotations: Array<any>;
    Class(obj: ClassDefinition): Type;
}
export declare function Class(clsDef: ClassDefinition): Type;
export declare function makeDecorator(annotationCls: any, chainFn?: (fn: Function) => void): (...args) => (cls: any) => any;
export declare function makeParamDecorator(annotationCls: any): any;
export declare var __esModule: boolean;
