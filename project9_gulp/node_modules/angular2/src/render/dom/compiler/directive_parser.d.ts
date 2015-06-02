import { Parser } from 'angular2/change_detection';
import { SelectorMatcher } from 'angular2/src/render/dom/compiler/selector';
import { CompileStep } from './compile_step';
import { CompileElement } from './compile_element';
import { CompileControl } from './compile_control';
import { DirectiveMetadata } from '../../api';
import { DirectiveBuilder } from '../view/proto_view_builder';
/**
 * Parses the directives on a single element. Assumes ViewSplitter has already created
 * <template> elements for template directives.
 */
export declare class DirectiveParser implements CompileStep {
    _selectorMatcher: SelectorMatcher;
    _directives: List<DirectiveMetadata>;
    _parser: Parser;
    constructor(parser: Parser, directives: List<DirectiveMetadata>);
    _ensureComponentOnlyHasElementSelector(selector: any, directive: any): void;
    process(parent: CompileElement, current: CompileElement, control: CompileControl): void;
    _bindDirectiveProperty(dirProperty: string, bindConfig: string, compileElement: CompileElement, directiveBinderBuilder: DirectiveBuilder): void;
    _bindDirectiveEvent(eventName: any, action: any, compileElement: any, directiveBinderBuilder: any): void;
    _bindHostAction(actionName: any, actionExpression: any, compileElement: any, directiveBinderBuilder: any): void;
    _bindHostProperty(hostPropertyName: any, directivePropertyName: any, compileElement: any, directiveBinderBuilder: any): void;
    _addHostAttribute(attrName: any, attrValue: any, compileElement: any): void;
    _splitBindConfig(bindConfig: string): any;
}
export declare var __esModule: boolean;
