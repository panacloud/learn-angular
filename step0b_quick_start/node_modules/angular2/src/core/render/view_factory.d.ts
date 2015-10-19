import { RenderTemplateCmd } from './api';
import { DefaultRenderView } from './view';
export declare function createRenderView(fragmentCmds: RenderTemplateCmd[], inplaceElement: any, nodeFactory: NodeFactory<any>): DefaultRenderView<any>;
export interface NodeFactory<N> {
    resolveComponentTemplate(templateId: number): RenderTemplateCmd[];
    createTemplateAnchor(attrNameAndValues: string[]): N;
    createElement(name: string, attrNameAndValues: string[]): N;
    createRootContentInsertionPoint(): N;
    mergeElement(existing: N, attrNameAndValues: string[]): any;
    createShadowRoot(host: N, templateId: number): N;
    createText(value: string): N;
    appendChild(parent: N, child: N): any;
    on(element: N, eventName: string, callback: Function): any;
    globalOn(target: string, eventName: string, callback: Function): Function;
}
