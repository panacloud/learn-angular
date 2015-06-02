import { AST } from 'angular2/change_detection';
import { SetterFn } from 'angular2/src/reflection/types';
import * as protoViewModule from './proto_view';
export declare class ElementBinder {
    contentTagSelector: string;
    textNodeIndices: List<number>;
    nestedProtoView: protoViewModule.DomProtoView;
    eventLocals: AST;
    localEvents: List<Event>;
    globalEvents: List<Event>;
    componentId: string;
    parentIndex: number;
    distanceToParent: number;
    propertySetters: Map<string, SetterFn>;
    hostActions: Map<string, AST>;
    constructor({textNodeIndices, contentTagSelector, nestedProtoView, componentId, eventLocals, localEvents, globalEvents, hostActions, parentIndex, distanceToParent, propertySetters}?: {
        contentTagSelector?: string;
        textNodeIndices?: List<number>;
        nestedProtoView?: protoViewModule.DomProtoView;
        eventLocals?: AST;
        localEvents?: List<Event>;
        globalEvents?: List<Event>;
        componentId?: string;
        parentIndex?: number;
        distanceToParent?: number;
        propertySetters?: Map<string, SetterFn>;
        hostActions?: Map<string, AST>;
    });
}
export declare class Event {
    name: string;
    target: string;
    fullName: string;
    constructor(name: string, target: string, fullName: string);
}
export declare class HostAction {
    actionName: string;
    actionExpression: string;
    expression: AST;
    constructor(actionName: string, actionExpression: string, expression: AST);
}
export declare var __esModule: boolean;
