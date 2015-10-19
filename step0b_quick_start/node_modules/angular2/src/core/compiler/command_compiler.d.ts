import { TemplateCmd } from 'angular2/src/core/linker/template_commands';
import { TemplateAst } from './template_ast';
import { CompileDirectiveMetadata } from './directive_metadata';
import { SourceExpression } from './source_module';
export declare var TEMPLATE_COMMANDS_MODULE_REF: string;
export declare class CommandCompiler {
    compileComponentRuntime(component: CompileDirectiveMetadata, appId: string, templateId: number, template: TemplateAst[], changeDetectorFactories: Function[], componentTemplateFactory: Function): TemplateCmd[];
    compileComponentCodeGen(component: CompileDirectiveMetadata, appIdExpr: string, templateIdExpr: string, template: TemplateAst[], changeDetectorFactoryExpressions: string[], componentTemplateFactory: Function): SourceExpression;
}
