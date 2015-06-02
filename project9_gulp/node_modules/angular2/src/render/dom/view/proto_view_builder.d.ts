import { ASTWithSource, AST, AstTransformer, AccessMember } from 'angular2/change_detection';
import { Event, HostAction } from './element_binder';
import * as api from '../../api';
export declare class ProtoViewBuilder {
    rootElement: any;
    variableBindings: Map<string, string>;
    elements: List<ElementBinderBuilder>;
    type: number;
    constructor(rootElement: any, type: number);
    bindElement(element: any, description?: any): ElementBinderBuilder;
    bindVariable(name: any, value: any): void;
    build(): api.ProtoViewDto;
}
export declare class ElementBinderBuilder {
    element: any;
    index: number;
    parent: ElementBinderBuilder;
    distanceToParent: number;
    directives: List<DirectiveBuilder>;
    nestedProtoView: ProtoViewBuilder;
    propertyBindings: Map<string, ASTWithSource>;
    variableBindings: Map<string, string>;
    eventBindings: List<api.EventBinding>;
    eventBuilder: EventBuilder;
    textBindingIndices: List<number>;
    textBindings: List<ASTWithSource>;
    contentTagSelector: string;
    readAttributes: Map<string, string>;
    componentId: string;
    constructor(index: any, element: any, description: any);
    setParent(parent: ElementBinderBuilder, distanceToParent: any): ElementBinderBuilder;
    readAttribute(attrName: string): void;
    bindDirective(directiveIndex: number): DirectiveBuilder;
    bindNestedProtoView(rootElement: any): ProtoViewBuilder;
    bindProperty(name: any, expression: any): void;
    bindVariable(name: any, value: any): void;
    bindEvent(name: any, expression: any, target?: any): void;
    bindText(index: any, expression: any): void;
    setContentTagSelector(value: string): void;
    setComponentId(componentId: string): void;
}
export declare class DirectiveBuilder {
    directiveIndex: number;
    propertyBindings: Map<string, ASTWithSource>;
    hostPropertyBindings: Map<string, ASTWithSource>;
    hostActions: List<HostAction>;
    eventBindings: List<api.EventBinding>;
    eventBuilder: EventBuilder;
    constructor(directiveIndex: any);
    bindProperty(name: any, expression: any): void;
    bindHostProperty(name: any, expression: any): void;
    bindHostAction(actionName: string, actionExpression: string, expression: ASTWithSource): void;
    bindEvent(name: any, expression: any, target?: any): void;
}
export declare class EventBuilder extends AstTransformer {
    locals: List<AST>;
    localEvents: List<Event>;
    globalEvents: List<Event>;
    _implicitReceiver: AST;
    constructor();
    add(name: string, source: ASTWithSource, target: string): api.EventBinding;
    visitAccessMember(ast: AccessMember): AccessMember;
    buildEventLocals(): List<AST>;
    buildLocalEvents(): List<Event>;
    buildGlobalEvents(): List<Event>;
    merge(eventBuilder: EventBuilder): void;
    _merge(host: List<Event>, tobeAdded: List<Event>): void;
}
export declare var __esModule: boolean;
