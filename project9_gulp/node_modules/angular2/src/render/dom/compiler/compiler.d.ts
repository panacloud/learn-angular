import { ViewDefinition, ProtoViewDto, DirectiveMetadata, RenderCompiler } from '../../api';
import { TemplateLoader } from 'angular2/src/render/dom/compiler/template_loader';
import { CompileStepFactory } from './compile_step_factory';
import { Parser } from 'angular2/change_detection';
import { ShadowDomStrategy } from '../shadow_dom/shadow_dom_strategy';
/**
 * The compiler loads and translates the html templates of components into
 * nested ProtoViews. To decompose its functionality it uses
 * the CompilePipeline and the CompileSteps.
 */
export declare class DomCompiler extends RenderCompiler {
    _templateLoader: TemplateLoader;
    _stepFactory: CompileStepFactory;
    constructor(stepFactory: CompileStepFactory, templateLoader: TemplateLoader);
    compile(template: ViewDefinition): Promise<ProtoViewDto>;
    compileHost(directiveMetadata: DirectiveMetadata): Promise<ProtoViewDto>;
    _compileTemplate(viewDef: ViewDefinition, tplElement: any, protoViewType: number): Promise<ProtoViewDto>;
}
export declare class DefaultDomCompiler extends DomCompiler {
    constructor(parser: Parser, shadowDomStrategy: ShadowDomStrategy, templateLoader: TemplateLoader);
}
export declare var __esModule: boolean;
