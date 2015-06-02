"use strict";
Object.defineProperties(module.exports, {
  SpyLocation: {get: function() {
      return SpyLocation;
    }},
  __esModule: {value: true}
});
var $__angular2_47_test_95_lib__,
    $__angular2_47_src_47_facade_47_lang__,
    $__angular2_47_src_47_facade_47_async__,
    $__angular2_47_src_47_facade_47_collection__,
    $__angular2_47_src_47_router_47_location__;
var $__0 = ($__angular2_47_test_95_lib__ = require("angular2/test_lib"), $__angular2_47_test_95_lib__ && $__angular2_47_test_95_lib__.__esModule && $__angular2_47_test_95_lib__ || {default: $__angular2_47_test_95_lib__}),
    SpyObject = $__0.SpyObject,
    proxy = $__0.proxy;
var IMPLEMENTS = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}).IMPLEMENTS;
var $__2 = ($__angular2_47_src_47_facade_47_async__ = require("angular2/src/facade/async"), $__angular2_47_src_47_facade_47_async__ && $__angular2_47_src_47_facade_47_async__.__esModule && $__angular2_47_src_47_facade_47_async__ || {default: $__angular2_47_src_47_facade_47_async__}),
    EventEmitter = $__2.EventEmitter,
    ObservableWrapper = $__2.ObservableWrapper;
var $__3 = ($__angular2_47_src_47_facade_47_collection__ = require("angular2/src/facade/collection"), $__angular2_47_src_47_facade_47_collection__ && $__angular2_47_src_47_facade_47_collection__.__esModule && $__angular2_47_src_47_facade_47_collection__ || {default: $__angular2_47_src_47_facade_47_collection__}),
    List = $__3.List,
    ListWrapper = $__3.ListWrapper;
var Location = ($__angular2_47_src_47_router_47_location__ = require("angular2/src/router/location"), $__angular2_47_src_47_router_47_location__ && $__angular2_47_src_47_router_47_location__.__esModule && $__angular2_47_src_47_router_47_location__ || {default: $__angular2_47_src_47_router_47_location__}).Location;
var SpyLocation = function SpyLocation() {
  $traceurRuntime.superConstructor($SpyLocation).call(this);
  this._path = '/';
  this.urlChanges = ListWrapper.create();
  this._subject = new EventEmitter();
  this._baseHref = '';
};
var $SpyLocation = SpyLocation;
($traceurRuntime.createClass)(SpyLocation, {
  setInitialPath: function(url) {
    this._path = url;
  },
  setBaseHref: function(url) {
    this._baseHref = url;
  },
  path: function() {
    return this._path;
  },
  simulateUrlPop: function(pathname) {
    ObservableWrapper.callNext(this._subject, {'url': pathname});
  },
  normalizeAbsolutely: function(url) {
    return this._baseHref + url;
  },
  go: function(url) {
    url = this.normalizeAbsolutely(url);
    if (this._path == url) {
      return ;
    }
    this._path = url;
    ListWrapper.push(this.urlChanges, url);
  },
  forward: function() {},
  back: function() {},
  subscribe: function(onNext) {
    var onThrow = arguments[1] !== (void 0) ? arguments[1] : null;
    var onReturn = arguments[2] !== (void 0) ? arguments[2] : null;
    ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
  },
  noSuchMethod: function(m) {
    return $traceurRuntime.superGet(this, $SpyLocation.prototype, "noSuchMethod").call(this, m);
  }
}, {}, SpyObject);
Object.defineProperty(SpyLocation, "annotations", {get: function() {
    return [new proxy, new IMPLEMENTS(Location)];
  }});
Object.defineProperty(SpyLocation.prototype.setInitialPath, "parameters", {get: function() {
    return [[$traceurRuntime.type.string]];
  }});
Object.defineProperty(SpyLocation.prototype.setBaseHref, "parameters", {get: function() {
    return [[$traceurRuntime.type.string]];
  }});
Object.defineProperty(SpyLocation.prototype.simulateUrlPop, "parameters", {get: function() {
    return [[$traceurRuntime.type.string]];
  }});
Object.defineProperty(SpyLocation.prototype.go, "parameters", {get: function() {
    return [[$traceurRuntime.type.string]];
  }});
//# sourceMappingURL=location_mock.js.map

//# sourceMappingURL=./location_mock.map