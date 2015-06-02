import { Parser } from 'angular2/change_detection';
import { ViewDefinition } from '../../api';
import { CompileStep } from './compile_step';
import { TextInterpolationParser } from './text_interpolation_parser';
import { ShadowDomCompileStep } from '../shadow_dom/shadow_dom_compile_step';
import { ShadowDomStrategy } from '../shadow_dom/shadow_dom_strategy';
export declare class CompileStepFactory {
    createSteps(template: ViewDefinition, subTaskPromises: List<Promise<any>>): List<CompileStep>;
}
export declare class DefaultStepFactory extends CompileStepFactory {
    _parser: Parser;
    _shadowDomStrategy: ShadowDomStrategy;
    constructor(parser: Parser, shadowDomStrategy: any);
    createSteps(template: ViewDefinition, subTaskPromises: List<Promise<any>>): (TextInterpolationParser | ShadowDomCompileStep)[];
}
export declare var __esModule: boolean;
