import { Locals } from 'angular2/change_detection';
import { DomViewContainer } from './view_container';
import { DomProtoView } from './proto_view';
import { LightDom } from '../shadow_dom/light_dom';
import { Content } from '../shadow_dom/content_tag';
import { RenderViewRef, EventDispatcher } from '../../api';
export declare function resolveInternalDomView(viewRef: RenderViewRef): DomView;
export declare class DomViewRef extends RenderViewRef {
    _view: DomView;
    constructor(view: DomView);
}
/**
 * Const of making objects: http://jsperf.com/instantiate-size-of-object
 */
export declare class DomView {
    proto: DomProtoView;
    rootNodes: List<any>;
    boundTextNodes: List<any>;
    boundElements: List<any>;
    contentTags: List<Content>;
    viewContainers: List<DomViewContainer>;
    lightDoms: List<LightDom>;
    hostLightDom: LightDom;
    shadowRoot: any;
    hydrated: boolean;
    eventDispatcher: EventDispatcher;
    eventHandlerRemovers: List<Function>;
    constructor(proto: DomProtoView, rootNodes: List<any>, boundTextNodes: List<any>, boundElements: List<any>, contentTags: List<Content>);
    getDirectParentLightDom(boundElementIndex: number): any;
    setElementProperty(elementIndex: number, propertyName: string, value: any): void;
    callAction(elementIndex: number, actionExpression: string, actionArgs: any): void;
    _localsWithAction(action: Object): Locals;
    setText(textIndex: number, value: string): void;
    dispatchEvent(elementIndex: any, eventName: any, event: any): boolean;
}
export declare var __esModule: boolean;
