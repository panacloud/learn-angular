import { Locals, ChangeDispatcher, ProtoChangeDetector, ChangeDetector, BindingRecord, DirectiveIndex } from 'angular2/change_detection';
import { ProtoElementInjector, ElementInjector, PreBuiltObjects, DirectiveBinding } from './element_injector';
import { ElementBinder } from './element_binder';
import * as renderApi from 'angular2/src/render/api';
import { EventDispatcher } from 'angular2/src/render/api';
export declare class AppViewContainer {
    views: List<AppView>;
    constructor();
}
/**
 * Const of making objects: http://jsperf.com/instantiate-size-of-object
 *
 */
export declare class AppView implements ChangeDispatcher, EventDispatcher {
    renderer: renderApi.Renderer;
    proto: AppProtoView;
    render: renderApi.RenderViewRef;
    rootElementInjectors: List<ElementInjector>;
    elementInjectors: List<ElementInjector>;
    changeDetector: ChangeDetector;
    componentChildViews: List<AppView>;
    freeHostViews: List<AppView>;
    viewContainers: List<AppViewContainer>;
    preBuiltObjects: List<PreBuiltObjects>;
    /**
     * The context against which data-binding expressions in this view are evaluated against.
     * This is always a component instance.
     */
    context: any;
    /**
     * Variables, local to this view, that can be used in binding expressions (in addition to the
     * context). This is used for thing like `<video #player>` or
     * `<li template="for #item of items">`, where "player" and "item" are locals, respectively.
     */
    locals: Locals;
    constructor(renderer: renderApi.Renderer, proto: AppProtoView, protoLocals: Map<string, any>);
    init(changeDetector: ChangeDetector, elementInjectors: List<ElementInjector>, rootElementInjectors: List<ElementInjector>, preBuiltObjects: List<PreBuiltObjects>, componentChildViews: List<AppView>): void;
    setLocal(contextName: string, value: any): void;
    hydrated(): boolean;
    /**
     * Triggers the event handlers for the element and the directives.
     *
     * This method is intended to be called from directive EventEmitters.
     *
     * @param {string} eventName
     * @param {*} eventObj
     * @param {int} binderIndex
     */
    triggerEventHandlers(eventName: string, eventObj: any, binderIndex: int): void;
    notifyOnBinding(b: BindingRecord, currentValue: any): void;
    getDirectiveFor(directive: DirectiveIndex): any;
    getDetectorFor(directive: DirectiveIndex): ChangeDetector;
    callAction(elementIndex: number, actionExpression: string, action: Object): void;
    dispatchEvent(elementIndex: number, eventName: string, locals: Map<string, any>): boolean;
}
/**
 *
 */
export declare class AppProtoView {
    render: renderApi.RenderProtoViewRef;
    protoChangeDetector: ProtoChangeDetector;
    variableBindings: Map<string, string>;
    elementBinders: List<ElementBinder>;
    protoLocals: Map<string, any>;
    constructor(render: renderApi.RenderProtoViewRef, protoChangeDetector: ProtoChangeDetector, variableBindings: Map<string, string>);
    bindElement(parent: ElementBinder, distanceToParent: int, protoElementInjector: ProtoElementInjector, componentDirective?: DirectiveBinding): ElementBinder;
    /**
     * Adds an event binding for the last created ElementBinder via bindElement.
     *
     * If the directive index is a positive integer, the event is evaluated in the context of
     * the given directive.
     *
     * If the directive index is -1, the event is evaluated in the context of the enclosing view.
     *
     * @param {string} eventName
     * @param {AST} expression
     * @param {int} directiveIndex The directive index in the binder or -1 when the event is not bound
     *                             to a directive
     */
    bindEvent(eventBindings: List<renderApi.EventBinding>, boundElementIndex: number, directiveIndex?: int): void;
}
export declare var __esModule: boolean;
