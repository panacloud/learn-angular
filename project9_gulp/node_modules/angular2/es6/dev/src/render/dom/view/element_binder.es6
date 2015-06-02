export class ElementBinder {
    constructor({ textNodeIndices, contentTagSelector, nestedProtoView, componentId, eventLocals, localEvents, globalEvents, hostActions, parentIndex, distanceToParent, propertySetters } = {}) {
        this.textNodeIndices = textNodeIndices;
        this.contentTagSelector = contentTagSelector;
        this.nestedProtoView = nestedProtoView;
        this.componentId = componentId;
        this.eventLocals = eventLocals;
        this.localEvents = localEvents;
        this.globalEvents = globalEvents;
        this.hostActions = hostActions;
        this.parentIndex = parentIndex;
        this.distanceToParent = distanceToParent;
        this.propertySetters = propertySetters;
    }
}
export class Event {
    constructor(name, target, fullName) {
        this.name = name;
        this.target = target;
        this.fullName = fullName;
    }
}
export class HostAction {
    constructor(actionName, actionExpression, expression) {
        this.actionName = actionName;
        this.actionExpression = actionExpression;
        this.expression = expression;
    }
}
//# sourceMappingURL=element_binder.js.map