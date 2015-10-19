import { Type } from 'angular2/src/core/facade/lang';
import { AppProtoView } from './view';
import { DirectiveProvider } from './element_injector';
import { DirectiveResolver } from './directive_resolver';
import { ViewResolver } from './view_resolver';
import { PipeResolver } from './pipe_resolver';
import { CompiledHostTemplate } from './template_commands';
import { Renderer } from 'angular2/render';
export declare class ProtoViewFactory {
    private _renderer;
    private _directiveResolver;
    private _viewResolver;
    private _pipeResolver;
    private _cache;
    private _defaultPipes;
    private _appId;
    constructor(_renderer: Renderer, defaultPipes: Type[], _directiveResolver: DirectiveResolver, _viewResolver: ViewResolver, _pipeResolver: PipeResolver, appId: string);
    clearCache(): void;
    createHost(compiledHostTemplate: CompiledHostTemplate): AppProtoView;
    private _createComponent(cmd);
    private _createEmbeddedTemplate(cmd, parent);
    initializeProtoViewIfNeeded(protoView: AppProtoView): void;
    private _initializeProtoView(protoView, render);
    private _bindPipe(typeOrProvider);
    private _flattenPipes(view);
}
export declare function createDirectiveVariableBindings(variableNameAndValues: Array<string | number>, directiveProviders: DirectiveProvider[]): Map<string, number>;
