import { Parser } from 'angular2/change_detection';
import { CompileStep } from './compile_step';
import { CompileElement } from './compile_element';
import { CompileControl } from './compile_control';
/**
 * Parses the property bindings on a single element.
 */
export declare class PropertyBindingParser implements CompileStep {
    _parser: Parser;
    constructor(parser: Parser);
    process(parent: CompileElement, current: CompileElement, control: CompileControl): void;
    _bindVariable(identifier: any, value: any, current: CompileElement, newAttrs: any): void;
    _bindProperty(name: any, expression: any, current: CompileElement, newAttrs: any): void;
    _bindPropertyAst(name: any, ast: any, current: CompileElement, newAttrs: any): void;
    _bindAssignmentEvent(name: any, expression: any, current: CompileElement, newAttrs: any): void;
    _bindEvent(name: any, expression: any, current: CompileElement, newAttrs: any): void;
}
