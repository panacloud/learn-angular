import { ProtoViewBuilder, ElementBinderBuilder } from '../view/proto_view_builder';
/**
 * Collects all data that is needed to process an element
 * in the compile process. Fields are filled
 * by the CompileSteps starting out with the pure HTMLElement.
 */
export declare class CompileElement {
    element: any;
    _attrs: Map<string, string>;
    _classList: List<string>;
    isViewRoot: boolean;
    inheritedProtoView: ProtoViewBuilder;
    distanceToInheritedBinder: number;
    inheritedElementBinder: ElementBinderBuilder;
    compileChildren: boolean;
    elementDescription: string;
    constructor(element: any, compilationUnit?: string);
    isBound(): boolean;
    bindElement(): ElementBinderBuilder;
    refreshAttrs(): void;
    attrs(): Map<string, string>;
    refreshClassList(): void;
    classList(): List<string>;
}
export declare var __esModule: boolean;
