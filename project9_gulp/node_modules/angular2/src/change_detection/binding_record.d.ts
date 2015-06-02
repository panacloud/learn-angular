import { SetterFn } from 'angular2/src/reflection/types';
import { AST } from './parser/ast';
import { DirectiveIndex, DirectiveRecord } from './directive_record';
export declare class BindingRecord {
    mode: string;
    implicitReceiver: any;
    ast: AST;
    elementIndex: number;
    propertyName: string;
    setter: SetterFn;
    directiveRecord: DirectiveRecord;
    constructor(mode: string, implicitReceiver: any, ast: AST, elementIndex: number, propertyName: string, setter: SetterFn, directiveRecord: DirectiveRecord);
    callOnChange(): boolean;
    isOnPushChangeDetection(): boolean;
    isDirective(): boolean;
    isElement(): boolean;
    isTextNode(): boolean;
    static createForDirective(ast: AST, propertyName: string, setter: SetterFn, directiveRecord: DirectiveRecord): BindingRecord;
    static createForElement(ast: AST, elementIndex: number, propertyName: string): BindingRecord;
    static createForHostProperty(directiveIndex: DirectiveIndex, ast: AST, propertyName: string): BindingRecord;
    static createForTextNode(ast: AST, elementIndex: number): BindingRecord;
}
export declare var __esModule: boolean;
