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
var di_1 = require('angular2/di');
var lang_1 = require('angular2/src/facade/lang');
var view_ref_1 = require('./view_ref');
var api_1 = require('angular2/src/render/api');
var view_manager_utils_1 = require('./view_manager_utils');
var view_pool_1 = require('./view_pool');
/**
 * Entry point for creating, moving views in the view hierarchy and destroying views.
 * This manager contains all recursion and delegates to helper methods
 * in AppViewManagerUtils and the Renderer, so unit tests get simpler.
 */
var AppViewManager = (function () {
    function AppViewManager(viewPool, utils, renderer) {
        this._renderer = renderer;
        this._viewPool = viewPool;
        this._utils = utils;
    }
    AppViewManager.prototype.getComponentView = function (hostLocation) {
        var hostView = view_ref_1.internalView(hostLocation.parentView);
        var boundElementIndex = hostLocation.boundElementIndex;
        return new view_ref_1.ViewRef(hostView.componentChildViews[boundElementIndex]);
    };
    AppViewManager.prototype.getViewContainer = function (location) {
        var hostView = view_ref_1.internalView(location.parentView);
        return hostView.elementInjectors[location.boundElementIndex].getViewContainerRef();
    };
    AppViewManager.prototype.getComponent = function (hostLocation) {
        var hostView = view_ref_1.internalView(hostLocation.parentView);
        var boundElementIndex = hostLocation.boundElementIndex;
        return this._utils.getComponentInstance(hostView, boundElementIndex);
    };
    AppViewManager.prototype.createDynamicComponentView = function (hostLocation, componentProtoViewRef, componentBinding, injector) {
        var componentProtoView = view_ref_1.internalProtoView(componentProtoViewRef);
        var hostView = view_ref_1.internalView(hostLocation.parentView);
        var boundElementIndex = hostLocation.boundElementIndex;
        var binder = hostView.proto.elementBinders[boundElementIndex];
        if (!binder.hasDynamicComponent()) {
            throw new lang_1.BaseException("There is no dynamic component directive at element " + boundElementIndex);
        }
        var componentView = this._createPooledView(componentProtoView);
        this._renderer.attachComponentView(hostView.render, boundElementIndex, componentView.render);
        this._utils.attachComponentView(hostView, boundElementIndex, componentView);
        this._utils.hydrateDynamicComponentInElementInjector(hostView, boundElementIndex, componentBinding, injector);
        this._utils.hydrateComponentView(hostView, boundElementIndex);
        this._viewHydrateRecurse(componentView);
        return new view_ref_1.ViewRef(componentView);
    };
    AppViewManager.prototype.createRootHostView = function (hostProtoViewRef, overrideSelector, injector) {
        var hostProtoView = view_ref_1.internalProtoView(hostProtoViewRef);
        var hostElementSelector = overrideSelector;
        if (lang_1.isBlank(hostElementSelector)) {
            hostElementSelector = hostProtoView.elementBinders[0].componentDirective.metadata.selector;
        }
        var renderView = this._renderer.createRootHostView(hostProtoView.render, hostElementSelector);
        var hostView = this._utils.createView(hostProtoView, renderView, this, this._renderer);
        this._renderer.setEventDispatcher(hostView.render, hostView);
        this._createViewRecurse(hostView);
        this._utils.hydrateRootHostView(hostView, injector);
        this._viewHydrateRecurse(hostView);
        return new view_ref_1.ViewRef(hostView);
    };
    AppViewManager.prototype.destroyRootHostView = function (hostViewRef) {
        // Note: Don't detach the hostView as we want to leave the
        // root element in place. Also don't put the hostView into the view pool
        // as it is depending on the element for which it was created.
        var hostView = view_ref_1.internalView(hostViewRef);
        // We do want to destroy the component view though.
        this._viewDehydrateRecurse(hostView, true);
        this._renderer.destroyView(hostView.render);
    };
    AppViewManager.prototype.createFreeHostView = function (parentComponentLocation, hostProtoViewRef, injector) {
        var hostProtoView = view_ref_1.internalProtoView(hostProtoViewRef);
        var hostView = this._createPooledView(hostProtoView);
        var parentComponentHostView = view_ref_1.internalView(parentComponentLocation.parentView);
        var parentComponentBoundElementIndex = parentComponentLocation.boundElementIndex;
        this._utils.attachAndHydrateFreeHostView(parentComponentHostView, parentComponentBoundElementIndex, hostView, injector);
        this._viewHydrateRecurse(hostView);
        return new view_ref_1.ViewRef(hostView);
    };
    AppViewManager.prototype.destroyFreeHostView = function (parentComponentLocation, hostViewRef) {
        var hostView = view_ref_1.internalView(hostViewRef);
        var parentView = view_ref_1.internalView(parentComponentLocation.parentView)
            .componentChildViews[parentComponentLocation.boundElementIndex];
        this._destroyFreeHostView(parentView, hostView);
    };
    AppViewManager.prototype.createViewInContainer = function (viewContainerLocation, atIndex, protoViewRef, context, injector) {
        if (context === void 0) { context = null; }
        if (injector === void 0) { injector = null; }
        var protoView = view_ref_1.internalProtoView(protoViewRef);
        var parentView = view_ref_1.internalView(viewContainerLocation.parentView);
        var boundElementIndex = viewContainerLocation.boundElementIndex;
        var contextView = null;
        var contextBoundElementIndex = null;
        if (lang_1.isPresent(context)) {
            contextView = view_ref_1.internalView(context.parentView);
            contextBoundElementIndex = context.boundElementIndex;
        }
        var view = this._createPooledView(protoView);
        this._renderer.attachViewInContainer(parentView.render, boundElementIndex, atIndex, view.render);
        this._utils.attachViewInContainer(parentView, boundElementIndex, contextView, contextBoundElementIndex, atIndex, view);
        this._utils.hydrateViewInContainer(parentView, boundElementIndex, contextView, contextBoundElementIndex, atIndex, injector);
        this._viewHydrateRecurse(view);
        return new view_ref_1.ViewRef(view);
    };
    AppViewManager.prototype.destroyViewInContainer = function (viewContainerLocation, atIndex) {
        var parentView = view_ref_1.internalView(viewContainerLocation.parentView);
        var boundElementIndex = viewContainerLocation.boundElementIndex;
        this._destroyViewInContainer(parentView, boundElementIndex, atIndex);
    };
    AppViewManager.prototype.attachViewInContainer = function (viewContainerLocation, atIndex, viewRef) {
        var view = view_ref_1.internalView(viewRef);
        var parentView = view_ref_1.internalView(viewContainerLocation.parentView);
        var boundElementIndex = viewContainerLocation.boundElementIndex;
        // TODO(tbosch): the public methods attachViewInContainer/detachViewInContainer
        // are used for moving elements without the same container.
        // We will change this into an atomic `move` operation, which should preserve the
        // previous parent injector (see https://github.com/angular/angular/issues/1377).
        // Right now we are destroying any special
        // context view that might have been used.
        this._utils.attachViewInContainer(parentView, boundElementIndex, null, null, atIndex, view);
        this._renderer.attachViewInContainer(parentView.render, boundElementIndex, atIndex, view.render);
        return viewRef;
    };
    AppViewManager.prototype.detachViewInContainer = function (viewContainerLocation, atIndex) {
        var parentView = view_ref_1.internalView(viewContainerLocation.parentView);
        var boundElementIndex = viewContainerLocation.boundElementIndex;
        var viewContainer = parentView.viewContainers[boundElementIndex];
        var view = viewContainer.views[atIndex];
        this._utils.detachViewInContainer(parentView, boundElementIndex, atIndex);
        this._renderer.detachViewInContainer(parentView.render, boundElementIndex, atIndex, view.render);
        return new view_ref_1.ViewRef(view);
    };
    AppViewManager.prototype._createPooledView = function (protoView) {
        var view = this._viewPool.getView(protoView);
        if (lang_1.isBlank(view)) {
            view = this._utils.createView(protoView, this._renderer.createView(protoView.render), this, this._renderer);
            this._renderer.setEventDispatcher(view.render, view);
            this._createViewRecurse(view);
        }
        return view;
    };
    AppViewManager.prototype._createViewRecurse = function (view) {
        var binders = view.proto.elementBinders;
        for (var binderIdx = 0; binderIdx < binders.length; binderIdx++) {
            var binder = binders[binderIdx];
            if (binder.hasStaticComponent()) {
                var childView = this._createPooledView(binder.nestedProtoView);
                this._renderer.attachComponentView(view.render, binderIdx, childView.render);
                this._utils.attachComponentView(view, binderIdx, childView);
            }
        }
    };
    AppViewManager.prototype._destroyPooledView = function (view) {
        // TODO: if the pool is full, call renderer.destroyView as well!
        this._viewPool.returnView(view);
    };
    AppViewManager.prototype._destroyViewInContainer = function (parentView, boundElementIndex, atIndex) {
        var viewContainer = parentView.viewContainers[boundElementIndex];
        var view = viewContainer.views[atIndex];
        this._viewDehydrateRecurse(view, false);
        this._utils.detachViewInContainer(parentView, boundElementIndex, atIndex);
        this._renderer.detachViewInContainer(parentView.render, boundElementIndex, atIndex, view.render);
        this._destroyPooledView(view);
    };
    AppViewManager.prototype._destroyComponentView = function (hostView, boundElementIndex, componentView) {
        this._viewDehydrateRecurse(componentView, false);
        this._renderer.detachComponentView(hostView.render, boundElementIndex, componentView.render);
        this._utils.detachComponentView(hostView, boundElementIndex);
        this._destroyPooledView(componentView);
    };
    AppViewManager.prototype._destroyFreeHostView = function (parentView, hostView) {
        this._viewDehydrateRecurse(hostView, true);
        this._renderer.detachFreeHostView(parentView.render, hostView.render);
        this._utils.detachFreeHostView(parentView, hostView);
        this._destroyPooledView(hostView);
    };
    AppViewManager.prototype._viewHydrateRecurse = function (view) {
        this._renderer.hydrateView(view.render);
        var binders = view.proto.elementBinders;
        for (var i = 0; i < binders.length; ++i) {
            if (binders[i].hasStaticComponent()) {
                this._utils.hydrateComponentView(view, i);
                this._viewHydrateRecurse(view.componentChildViews[i]);
            }
        }
    };
    AppViewManager.prototype._viewDehydrateRecurse = function (view, forceDestroyComponents) {
        this._utils.dehydrateView(view);
        this._renderer.dehydrateView(view.render);
        var binders = view.proto.elementBinders;
        for (var i = 0; i < binders.length; i++) {
            var componentView = view.componentChildViews[i];
            if (lang_1.isPresent(componentView)) {
                if (binders[i].hasDynamicComponent() || forceDestroyComponents) {
                    this._destroyComponentView(view, i, componentView);
                }
                else {
                    this._viewDehydrateRecurse(componentView, false);
                }
            }
            var vc = view.viewContainers[i];
            if (lang_1.isPresent(vc)) {
                for (var j = vc.views.length - 1; j >= 0; j--) {
                    this._destroyViewInContainer(view, i, j);
                }
            }
        }
        // freeHostViews
        for (var i = view.freeHostViews.length - 1; i >= 0; i--) {
            var hostView = view.freeHostViews[i];
            this._destroyFreeHostView(view, hostView);
        }
    };
    AppViewManager = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [view_pool_1.AppViewPool, view_manager_utils_1.AppViewManagerUtils, api_1.Renderer])
    ], AppViewManager);
    return AppViewManager;
})();
exports.AppViewManager = AppViewManager;
exports.__esModule = true;
//# sourceMappingURL=view_manager.js.map