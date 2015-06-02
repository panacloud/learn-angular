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
var collection_1 = require('angular2/src/facade/collection');
var eli = require('./element_injector');
var lang_1 = require('angular2/src/facade/lang');
var viewModule = require('./view');
var directive_resolver_1 = require('./directive_resolver');
var AppViewManagerUtils = (function () {
    function AppViewManagerUtils(metadataReader) {
        this._directiveResolver = metadataReader;
    }
    AppViewManagerUtils.prototype.getComponentInstance = function (parentView, boundElementIndex) {
        var binder = parentView.proto.elementBinders[boundElementIndex];
        var eli = parentView.elementInjectors[boundElementIndex];
        if (binder.hasDynamicComponent()) {
            return eli.getDynamicallyLoadedComponent();
        }
        else {
            return eli.getComponent();
        }
    };
    AppViewManagerUtils.prototype.createView = function (protoView, renderView, viewManager, renderer) {
        var view = new viewModule.AppView(renderer, protoView, protoView.protoLocals);
        // TODO(tbosch): pass RenderViewRef as argument to AppView!
        view.render = renderView;
        var changeDetector = protoView.protoChangeDetector.instantiate(view);
        var binders = protoView.elementBinders;
        var elementInjectors = collection_1.ListWrapper.createFixedSize(binders.length);
        var rootElementInjectors = [];
        var preBuiltObjects = collection_1.ListWrapper.createFixedSize(binders.length);
        var componentChildViews = collection_1.ListWrapper.createFixedSize(binders.length);
        for (var binderIdx = 0; binderIdx < binders.length; binderIdx++) {
            var binder = binders[binderIdx];
            var elementInjector = null;
            // elementInjectors and rootElementInjectors
            var protoElementInjector = binder.protoElementInjector;
            if (lang_1.isPresent(protoElementInjector)) {
                if (lang_1.isPresent(protoElementInjector.parent)) {
                    var parentElementInjector = elementInjectors[protoElementInjector.parent.index];
                    elementInjector = protoElementInjector.instantiate(parentElementInjector);
                }
                else {
                    elementInjector = protoElementInjector.instantiate(null);
                    collection_1.ListWrapper.push(rootElementInjectors, elementInjector);
                }
            }
            elementInjectors[binderIdx] = elementInjector;
            // preBuiltObjects
            if (lang_1.isPresent(elementInjector)) {
                var embeddedProtoView = binder.hasEmbeddedProtoView() ? binder.nestedProtoView : null;
                preBuiltObjects[binderIdx] = new eli.PreBuiltObjects(viewManager, view, embeddedProtoView);
            }
        }
        view.init(changeDetector, elementInjectors, rootElementInjectors, preBuiltObjects, componentChildViews);
        return view;
    };
    AppViewManagerUtils.prototype.attachComponentView = function (hostView, boundElementIndex, componentView) {
        var childChangeDetector = componentView.changeDetector;
        hostView.changeDetector.addShadowDomChild(childChangeDetector);
        hostView.componentChildViews[boundElementIndex] = componentView;
    };
    AppViewManagerUtils.prototype.detachComponentView = function (hostView, boundElementIndex) {
        var componentView = hostView.componentChildViews[boundElementIndex];
        hostView.changeDetector.removeShadowDomChild(componentView.changeDetector);
        hostView.componentChildViews[boundElementIndex] = null;
    };
    AppViewManagerUtils.prototype.hydrateComponentView = function (hostView, boundElementIndex, injector) {
        if (injector === void 0) { injector = null; }
        var elementInjector = hostView.elementInjectors[boundElementIndex];
        var componentView = hostView.componentChildViews[boundElementIndex];
        var component = this.getComponentInstance(hostView, boundElementIndex);
        this._hydrateView(componentView, injector, elementInjector, component, null);
    };
    AppViewManagerUtils.prototype.hydrateRootHostView = function (hostView, injector) {
        if (injector === void 0) { injector = null; }
        this._hydrateView(hostView, injector, null, new Object(), null);
    };
    AppViewManagerUtils.prototype.attachAndHydrateFreeHostView = function (parentComponentHostView, parentComponentBoundElementIndex, hostView, injector) {
        if (injector === void 0) { injector = null; }
        var hostElementInjector = parentComponentHostView.elementInjectors[parentComponentBoundElementIndex];
        var parentView = parentComponentHostView.componentChildViews[parentComponentBoundElementIndex];
        parentView.changeDetector.addChild(hostView.changeDetector);
        collection_1.ListWrapper.push(parentView.freeHostViews, hostView);
        this._hydrateView(hostView, injector, hostElementInjector, new Object(), null);
    };
    AppViewManagerUtils.prototype.detachFreeHostView = function (parentView, hostView) {
        parentView.changeDetector.removeChild(hostView.changeDetector);
        collection_1.ListWrapper.remove(parentView.freeHostViews, hostView);
    };
    AppViewManagerUtils.prototype.attachViewInContainer = function (parentView, boundElementIndex, contextView, contextBoundElementIndex, atIndex, view) {
        if (lang_1.isBlank(contextView)) {
            contextView = parentView;
            contextBoundElementIndex = boundElementIndex;
        }
        parentView.changeDetector.addChild(view.changeDetector);
        var viewContainer = parentView.viewContainers[boundElementIndex];
        if (lang_1.isBlank(viewContainer)) {
            viewContainer = new viewModule.AppViewContainer();
            parentView.viewContainers[boundElementIndex] = viewContainer;
        }
        collection_1.ListWrapper.insert(viewContainer.views, atIndex, view);
        var sibling;
        if (atIndex == 0) {
            sibling = null;
        }
        else {
            sibling = collection_1.ListWrapper.last(viewContainer.views[atIndex - 1].rootElementInjectors);
        }
        var elementInjector = contextView.elementInjectors[contextBoundElementIndex];
        for (var i = view.rootElementInjectors.length - 1; i >= 0; i--) {
            view.rootElementInjectors[i].linkAfter(elementInjector, sibling);
        }
    };
    AppViewManagerUtils.prototype.detachViewInContainer = function (parentView, boundElementIndex, atIndex) {
        var viewContainer = parentView.viewContainers[boundElementIndex];
        var view = viewContainer.views[atIndex];
        view.changeDetector.remove();
        collection_1.ListWrapper.removeAt(viewContainer.views, atIndex);
        for (var i = 0; i < view.rootElementInjectors.length; ++i) {
            view.rootElementInjectors[i].unlink();
        }
    };
    AppViewManagerUtils.prototype.hydrateViewInContainer = function (parentView, boundElementIndex, contextView, contextBoundElementIndex, atIndex, injector) {
        if (lang_1.isBlank(contextView)) {
            contextView = parentView;
            contextBoundElementIndex = boundElementIndex;
        }
        var viewContainer = parentView.viewContainers[boundElementIndex];
        var view = viewContainer.views[atIndex];
        var elementInjector = contextView.elementInjectors[contextBoundElementIndex].getHost();
        this._hydrateView(view, injector, elementInjector, contextView.context, contextView.locals);
    };
    AppViewManagerUtils.prototype.hydrateDynamicComponentInElementInjector = function (hostView, boundElementIndex, componentBinding, injector) {
        if (injector === void 0) { injector = null; }
        var elementInjector = hostView.elementInjectors[boundElementIndex];
        if (lang_1.isPresent(elementInjector.getDynamicallyLoadedComponent())) {
            throw new lang_1.BaseException("There already is a dynamic component loaded at element " + boundElementIndex);
        }
        if (lang_1.isBlank(injector)) {
            injector = elementInjector.getLightDomAppInjector();
        }
        var annotation = this._directiveResolver.resolve(componentBinding.token);
        var componentDirective = eli.DirectiveBinding.createFromBinding(componentBinding, annotation);
        elementInjector.dynamicallyCreateComponent(componentDirective, injector);
    };
    AppViewManagerUtils.prototype._hydrateView = function (view, appInjector, hostElementInjector, context, parentLocals) {
        if (lang_1.isBlank(appInjector)) {
            appInjector = hostElementInjector.getShadowDomAppInjector();
        }
        if (lang_1.isBlank(appInjector)) {
            appInjector = hostElementInjector.getLightDomAppInjector();
        }
        view.context = context;
        view.locals.parent = parentLocals;
        var binders = view.proto.elementBinders;
        for (var i = 0; i < binders.length; ++i) {
            var elementInjector = view.elementInjectors[i];
            if (lang_1.isPresent(elementInjector)) {
                elementInjector.hydrate(appInjector, hostElementInjector, view.preBuiltObjects[i]);
                this._setUpEventEmitters(view, elementInjector, i);
                this._setUpHostActions(view, elementInjector, i);
                // The exporting of $implicit is a special case. Since multiple elements will all export
                // the different values as $implicit, directly assign $implicit bindings to the variable
                // name.
                var exportImplicitName = elementInjector.getExportImplicitName();
                if (elementInjector.isExportingComponent()) {
                    view.locals.set(exportImplicitName, elementInjector.getComponent());
                }
                else if (elementInjector.isExportingElement()) {
                    view.locals.set(exportImplicitName, elementInjector.getElementRef().domElement);
                }
            }
        }
        view.changeDetector.hydrate(view.context, view.locals, view);
    };
    AppViewManagerUtils.prototype._setUpEventEmitters = function (view, elementInjector, boundElementIndex) {
        var emitters = elementInjector.getEventEmitterAccessors();
        for (var directiveIndex = 0; directiveIndex < emitters.length; ++directiveIndex) {
            var directiveEmitters = emitters[directiveIndex];
            var directive = elementInjector.getDirectiveAtIndex(directiveIndex);
            for (var eventIndex = 0; eventIndex < directiveEmitters.length; ++eventIndex) {
                var eventEmitterAccessor = directiveEmitters[eventIndex];
                eventEmitterAccessor.subscribe(view, boundElementIndex, directive);
            }
        }
    };
    AppViewManagerUtils.prototype._setUpHostActions = function (view, elementInjector, boundElementIndex) {
        var hostActions = elementInjector.getHostActionAccessors();
        for (var directiveIndex = 0; directiveIndex < hostActions.length; ++directiveIndex) {
            var directiveHostActions = hostActions[directiveIndex];
            var directive = elementInjector.getDirectiveAtIndex(directiveIndex);
            for (var index = 0; index < directiveHostActions.length; ++index) {
                var hostActionAccessor = directiveHostActions[index];
                hostActionAccessor.subscribe(view, boundElementIndex, directive);
            }
        }
    };
    AppViewManagerUtils.prototype.dehydrateView = function (view) {
        var binders = view.proto.elementBinders;
        for (var i = 0; i < binders.length; ++i) {
            var elementInjector = view.elementInjectors[i];
            if (lang_1.isPresent(elementInjector)) {
                elementInjector.dehydrate();
            }
        }
        if (lang_1.isPresent(view.locals)) {
            view.locals.clearValues();
        }
        view.context = null;
        view.changeDetector.dehydrate();
    };
    AppViewManagerUtils = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [directive_resolver_1.DirectiveResolver])
    ], AppViewManagerUtils);
    return AppViewManagerUtils;
})();
exports.AppViewManagerUtils = AppViewManagerUtils;
exports.__esModule = true;
//# sourceMappingURL=view_manager_utils.js.map