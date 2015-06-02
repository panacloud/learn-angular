var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var di_1 = require('angular2/di');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var content_tag_1 = require('./shadow_dom/content_tag');
var shadow_dom_strategy_1 = require('./shadow_dom/shadow_dom_strategy');
var event_manager_1 = require('./events/event_manager');
var proto_view_1 = require('./view/proto_view');
var view_1 = require('./view/view');
var view_container_1 = require('./view/view_container');
var util_1 = require('./util');
var api_1 = require('../api');
// TODO(tbosch): use an OpaqueToken here once our transpiler supports
// const expressions!
exports.DOCUMENT_TOKEN = 'DocumentToken';
var DomRenderer = (function (_super) {
    __extends(DomRenderer, _super);
    function DomRenderer(eventManager, shadowDomStrategy, document) {
        _super.call(this);
        this._eventManager = eventManager;
        this._shadowDomStrategy = shadowDomStrategy;
        this._document = document;
    }
    DomRenderer.prototype.createRootHostView = function (hostProtoViewRef, hostElementSelector) {
        var hostProtoView = proto_view_1.resolveInternalDomProtoView(hostProtoViewRef);
        var element = dom_adapter_1.DOM.querySelector(this._document, hostElementSelector);
        if (lang_1.isBlank(element)) {
            throw new lang_1.BaseException("The selector \"" + hostElementSelector + "\" did not match any elements");
        }
        return new view_1.DomViewRef(this._createView(hostProtoView, element));
    };
    DomRenderer.prototype.detachFreeHostView = function (parentHostViewRef, hostViewRef) {
        var hostView = view_1.resolveInternalDomView(hostViewRef);
        this._removeViewNodes(hostView);
    };
    DomRenderer.prototype.createView = function (protoViewRef) {
        var protoView = proto_view_1.resolveInternalDomProtoView(protoViewRef);
        return new view_1.DomViewRef(this._createView(protoView, null));
    };
    DomRenderer.prototype.destroyView = function (view) {
        // noop for now
    };
    DomRenderer.prototype.attachComponentView = function (hostViewRef, elementIndex, componentViewRef) {
        var hostView = view_1.resolveInternalDomView(hostViewRef);
        var componentView = view_1.resolveInternalDomView(componentViewRef);
        var element = hostView.boundElements[elementIndex];
        var lightDom = hostView.lightDoms[elementIndex];
        if (lang_1.isPresent(lightDom)) {
            lightDom.attachShadowDomView(componentView);
        }
        var shadowRoot = this._shadowDomStrategy.prepareShadowRoot(element);
        this._moveViewNodesIntoParent(shadowRoot, componentView);
        componentView.hostLightDom = lightDom;
        componentView.shadowRoot = shadowRoot;
    };
    DomRenderer.prototype.setComponentViewRootNodes = function (componentViewRef, rootNodes) {
        var componentView = view_1.resolveInternalDomView(componentViewRef);
        this._removeViewNodes(componentView);
        componentView.rootNodes = rootNodes;
        this._moveViewNodesIntoParent(componentView.shadowRoot, componentView);
    };
    DomRenderer.prototype.getHostElement = function (hostViewRef) {
        var hostView = view_1.resolveInternalDomView(hostViewRef);
        return hostView.boundElements[0];
    };
    DomRenderer.prototype.detachComponentView = function (hostViewRef, boundElementIndex, componentViewRef) {
        var hostView = view_1.resolveInternalDomView(hostViewRef);
        var componentView = view_1.resolveInternalDomView(componentViewRef);
        this._removeViewNodes(componentView);
        var lightDom = hostView.lightDoms[boundElementIndex];
        if (lang_1.isPresent(lightDom)) {
            lightDom.detachShadowDomView();
        }
        componentView.hostLightDom = null;
        componentView.shadowRoot = null;
    };
    DomRenderer.prototype.attachViewInContainer = function (parentViewRef, boundElementIndex, atIndex, viewRef) {
        var parentView = view_1.resolveInternalDomView(parentViewRef);
        var view = view_1.resolveInternalDomView(viewRef);
        var viewContainer = this._getOrCreateViewContainer(parentView, boundElementIndex);
        collection_1.ListWrapper.insert(viewContainer.views, atIndex, view);
        view.hostLightDom = parentView.hostLightDom;
        var directParentLightDom = parentView.getDirectParentLightDom(boundElementIndex);
        if (lang_1.isBlank(directParentLightDom)) {
            var siblingToInsertAfter;
            if (atIndex == 0) {
                siblingToInsertAfter = parentView.boundElements[boundElementIndex];
            }
            else {
                siblingToInsertAfter = collection_1.ListWrapper.last(viewContainer.views[atIndex - 1].rootNodes);
            }
            this._moveViewNodesAfterSibling(siblingToInsertAfter, view);
        }
        else {
            directParentLightDom.redistribute();
        }
        // new content tags might have appeared, we need to redistribute.
        if (lang_1.isPresent(parentView.hostLightDom)) {
            parentView.hostLightDom.redistribute();
        }
    };
    DomRenderer.prototype.detachViewInContainer = function (parentViewRef, boundElementIndex, atIndex, viewRef) {
        var parentView = view_1.resolveInternalDomView(parentViewRef);
        var view = view_1.resolveInternalDomView(viewRef);
        var viewContainer = parentView.viewContainers[boundElementIndex];
        var detachedView = viewContainer.views[atIndex];
        collection_1.ListWrapper.removeAt(viewContainer.views, atIndex);
        var directParentLightDom = parentView.getDirectParentLightDom(boundElementIndex);
        if (lang_1.isBlank(directParentLightDom)) {
            this._removeViewNodes(detachedView);
        }
        else {
            directParentLightDom.redistribute();
        }
        view.hostLightDom = null;
        // content tags might have disappeared we need to do redistribution.
        if (lang_1.isPresent(parentView.hostLightDom)) {
            parentView.hostLightDom.redistribute();
        }
    };
    DomRenderer.prototype.hydrateView = function (viewRef) {
        var view = view_1.resolveInternalDomView(viewRef);
        if (view.hydrated)
            throw new lang_1.BaseException('The view is already hydrated.');
        view.hydrated = true;
        for (var i = 0; i < view.lightDoms.length; ++i) {
            var lightDom = view.lightDoms[i];
            if (lang_1.isPresent(lightDom)) {
                lightDom.redistribute();
            }
        }
        // add global events
        view.eventHandlerRemovers = collection_1.ListWrapper.create();
        var binders = view.proto.elementBinders;
        for (var binderIdx = 0; binderIdx < binders.length; binderIdx++) {
            var binder = binders[binderIdx];
            if (lang_1.isPresent(binder.globalEvents)) {
                for (var i = 0; i < binder.globalEvents.length; i++) {
                    var globalEvent = binder.globalEvents[i];
                    var remover = this._createGlobalEventListener(view, binderIdx, globalEvent.name, globalEvent.target, globalEvent.fullName);
                    collection_1.ListWrapper.push(view.eventHandlerRemovers, remover);
                }
            }
        }
        if (lang_1.isPresent(view.hostLightDom)) {
            view.hostLightDom.redistribute();
        }
    };
    DomRenderer.prototype.dehydrateView = function (viewRef) {
        var view = view_1.resolveInternalDomView(viewRef);
        // remove global events
        for (var i = 0; i < view.eventHandlerRemovers.length; i++) {
            view.eventHandlerRemovers[i]();
        }
        view.eventHandlerRemovers = null;
        view.hydrated = false;
    };
    DomRenderer.prototype.setElementProperty = function (viewRef, elementIndex, propertyName, propertyValue) {
        var view = view_1.resolveInternalDomView(viewRef);
        view.setElementProperty(elementIndex, propertyName, propertyValue);
    };
    DomRenderer.prototype.callAction = function (viewRef, elementIndex, actionExpression, actionArgs) {
        var view = view_1.resolveInternalDomView(viewRef);
        view.callAction(elementIndex, actionExpression, actionArgs);
    };
    DomRenderer.prototype.setText = function (viewRef, textNodeIndex, text) {
        var view = view_1.resolveInternalDomView(viewRef);
        dom_adapter_1.DOM.setText(view.boundTextNodes[textNodeIndex], text);
    };
    DomRenderer.prototype.setEventDispatcher = function (viewRef, dispatcher /*api.EventDispatcher*/) {
        var view = view_1.resolveInternalDomView(viewRef);
        view.eventDispatcher = dispatcher;
    };
    DomRenderer.prototype._createView = function (protoView, inplaceElement) {
        var rootElementClone = lang_1.isPresent(inplaceElement) ? inplaceElement : dom_adapter_1.DOM.importIntoDoc(protoView.element);
        var elementsWithBindingsDynamic;
        if (protoView.isTemplateElement) {
            elementsWithBindingsDynamic =
                dom_adapter_1.DOM.querySelectorAll(dom_adapter_1.DOM.content(rootElementClone), util_1.NG_BINDING_CLASS_SELECTOR);
        }
        else {
            elementsWithBindingsDynamic = dom_adapter_1.DOM.getElementsByClassName(rootElementClone, util_1.NG_BINDING_CLASS);
        }
        var elementsWithBindings = collection_1.ListWrapper.createFixedSize(elementsWithBindingsDynamic.length);
        for (var binderIdx = 0; binderIdx < elementsWithBindingsDynamic.length; ++binderIdx) {
            elementsWithBindings[binderIdx] = elementsWithBindingsDynamic[binderIdx];
        }
        var viewRootNodes;
        if (protoView.isTemplateElement) {
            var childNode = dom_adapter_1.DOM.firstChild(dom_adapter_1.DOM.content(rootElementClone));
            viewRootNodes =
                []; // TODO(perf): Should be fixed size, since we could pre-compute in in DomProtoView
            // Note: An explicit loop is the fastest way to convert a DOM array into a JS array!
            while (childNode != null) {
                collection_1.ListWrapper.push(viewRootNodes, childNode);
                childNode = dom_adapter_1.DOM.nextSibling(childNode);
            }
        }
        else {
            viewRootNodes = [rootElementClone];
        }
        var binders = protoView.elementBinders;
        var boundTextNodes = [];
        var boundElements = collection_1.ListWrapper.createFixedSize(binders.length);
        var contentTags = collection_1.ListWrapper.createFixedSize(binders.length);
        for (var binderIdx = 0; binderIdx < binders.length; binderIdx++) {
            var binder = binders[binderIdx];
            var element;
            if (binderIdx === 0 && protoView.rootBindingOffset === 1) {
                element = rootElementClone;
            }
            else {
                element = elementsWithBindings[binderIdx - protoView.rootBindingOffset];
            }
            boundElements[binderIdx] = element;
            // boundTextNodes
            var childNodes = dom_adapter_1.DOM.childNodes(dom_adapter_1.DOM.templateAwareRoot(element));
            var textNodeIndices = binder.textNodeIndices;
            for (var i = 0; i < textNodeIndices.length; i++) {
                collection_1.ListWrapper.push(boundTextNodes, childNodes[textNodeIndices[i]]);
            }
            // contentTags
            var contentTag = null;
            if (lang_1.isPresent(binder.contentTagSelector)) {
                contentTag = new content_tag_1.Content(element, binder.contentTagSelector);
            }
            contentTags[binderIdx] = contentTag;
        }
        var view = new view_1.DomView(protoView, viewRootNodes, boundTextNodes, boundElements, contentTags);
        for (var binderIdx = 0; binderIdx < binders.length; binderIdx++) {
            var binder = binders[binderIdx];
            var element = boundElements[binderIdx];
            // lightDoms
            var lightDom = null;
            if (lang_1.isPresent(binder.componentId)) {
                lightDom = this._shadowDomStrategy.constructLightDom(view, boundElements[binderIdx]);
            }
            view.lightDoms[binderIdx] = lightDom;
            // init contentTags
            var contentTag = contentTags[binderIdx];
            if (lang_1.isPresent(contentTag)) {
                var destLightDom = view.getDirectParentLightDom(binderIdx);
                contentTag.init(destLightDom);
            }
            // events
            if (lang_1.isPresent(binder.eventLocals) && lang_1.isPresent(binder.localEvents)) {
                for (var i = 0; i < binder.localEvents.length; i++) {
                    this._createEventListener(view, element, binderIdx, binder.localEvents[i].name, binder.eventLocals);
                }
            }
        }
        return view;
    };
    DomRenderer.prototype._createEventListener = function (view, element, elementIndex, eventName, eventLocals) {
        this._eventManager.addEventListener(element, eventName, function (event) { view.dispatchEvent(elementIndex, eventName, event); });
    };
    DomRenderer.prototype._moveViewNodesAfterSibling = function (sibling, view) {
        for (var i = view.rootNodes.length - 1; i >= 0; --i) {
            dom_adapter_1.DOM.insertAfter(sibling, view.rootNodes[i]);
        }
    };
    DomRenderer.prototype._moveViewNodesIntoParent = function (parent, view) {
        for (var i = 0; i < view.rootNodes.length; ++i) {
            dom_adapter_1.DOM.appendChild(parent, view.rootNodes[i]);
        }
    };
    DomRenderer.prototype._removeViewNodes = function (view) {
        var len = view.rootNodes.length;
        if (len == 0)
            return;
        var parent = view.rootNodes[0].parentNode;
        for (var i = len - 1; i >= 0; --i) {
            dom_adapter_1.DOM.removeChild(parent, view.rootNodes[i]);
        }
    };
    DomRenderer.prototype._getOrCreateViewContainer = function (parentView, boundElementIndex) {
        var vc = parentView.viewContainers[boundElementIndex];
        if (lang_1.isBlank(vc)) {
            vc = new view_container_1.DomViewContainer();
            parentView.viewContainers[boundElementIndex] = vc;
        }
        return vc;
    };
    DomRenderer.prototype._createGlobalEventListener = function (view, elementIndex, eventName, eventTarget, fullName) {
        return this._eventManager.addGlobalEventListener(eventTarget, eventName, function (event) { view.dispatchEvent(elementIndex, fullName, event); });
    };
    DomRenderer = __decorate([
        di_1.Injectable(),
        __param(2, di_1.Inject(exports.DOCUMENT_TOKEN)), 
        __metadata('design:paramtypes', [event_manager_1.EventManager, shadow_dom_strategy_1.ShadowDomStrategy, Object])
    ], DomRenderer);
    return DomRenderer;
})(api_1.Renderer);
exports.DomRenderer = DomRenderer;
exports.__esModule = true;
//# sourceMappingURL=dom_renderer.js.map