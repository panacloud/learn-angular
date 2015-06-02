var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var collection_1 = require('angular2/src/facade/collection');
var change_detection_1 = require('angular2/change_detection');
var lang_1 = require('angular2/src/facade/lang');
var api_1 = require('../../api');
function resolveInternalDomView(viewRef) {
    return viewRef._view;
}
exports.resolveInternalDomView = resolveInternalDomView;
var DomViewRef = (function (_super) {
    __extends(DomViewRef, _super);
    function DomViewRef(view) {
        _super.call(this);
        this._view = view;
    }
    return DomViewRef;
})(api_1.RenderViewRef);
exports.DomViewRef = DomViewRef;
var NG_BINDING_CLASS = 'ng-binding';
/**
 * Const of making objects: http://jsperf.com/instantiate-size-of-object
 */
var DomView = (function () {
    function DomView(proto, rootNodes, boundTextNodes, boundElements, contentTags) {
        this.proto = proto;
        this.rootNodes = rootNodes;
        this.boundTextNodes = boundTextNodes;
        this.boundElements = boundElements;
        this.contentTags = contentTags;
        this.viewContainers = collection_1.ListWrapper.createFixedSize(boundElements.length);
        this.lightDoms = collection_1.ListWrapper.createFixedSize(boundElements.length);
        this.hostLightDom = null;
        this.hydrated = false;
        this.eventHandlerRemovers = [];
        this.eventDispatcher = null;
        this.shadowRoot = null;
    }
    DomView.prototype.getDirectParentLightDom = function (boundElementIndex) {
        var binder = this.proto.elementBinders[boundElementIndex];
        var destLightDom = null;
        if (binder.parentIndex !== -1 && binder.distanceToParent === 1) {
            destLightDom = this.lightDoms[binder.parentIndex];
        }
        return destLightDom;
    };
    DomView.prototype.setElementProperty = function (elementIndex, propertyName, value) {
        var setter = collection_1.MapWrapper.get(this.proto.elementBinders[elementIndex].propertySetters, propertyName);
        setter(this.boundElements[elementIndex], value);
    };
    DomView.prototype.callAction = function (elementIndex, actionExpression, actionArgs) {
        var binder = this.proto.elementBinders[elementIndex];
        var hostAction = collection_1.MapWrapper.get(binder.hostActions, actionExpression);
        hostAction.eval(this.boundElements[elementIndex], this._localsWithAction(actionArgs));
    };
    DomView.prototype._localsWithAction = function (action) {
        var map = collection_1.MapWrapper.create();
        collection_1.MapWrapper.set(map, '$action', action);
        return new change_detection_1.Locals(null, map);
    };
    DomView.prototype.setText = function (textIndex, value) { dom_adapter_1.DOM.setText(this.boundTextNodes[textIndex], value); };
    DomView.prototype.dispatchEvent = function (elementIndex, eventName, event) {
        var allowDefaultBehavior = true;
        if (lang_1.isPresent(this.eventDispatcher)) {
            var evalLocals = collection_1.MapWrapper.create();
            collection_1.MapWrapper.set(evalLocals, '$event', event);
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
    };
    return DomView;
})();
exports.DomView = DomView;
exports.__esModule = true;
//# sourceMappingURL=view.js.map