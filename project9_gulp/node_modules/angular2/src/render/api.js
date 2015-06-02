var lang_1 = require('angular2/src/facade/lang');
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
var EventBinding = (function () {
    function EventBinding(fullName, source) {
        this.fullName = fullName;
        this.source = source;
    }
    return EventBinding;
})();
exports.EventBinding = EventBinding;
var ElementBinder = (function () {
    function ElementBinder(_a) {
        var _b = _a === void 0 ? {} : _a, index = _b.index, parentIndex = _b.parentIndex, distanceToParent = _b.distanceToParent, directives = _b.directives, nestedProtoView = _b.nestedProtoView, propertyBindings = _b.propertyBindings, variableBindings = _b.variableBindings, eventBindings = _b.eventBindings, textBindings = _b.textBindings, readAttributes = _b.readAttributes;
        this.index = index;
        this.parentIndex = parentIndex;
        this.distanceToParent = distanceToParent;
        this.directives = directives;
        this.nestedProtoView = nestedProtoView;
        this.propertyBindings = propertyBindings;
        this.variableBindings = variableBindings;
        this.eventBindings = eventBindings;
        this.textBindings = textBindings;
        this.readAttributes = readAttributes;
    }
    return ElementBinder;
})();
exports.ElementBinder = ElementBinder;
var DirectiveBinder = (function () {
    function DirectiveBinder(_a) {
        var directiveIndex = _a.directiveIndex, propertyBindings = _a.propertyBindings, eventBindings = _a.eventBindings, hostPropertyBindings = _a.hostPropertyBindings;
        this.directiveIndex = directiveIndex;
        this.propertyBindings = propertyBindings;
        this.eventBindings = eventBindings;
        this.hostPropertyBindings = hostPropertyBindings;
    }
    return DirectiveBinder;
})();
exports.DirectiveBinder = DirectiveBinder;
var ProtoViewDto = (function () {
    function ProtoViewDto(_a) {
        var render = _a.render, elementBinders = _a.elementBinders, variableBindings = _a.variableBindings, type = _a.type;
        this.render = render;
        this.elementBinders = elementBinders;
        this.variableBindings = variableBindings;
        this.type = type;
    }
    Object.defineProperty(ProtoViewDto, "HOST_VIEW_TYPE", {
        // A view that contains the host element with bound
        // component directive.
        // Contains a view of type #COMPONENT_VIEW_TYPE.
        get: function () { return 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProtoViewDto, "COMPONENT_VIEW_TYPE", {
        // The view of the component
        // Can contain 0 to n views of type #EMBEDDED_VIEW_TYPE
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProtoViewDto, "EMBEDDED_VIEW_TYPE", {
        // A view that is embedded into another View via a <template> element
        // inside of a component view
        get: function () { return 2; },
        enumerable: true,
        configurable: true
    });
    return ProtoViewDto;
})();
exports.ProtoViewDto = ProtoViewDto;
var DirectiveMetadata = (function () {
    function DirectiveMetadata(_a) {
        var id = _a.id, selector = _a.selector, compileChildren = _a.compileChildren, events = _a.events, hostListeners = _a.hostListeners, hostProperties = _a.hostProperties, hostAttributes = _a.hostAttributes, hostActions = _a.hostActions, properties = _a.properties, readAttributes = _a.readAttributes, type = _a.type, callOnDestroy = _a.callOnDestroy, callOnChange = _a.callOnChange, callOnAllChangesDone = _a.callOnAllChangesDone, changeDetection = _a.changeDetection;
        this.id = id;
        this.selector = selector;
        this.compileChildren = lang_1.isPresent(compileChildren) ? compileChildren : true;
        this.events = events;
        this.hostListeners = hostListeners;
        this.hostProperties = hostProperties;
        this.hostAttributes = hostAttributes;
        this.hostActions = hostActions;
        this.properties = properties;
        this.readAttributes = readAttributes;
        this.type = type;
        this.callOnDestroy = callOnDestroy;
        this.callOnChange = callOnChange;
        this.callOnAllChangesDone = callOnAllChangesDone;
        this.changeDetection = changeDetection;
    }
    Object.defineProperty(DirectiveMetadata, "DIRECTIVE_TYPE", {
        get: function () { return 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectiveMetadata, "COMPONENT_TYPE", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    return DirectiveMetadata;
})();
exports.DirectiveMetadata = DirectiveMetadata;
// An opaque reference to a DomProtoView
var RenderProtoViewRef = (function () {
    function RenderProtoViewRef() {
    }
    return RenderProtoViewRef;
})();
exports.RenderProtoViewRef = RenderProtoViewRef;
// An opaque reference to a DomView
var RenderViewRef = (function () {
    function RenderViewRef() {
    }
    return RenderViewRef;
})();
exports.RenderViewRef = RenderViewRef;
var ViewDefinition = (function () {
    function ViewDefinition(_a) {
        var componentId = _a.componentId, absUrl = _a.absUrl, template = _a.template, directives = _a.directives;
        this.componentId = componentId;
        this.absUrl = absUrl;
        this.template = template;
        this.directives = directives;
    }
    return ViewDefinition;
})();
exports.ViewDefinition = ViewDefinition;
var RenderCompiler = (function () {
    function RenderCompiler() {
    }
    /**
     * Creats a ProtoViewDto that contains a single nested component with the given componentId.
     */
    RenderCompiler.prototype.compileHost = function (directiveMetadata) { return null; };
    /**
     * Compiles a single DomProtoView. Non recursive so that
     * we don't need to serialize all possible components over the wire,
     * but only the needed ones based on previous calls.
     */
    RenderCompiler.prototype.compile = function (template) { return null; };
    return RenderCompiler;
})();
exports.RenderCompiler = RenderCompiler;
var Renderer = (function () {
    function Renderer() {
    }
    /**
     * Creates a root host view that includes the given element.
     * @param {RenderProtoViewRef} hostProtoViewRef a RenderProtoViewRef of type
     * ProtoViewDto.HOST_VIEW_TYPE
     * @param {any} hostElementSelector css selector for the host element (will be queried against the
     * main document)
     * @return {RenderViewRef} the created view
     */
    Renderer.prototype.createRootHostView = function (hostProtoViewRef, hostElementSelector) {
        return null;
    };
    /**
     * Detaches a free host view's element from the DOM.
     */
    Renderer.prototype.detachFreeHostView = function (parentHostViewRef, hostViewRef) { };
    /**
     * Creates a regular view out of the given ProtoView
     */
    Renderer.prototype.createView = function (protoViewRef) { return null; };
    /**
     * Destroys the given view after it has been dehydrated and detached
     */
    Renderer.prototype.destroyView = function (viewRef) { };
    /**
     * Attaches a componentView into the given hostView at the given element
     */
    Renderer.prototype.attachComponentView = function (hostViewRef, elementIndex, componentViewRef) { };
    /**
     * Detaches a componentView into the given hostView at the given element
     */
    Renderer.prototype.detachComponentView = function (hostViewRef, boundElementIndex, componentViewRef) { };
    /**
     * Attaches a view into a ViewContainer (in the given parentView at the given element) at the
     * given index.
     */
    Renderer.prototype.attachViewInContainer = function (parentViewRef, boundElementIndex, atIndex, viewRef) { };
    /**
     * Detaches a view into a ViewContainer (in the given parentView at the given element) at the
     * given index.
     */
    // TODO(tbosch): this should return a promise as it can be animated!
    Renderer.prototype.detachViewInContainer = function (parentViewRef, boundElementIndex, atIndex, viewRef) { };
    /**
     * Hydrates a view after it has been attached. Hydration/dehydration is used for reusing views
     * inside of the view pool.
     */
    Renderer.prototype.hydrateView = function (viewRef) { };
    /**
     * Dehydrates a view after it has been attached. Hydration/dehydration is used for reusing views
     * inside of the view pool.
     */
    Renderer.prototype.dehydrateView = function (viewRef) { };
    /**
     * Sets a property on an element.
     * Note: This will fail if the property was not mentioned previously as a host property
     * in the ProtoView
     */
    Renderer.prototype.setElementProperty = function (viewRef, elementIndex, propertyName, propertyValue) { };
    /**
     * Calls an action.
     * Note: This will fail if the action was not mentioned previously as a host action
     * in the ProtoView
     */
    Renderer.prototype.callAction = function (viewRef, elementIndex, actionExpression, actionArgs) { };
    /**
     * Sets the value of a text node.
     */
    Renderer.prototype.setText = function (viewRef, textNodeIndex, text) { };
    /**
     * Sets the dispatcher for all events of the given view
     */
    Renderer.prototype.setEventDispatcher = function (viewRef, dispatcher) { };
    return Renderer;
})();
exports.Renderer = Renderer;
exports.__esModule = true;
//# sourceMappingURL=api.js.map