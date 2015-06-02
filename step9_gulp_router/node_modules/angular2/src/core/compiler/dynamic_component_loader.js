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
var compiler_1 = require('./compiler');
var lang_1 = require('angular2/src/facade/lang');
var view_manager_1 = require('angular2/src/core/compiler/view_manager');
var element_ref_1 = require('./element_ref');
/**
 * @exportedAs angular2/view
 */
var ComponentRef = (function () {
    function ComponentRef(location, instance, dispose) {
        this.location = location;
        this.instance = instance;
        this.dispose = dispose;
    }
    Object.defineProperty(ComponentRef.prototype, "hostView", {
        get: function () { return this.location.parentView; },
        enumerable: true,
        configurable: true
    });
    return ComponentRef;
})();
exports.ComponentRef = ComponentRef;
/**
 * Service for dynamically loading a Component into an arbitrary position in the internal Angular
 * application tree.
 *
 * @exportedAs angular2/view
 */
var DynamicComponentLoader = (function () {
    function DynamicComponentLoader(compiler, viewManager) {
        this._compiler = compiler;
        this._viewManager = viewManager;
    }
    /**
     * Loads a component into the location given by the provided ElementRef. The loaded component
     * receives injection as if it in the place of the provided ElementRef.
     */
    DynamicComponentLoader.prototype.loadIntoExistingLocation = function (typeOrBinding, location, injector) {
        var _this = this;
        if (injector === void 0) { injector = null; }
        var binding = this._getBinding(typeOrBinding);
        return this._compiler.compile(binding.token).then(function (componentProtoViewRef) {
            _this._viewManager.createDynamicComponentView(location, componentProtoViewRef, binding, injector);
            var component = _this._viewManager.getComponent(location);
            var dispose = function () { throw new lang_1.BaseException("Not implemented"); };
            return new ComponentRef(location, component, dispose);
        });
    };
    /**
     * Loads a root component that is placed at the first element that matches the
     * component's selector.
     * The loaded component receives injection normally as a hosted view.
     */
    DynamicComponentLoader.prototype.loadAsRoot = function (typeOrBinding, overrideSelector, injector) {
        var _this = this;
        if (overrideSelector === void 0) { overrideSelector = null; }
        if (injector === void 0) { injector = null; }
        return this._compiler.compileInHost(this._getBinding(typeOrBinding)).then(function (hostProtoViewRef) {
            var hostViewRef = _this._viewManager.createRootHostView(hostProtoViewRef, overrideSelector, injector);
            var newLocation = new element_ref_1.ElementRef(hostViewRef, 0);
            var component = _this._viewManager.getComponent(newLocation);
            var dispose = function () {
                _this._viewManager.destroyRootHostView(hostViewRef);
            };
            return new ComponentRef(newLocation, component, dispose);
        });
    };
    /**
     * Loads a component into a free host view that is not yet attached to
     * a parent on the render side, although it is attached to a parent in the injector hierarchy.
     * The loaded component receives injection normally as a hosted view.
     */
    DynamicComponentLoader.prototype.loadIntoNewLocation = function (typeOrBinding, parentComponentLocation, injector) {
        var _this = this;
        if (injector === void 0) { injector = null; }
        return this._compiler.compileInHost(this._getBinding(typeOrBinding)).then(function (hostProtoViewRef) {
            var hostViewRef = _this._viewManager.createFreeHostView(parentComponentLocation, hostProtoViewRef, injector);
            var newLocation = new element_ref_1.ElementRef(hostViewRef, 0);
            var component = _this._viewManager.getComponent(newLocation);
            var dispose = function () {
                _this._viewManager.destroyFreeHostView(parentComponentLocation, hostViewRef);
            };
            return new ComponentRef(newLocation, component, dispose);
        });
    };
    /**
     * Loads a component next to the provided ElementRef. The loaded component receives
     * injection normally as a hosted view.
     */
    DynamicComponentLoader.prototype.loadNextToExistingLocation = function (typeOrBinding, location, injector) {
        var _this = this;
        if (injector === void 0) { injector = null; }
        var binding = this._getBinding(typeOrBinding);
        return this._compiler.compileInHost(binding).then(function (hostProtoViewRef) {
            var viewContainer = _this._viewManager.getViewContainer(location);
            var hostViewRef = viewContainer.create(hostProtoViewRef, viewContainer.length, null, injector);
            var newLocation = new element_ref_1.ElementRef(hostViewRef, 0);
            var component = _this._viewManager.getComponent(newLocation);
            var dispose = function () {
                var index = viewContainer.indexOf(hostViewRef);
                viewContainer.remove(index);
            };
            return new ComponentRef(newLocation, component, dispose);
        });
    };
    DynamicComponentLoader.prototype._getBinding = function (typeOrBinding) {
        var binding;
        if (typeOrBinding instanceof di_1.Binding) {
            binding = typeOrBinding;
        }
        else {
            binding = di_1.bind(typeOrBinding).toClass(typeOrBinding);
        }
        return binding;
    };
    DynamicComponentLoader = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [compiler_1.Compiler, view_manager_1.AppViewManager])
    ], DynamicComponentLoader);
    return DynamicComponentLoader;
})();
exports.DynamicComponentLoader = DynamicComponentLoader;
exports.__esModule = true;
//# sourceMappingURL=dynamic_component_loader.js.map