import { DOM } from 'angular2/src/dom/dom_adapter';
import { ListWrapper, MapWrapper } from 'angular2/src/facade/collection';
import { Locals } from 'angular2/change_detection';
import { isPresent } from 'angular2/src/facade/lang';
import { RenderViewRef } from '../../api';
export function resolveInternalDomView(viewRef) {
    return viewRef._view;
}
export class DomViewRef extends RenderViewRef {
    constructor(view) {
        super();
        this._view = view;
    }
}
const NG_BINDING_CLASS = 'ng-binding';
/**
 * Const of making objects: http://jsperf.com/instantiate-size-of-object
 */
export class DomView {
    constructor(proto, rootNodes, boundTextNodes, boundElements, contentTags) {
        this.proto = proto;
        this.rootNodes = rootNodes;
        this.boundTextNodes = boundTextNodes;
        this.boundElements = boundElements;
        this.contentTags = contentTags;
        this.viewContainers = ListWrapper.createFixedSize(boundElements.length);
        this.lightDoms = ListWrapper.createFixedSize(boundElements.length);
        this.hostLightDom = null;
        this.hydrated = false;
        this.eventHandlerRemovers = [];
        this.eventDispatcher = null;
        this.shadowRoot = null;
    }
    getDirectParentLightDom(boundElementIndex) {
        var binder = this.proto.elementBinders[boundElementIndex];
        var destLightDom = null;
        if (binder.parentIndex !== -1 && binder.distanceToParent === 1) {
            destLightDom = this.lightDoms[binder.parentIndex];
        }
        return destLightDom;
    }
    setElementProperty(elementIndex, propertyName, value) {
        var setter = MapWrapper.get(this.proto.elementBinders[elementIndex].propertySetters, propertyName);
        setter(this.boundElements[elementIndex], value);
    }
    callAction(elementIndex, actionExpression, actionArgs) {
        var binder = this.proto.elementBinders[elementIndex];
        var hostAction = MapWrapper.get(binder.hostActions, actionExpression);
        hostAction.eval(this.boundElements[elementIndex], this._localsWithAction(actionArgs));
    }
    _localsWithAction(action) {
        var map = MapWrapper.create();
        MapWrapper.set(map, '$action', action);
        return new Locals(null, map);
    }
    setText(textIndex, value) { DOM.setText(this.boundTextNodes[textIndex], value); }
    dispatchEvent(elementIndex, eventName, event) {
        var allowDefaultBehavior = true;
        if (isPresent(this.eventDispatcher)) {
            var evalLocals = MapWrapper.create();
            MapWrapper.set(evalLocals, '$event', event);
            // TODO(tbosch): reenable this when we are parsing element properties
            // out of action expressions
            // var localValues = this.proto.elementBinders[elementIndex].eventLocals.eval(null, new
            // Locals(null, evalLocals));
            // this.eventDispatcher.dispatchEvent(elementIndex, eventName, localValues);
            allowDefaultBehavior =
                this.eventDispatcher.dispatchEvent(elementIndex, eventName, evalLocals);
            if (!allowDefaultBehavior) {
                event.preventDefault();
            }
        }
        return allowDefaultBehavior;
    }
}
//# sourceMappingURL=view.js.map