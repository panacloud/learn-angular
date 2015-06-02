import { CompileStep } from '../compiler/compile_step';
import { CompileElement } from '../compiler/compile_element';
import { CompileControl } from '../compiler/compile_control';
import { ViewDefinition } from '../../api';
import { ShadowDomStrategy } from './shadow_dom_strategy';
export declare class ShadowDomCompileStep implements CompileStep {
    _shadowDomStrategy: ShadowDomStrategy;
    _template: ViewDefinition;
    _subTaskPromises: List<Promise<any>>;
    constructor(shadowDomStrategy: ShadowDomStrategy, template: ViewDefinition, subTaskPromises: List<Promise<any>>);
    process(parent: CompileElement, current: CompileElement, control: CompileControl): void;
    _processStyleElement(current: CompileElement, control: CompileControl): void;
    _processContentElement(current: CompileElement): void;
}
export declare var __esModule: boolean;
