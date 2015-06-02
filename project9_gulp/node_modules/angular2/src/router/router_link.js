"use strict";
Object.defineProperties(module.exports, {
  RouterLink: {get: function() {
      return RouterLink;
    }},
  __esModule: {value: true}
});
var $__angular2_47_src_47_core_47_annotations_95_impl_47_annotations__,
    $__angular2_47_core__,
    $__angular2_47_src_47_facade_47_collection__,
    $__angular2_47_src_47_facade_47_lang__,
    $__angular2_47_src_47_dom_47_dom_95_adapter__,
    $__router__,
    $__location__;
var $__0 = ($__angular2_47_src_47_core_47_annotations_95_impl_47_annotations__ = require("angular2/src/core/annotations_impl/annotations"), $__angular2_47_src_47_core_47_annotations_95_impl_47_annotations__ && $__angular2_47_src_47_core_47_annotations_95_impl_47_annotations__.__esModule && $__angular2_47_src_47_core_47_annotations_95_impl_47_annotations__ || {default: $__angular2_47_src_47_core_47_annotations_95_impl_47_annotations__}),
    Directive = $__0.Directive,
    onAllChangesDone = $__0.onAllChangesDone;
var ElementRef = ($__angular2_47_core__ = require("angular2/core"), $__angular2_47_core__ && $__angular2_47_core__.__esModule && $__angular2_47_core__ || {default: $__angular2_47_core__}).ElementRef;
var $__2 = ($__angular2_47_src_47_facade_47_collection__ = require("angular2/src/facade/collection"), $__angular2_47_src_47_facade_47_collection__ && $__angular2_47_src_47_facade_47_collection__.__esModule && $__angular2_47_src_47_facade_47_collection__ || {default: $__angular2_47_src_47_facade_47_collection__}),
    StringMap = $__2.StringMap,
    StringMapWrapper = $__2.StringMapWrapper;
var isPresent = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}).isPresent;
var DOM = ($__angular2_47_src_47_dom_47_dom_95_adapter__ = require("angular2/src/dom/dom_adapter"), $__angular2_47_src_47_dom_47_dom_95_adapter__ && $__angular2_47_src_47_dom_47_dom_95_adapter__.__esModule && $__angular2_47_src_47_dom_47_dom_95_adapter__ || {default: $__angular2_47_src_47_dom_47_dom_95_adapter__}).DOM;
var Router = ($__router__ = require("./router"), $__router__ && $__router__.__esModule && $__router__ || {default: $__router__}).Router;
var Location = ($__location__ = require("./location"), $__location__ && $__location__.__esModule && $__location__ || {default: $__location__}).Location;
var RouterLink = function RouterLink(elementRef, router, location) {
  var $__7 = this;
  this._domEl = elementRef.domElement;
  this._router = router;
  this._location = location;
  this._params = StringMapWrapper.create();
  DOM.on(this._domEl, 'click', (function(evt) {
    evt.preventDefault();
    $__7._router.navigate($__7._navigationHref);
  }));
};
($traceurRuntime.createClass)(RouterLink, {
  set route(changes) {
    this._route = changes;
  },
  set params(changes) {
    this._params = changes;
  },
  onAllChangesDone: function() {
    if (isPresent(this._route) && isPresent(this._params)) {
      this._navigationHref = this._router.generate(this._route, this._params);
      this._visibleHref = this._location.normalizeAbsolutely(this._navigationHref);
      DOM.setAttribute(this._domEl, 'href', this._visibleHref);
    }
  }
}, {});
Object.defineProperty(RouterLink, "annotations", {get: function() {
    return [new Directive({
      selector: '[router-link]',
      properties: {
        'route': 'routerLink',
        'params': 'routerParams'
      },
      lifecycle: [onAllChangesDone]
    })];
  }});
Object.defineProperty(RouterLink, "parameters", {get: function() {
    return [[ElementRef], [Router], [Location]];
  }});
Object.defineProperty(Object.getOwnPropertyDescriptor(RouterLink.prototype, "route").set, "parameters", {get: function() {
    return [[$traceurRuntime.type.string]];
  }});
Object.defineProperty(Object.getOwnPropertyDescriptor(RouterLink.prototype, "params").set, "parameters", {get: function() {
    return [[StringMap]];
  }});
//# sourceMappingURL=router_link.js.map

//# sourceMappingURL=./router_link.map