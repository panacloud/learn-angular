import { ElementBinder } from './element_binder';
import { RenderProtoViewRef } from '../../api';
export declare function resolveInternalDomProtoView(protoViewRef: RenderProtoViewRef): DomProtoView;
export declare class DomProtoViewRef extends RenderProtoViewRef {
    _protoView: DomProtoView;
    constructor(protoView: DomProtoView);
}
export declare class DomProtoView {
    element: any;
    elementBinders: List<ElementBinder>;
    isTemplateElement: boolean;
    rootBindingOffset: number;
    constructor({elementBinders, element}: {
        elementBinders: any;
        element: any;
    });
}
export declare var __esModule: boolean;
