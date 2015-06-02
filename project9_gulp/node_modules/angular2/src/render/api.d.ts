import { ASTWithSource } from 'angular2/change_detection';
/**
 * General notes:
 *
 * The methods for creating / destroying views in this API are used in the AppViewHydrator
 * and RenderViewHydrator as well.
 *
 * We are already parsing expressions on the render side:
 * - this makes the ElementBinders more compact
 *   (e.g. no need to distinguish interpolations from regular expressions from literals)
 * - allows to retrieve which properties should be accessed from the event
 *   by looking at the expression
 * - we need the parse at least for the `template` attribute to match
 *   directives in it
 * - render compiler is not on the critical path as
 *   its output will be stored in precompiled templates.
 */
export declare class EventBinding {
    fullName: string;
    source: ASTWithSource;
    constructor(fullName: string, source: ASTWithSource);
}
export declare class ElementBinder {
    index: number;
    parentIndex: number;
    distanceToParent: number;
    directives: List<DirectiveBinder>;
    nestedProtoView: ProtoViewDto;
    propertyBindings: Map<string, ASTWithSource>;
    variableBindings: Map<string, ASTWithSource>;
    eventBindings: List<EventBinding>;
    textBindings: List<ASTWithSource>;
    readAttributes: Map<string, string>;
    constructor({index, parentIndex, distanceToParent, directives, nestedProtoView, propertyBindings, variableBindings, eventBindings, textBindings, readAttributes}?: {
        index?: number;
        parentIndex?: number;
        distanceToParent?: number;
        directives?: List<DirectiveBinder>;
        nestedProtoView?: ProtoViewDto;
        propertyBindings?: Map<string, ASTWithSource>;
        variableBindings?: Map<string, ASTWithSource>;
        eventBindings?: List<EventBinding>;
        textBindings?: List<ASTWithSource>;
        readAttributes?: Map<string, string>;
    });
}
export declare class DirectiveBinder {
    directiveIndex: number;
    propertyBindings: Map<string, ASTWithSource>;
    eventBindings: List<EventBinding>;
    hostPropertyBindings: Map<string, ASTWithSource>;
    constructor({directiveIndex, propertyBindings, eventBindings, hostPropertyBindings}: {
        directiveIndex?: number;
        propertyBindings?: Map<string, ASTWithSource>;
        eventBindings?: List<EventBinding>;
        hostPropertyBindings?: Map<string, ASTWithSource>;
    });
}
export declare class ProtoViewDto {
    static HOST_VIEW_TYPE: number;
    static COMPONENT_VIEW_TYPE: number;
    static EMBEDDED_VIEW_TYPE: number;
    render: RenderProtoViewRef;
    elementBinders: List<ElementBinder>;
    variableBindings: Map<string, string>;
    type: number;
    constructor({render, elementBinders, variableBindings, type}: {
        render?: RenderProtoViewRef;
        elementBinders?: List<ElementBinder>;
        variableBindings?: Map<string, string>;
        type?: number;
    });
}
export declare class DirectiveMetadata {
    static DIRECTIVE_TYPE: number;
    static COMPONENT_TYPE: number;
    id: any;
    selector: string;
    compileChildren: boolean;
    events: List<string>;
    hostListeners: Map<string, string>;
    hostProperties: Map<string, string>;
    hostAttributes: Map<string, string>;
    hostActions: Map<string, string>;
    properties: Map<string, string>;
    readAttributes: List<string>;
    type: number;
    callOnDestroy: boolean;
    callOnChange: boolean;
    callOnAllChangesDone: boolean;
    changeDetection: string;
    constructor({id, selector, compileChildren, events, hostListeners, hostProperties, hostAttributes, hostActions, properties, readAttributes, type, callOnDestroy, callOnChange, callOnAllChangesDone, changeDetection}: {
        id?: string;
        selector?: string;
        compileChildren?: boolean;
        events?: List<string>;
        hostListeners?: Map<string, string>;
        hostProperties?: Map<string, string>;
        hostAttributes?: Map<string, string>;
        hostActions?: Map<string, string>;
        properties?: Map<string, string>;
        readAttributes?: List<string>;
        type?: number;
        callOnDestroy?: boolean;
        callOnChange?: boolean;
        callOnAllChangesDone?: boolean;
        changeDetection?: string;
    });
}
export declare class RenderProtoViewRef {
}
export declare class RenderViewRef {
}
export declare class ViewDefinition {
    componentId: string;
    absUrl: string;
    template: string;
    directives: List<DirectiveMetadata>;
    constructor({componentId, absUrl, template, directives}: {
        componentId?: string;
        absUrl?: string;
        template?: string;
        directives?: List<DirectiveMetadata>;
    });
}
export declare class RenderCompiler {
    /**
     * Creats a ProtoViewDto that contains a single nested component with the given componentId.
     */
    compileHost(directiveMetadata: DirectiveMetadata): Promise<ProtoViewDto>;
    /**
     * Compiles a single DomProtoView. Non recursive so that
     * we don't need to serialize all possible components over the wire,
     * but only the needed ones based on previous calls.
     */
    compile(template: ViewDefinition): Promise<ProtoViewDto>;
}
export declare class Renderer {
    /**
     * Creates a root host view that includes the given element.
     * @param {RenderProtoViewRef} hostProtoViewRef a RenderProtoViewRef of type
     * ProtoViewDto.HOST_VIEW_TYPE
     * @param {any} hostElementSelector css selector for the host element (will be queried against the
     * main document)
     * @return {RenderViewRef} the created view
     */
    createRootHostView(hostProtoViewRef: RenderProtoViewRef, hostElementSelector: string): RenderViewRef;
    /**
     * Detaches a free host view's element from the DOM.
     */
    detachFreeHostView(parentHostViewRef: RenderViewRef, hostViewRef: RenderViewRef): void;
    /**
     * Creates a regular view out of the given ProtoView
     */
    createView(protoViewRef: RenderProtoViewRef): RenderViewRef;
    /**
     * Destroys the given view after it has been dehydrated and detached
     */
    destroyView(viewRef: RenderViewRef): void;
    /**
     * Attaches a componentView into the given hostView at the given element
     */
    attachComponentView(hostViewRef: RenderViewRef, elementIndex: number, componentViewRef: RenderViewRef): void;
    /**
     * Detaches a componentView into the given hostView at the given element
     */
    detachComponentView(hostViewRef: RenderViewRef, boundElementIndex: number, componentViewRef: RenderViewRef): void;
    /**
     * Attaches a view into a ViewContainer (in the given parentView at the given element) at the
     * given index.
     */
    attachViewInContainer(parentViewRef: RenderViewRef, boundElementIndex: number, atIndex: number, viewRef: RenderViewRef): void;
    /**
     * Detaches a view into a ViewContainer (in the given parentView at the given element) at the
     * given index.
     */
    detachViewInContainer(parentViewRef: RenderViewRef, boundElementIndex: number, atIndex: number, viewRef: RenderViewRef): void;
    /**
     * Hydrates a view after it has been attached. Hydration/dehydration is used for reusing views
     * inside of the view pool.
     */
    hydrateView(viewRef: RenderViewRef): void;
    /**
     * Dehydrates a view after it has been attached. Hydration/dehydration is used for reusing views
     * inside of the view pool.
     */
    dehydrateView(viewRef: RenderViewRef): void;
    /**
     * Sets a property on an element.
     * Note: This will fail if the property was not mentioned previously as a host property
     * in the ProtoView
     */
    setElementProperty(viewRef: RenderViewRef, elementIndex: number, propertyName: string, propertyValue: any): void;
    /**
     * Calls an action.
     * Note: This will fail if the action was not mentioned previously as a host action
     * in the ProtoView
     */
    callAction(viewRef: RenderViewRef, elementIndex: number, actionExpression: string, actionArgs: any): void;
    /**
     * Sets the value of a text node.
     */
    setText(viewRef: RenderViewRef, textNodeIndex: number, text: string): void;
    /**
     * Sets the dispatcher for all events of the given view
     */
    setEventDispatcher(viewRef: RenderViewRef, dispatcher: EventDispatcher): void;
}
/**
 * A dispatcher for all events happening in a view.
 */
export interface EventDispatcher {
    /**
     * Called when an event was triggered for a on-* attribute on an element.
     * @param {Map<string, any>} locals Locals to be used to evaluate the
     *   event expressions
     */
    dispatchEvent(elementIndex: number, eventName: string, locals: Map<string, any>): any;
}
export declare var __esModule: boolean;
