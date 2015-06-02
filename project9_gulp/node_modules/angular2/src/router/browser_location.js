"use strict";
Object.defineProperties(module.exports, {
  BrowserLocation: {get: function() {
      return BrowserLocation;
    }},
  __esModule: {value: true}
});
var $__angular2_47_src_47_dom_47_dom_95_adapter__;
var DOM = ($__angular2_47_src_47_dom_47_dom_95_adapter__ = require("angular2/src/dom/dom_adapter"), $__angular2_47_src_47_dom_47_dom_95_adapter__ && $__angular2_47_src_47_dom_47_dom_95_adapter__.__esModule && $__angular2_47_src_47_dom_47_dom_95_adapter__ || {default: $__angular2_47_src_47_dom_47_dom_95_adapter__}).DOM;
var BrowserLocation = function BrowserLocation() {
  this._location = DOM.getLocation();
  this._history = DOM.getHistory();
  this._baseHref = DOM.getBaseHref();
};
($traceurRuntime.createClass)(BrowserLocation, {
  onPopState: function(fn) {
    DOM.getGlobalEventTarget('window').addEventListener('popstate', fn, false);
  },
  getBaseHref: function() {
    return this._baseHref;
  },
  path: function() {
    return this._location.pathname;
  },
  pushState: function(state, title, url) {
    this._history.pushState(state, title, url);
  },
  forward: function() {
    this._history.forward();
  },
  back: function() {
    this._history.back();
  }
}, {});
Object.defineProperty(BrowserLocation.prototype.onPopState, "parameters", {get: function() {
    return [[Function]];
  }});
Object.defineProperty(BrowserLocation.prototype.pushState, "parameters", {get: function() {
    return [[$traceurRuntime.type.any], [$traceurRuntime.type.string], [$traceurRuntime.type.string]];
  }});
//# sourceMappingURL=browser_location.js.map

//# sourceMappingURL=./browser_location.map