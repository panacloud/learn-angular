import { Parser } from 'angular2/change_detection';
import { CompileStep } from './compile_step';
import { CompileElement } from './compile_element';
import { CompileControl } from './compile_control';
/**
 * Parses interpolations in direct text child nodes of the current element.
 */
export declare class TextInterpolationParser implements CompileStep {
    _parser: Parser;
    constructor(_parser: Parser);
    process(parent: CompileElement, current: CompileElement, control: CompileControl): void;
}
