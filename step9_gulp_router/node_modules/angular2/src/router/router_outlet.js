"use strict";
Object.defineProperties(module.exports, {
  RouterOutlet: {get: function() {
      return RouterOutlet;
    }},
  __esModule: {value: true}
});
var $__angular2_47_src_47_facade_47_async__,
    $__angular2_47_src_47_facade_47_lang__,
    $__angular2_47_src_47_core_47_annotations_95_impl_47_annotations__,
    $__angular2_47_src_47_core_47_annotations_95_impl_47_di__,
    $__angular2_47_core__,
    $__angular2_47_di__,
    $__router__,
    $__instruction__;
var $__0 = ($__angular2_47_src_47_facade_47_async__ = require("angular2/src/facade/async"), $__angular2_47_src_47_facade_47_async__ && $__angular2_47_src_47_facade_47_async__.__esModule && $__angular2_47_src_47_facade_47_async__ || {default: $__angular2_47_src_47_facade_47_async__}),
    Promise = $__0.Promise,
    PromiseWrapper = $__0.PromiseWrapper;
var $__1 = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}),
    isBlank = $__1.isBlank,
    isPresent = $__1.isPresent;
var Directive = ($__angular2_47_src_47_core_47_annotations_95_impl_47_annotations__ = require("angular2/src/core/annotations_impl/annotations"), $__angular2_47_src_47_core_47_annotations_95_impl_47_annotations__ && $__angular2_47_src_47_core_47_annotations_95_impl_47_annotations__.__esModule && $__angular2_47_src_47_core_47_annotations_95_impl_47_annotations__ || {default: $__angular2_47_src_47_core_47_annotations_95_impl_47_annotations__}).Directive;
var Attribute = ($__angular2_47_src_47_core_47_annotations_95_impl_47_di__ = require("angular2/src/core/annotations_impl/di"), $__angular2_47_src_47_core_47_annotations_95_impl_47_di__ && $__angular2_47_src_47_core_47_annotations_95_impl_47_di__.__esModule && $__angular2_47_src_47_core_47_annotations_95_impl_47_di__ || {default: $__angular2_47_src_47_core_47_annotations_95_impl_47_di__}).Attribute;
var $__4 = ($__angular2_47_core__ = require("angular2/core"), $__angular2_47_core__ && $__angular2_47_core__.__esModule && $__angular2_47_core__ || {default: $__angular2_47_core__}),
    DynamicComponentLoader = $__4.DynamicComponentLoader,
    ComponentRef = $__4.ComponentRef,
    ElementRef = $__4.ElementRef;
var $__5 = ($__angular2_47_di__ = require("angular2/di"), $__angular2_47_di__ && $__angular2_47_di__.__esModule && $__angular2_47_di__ || {default: $__angular2_47_di__}),
    Injector = $__5.Injector,
    bind = $__5.bind;
var routerMod = ($__router__ = require("./router"), $__router__ && $__router__.__esModule && $__router__ || {default: $__router__});
var $__6 = ($__instruction__ = require("./instruction"), $__instruction__ && $__instruction__.__esModule && $__instruction__ || {default: $__instruction__}),
    Instruction = $__6.Instruction,
    RouteParams = $__6.RouteParams;
var RouterOutlet = function RouterOutlet(elementRef, loader, router, injector, nameAttr) {
  if (isBlank(nameAttr)) {
    nameAttr = 'default';
  }
  this._loader = loader;
  this._parentRouter = router;
  this._elementRef = elementRef;
  this._injector = injector;
  this._childRouter = null;
  this._componentRef = null;
  this._currentInstruction = null;
  this._parentRouter.registerOutlet(this, nameAttr);
};
($traceurRuntime.createClass)(RouterOutlet, {
  activate: function(instruction) {
    var $__7 = this;
    if ((instruction == this._currentInstruction) || instruction.reuse && isPresent(this._childRouter)) {
      return this._childRouter.commit(instruction);
    }
    this._currentInstruction = instruction;
    this._childRouter = this._parentRouter.childRouter(instruction.component);
    var outletInjector = this._injector.resolveAndCreateChild([bind(RouteParams).toValue(new RouteParams(instruction.params)), bind(routerMod.Router).toValue(this._childRouter)]);
    if (isPresent(this._componentRef)) {
      this._componentRef.dispose();
    }
    return this._loader.loadNextToExistingLocation(instruction.component, this._elementRef, outletInjector).then((function(componentRef) {
      $__7._componentRef = componentRef;
      return $__7._childRouter.commit(instruction);
    }));
  },
  deactivate: function() {
    var $__7 = this;
    return (isPresent(this._childRouter) ? this._childRouter.deactivate() : PromiseWrapper.resolve(true)).then((function(_) {
      return $__7._componentRef.dispose();
    }));
  },
  canDeactivate: function(instruction) {
    return PromiseWrapper.resolve(true);
  }
}, {});
Object.defineProperty(RouterOutlet, "annotations", {get: function() {
    return [new Directive({selector: 'router-outlet'})];
  }});
Object.defineProperty(RouterOutlet, "parameters", {get: function() {
    return [[ElementRef], [DynamicComponentLoader], [routerMod.Router], [Injector], [String, new Attribute('name')]];
  }});
Object.defineProperty(RouterOutlet.prototype.activate, "parameters", {get: function() {
    return [[Instruction]];
  }});
Object.defineProperty(RouterOutlet.prototype.canDeactivate, "parameters", {get: function() {
    return [[Instruction]];
  }});
//# sourceMappingURL=router_outlet.js.map

//# sourceMappingURL=./router_outlet.map