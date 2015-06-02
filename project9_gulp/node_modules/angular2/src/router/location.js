"use strict";
Object.defineProperties(module.exports, {
  Location: {get: function() {
      return Location;
    }},
  __esModule: {value: true}
});
var $__browser_95_location__,
    $__angular2_47_src_47_facade_47_lang__,
    $__angular2_47_src_47_facade_47_async__;
var BrowserLocation = ($__browser_95_location__ = require("./browser_location"), $__browser_95_location__ && $__browser_95_location__.__esModule && $__browser_95_location__ || {default: $__browser_95_location__}).BrowserLocation;
var StringWrapper = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}).StringWrapper;
var $__2 = ($__angular2_47_src_47_facade_47_async__ = require("angular2/src/facade/async"), $__angular2_47_src_47_facade_47_async__ && $__angular2_47_src_47_facade_47_async__.__esModule && $__angular2_47_src_47_facade_47_async__ || {default: $__angular2_47_src_47_facade_47_async__}),
    EventEmitter = $__2.EventEmitter,
    ObservableWrapper = $__2.ObservableWrapper;
var Location = function Location(browserLocation) {
  var $__3 = this;
  this._subject = new EventEmitter();
  this._browserLocation = browserLocation;
  this._baseHref = stripIndexHtml(this._browserLocation.getBaseHref());
  this._browserLocation.onPopState((function(_) {
    return $__3._onPopState(_);
  }));
};
($traceurRuntime.createClass)(Location, {
  _onPopState: function(_) {
    ObservableWrapper.callNext(this._subject, {'url': this.path()});
  },
  path: function() {
    return this.normalize(this._browserLocation.path());
  },
  normalize: function(url) {
    return this._stripBaseHref(stripIndexHtml(url));
  },
  normalizeAbsolutely: function(url) {
    if (url[0] != '/') {
      url = '/' + url;
    }
    return this._addBaseHref(url);
  },
  _stripBaseHref: function(url) {
    if (this._baseHref.length > 0 && StringWrapper.startsWith(url, this._baseHref)) {
      return StringWrapper.substring(url, this._baseHref.length);
    }
    return url;
  },
  _addBaseHref: function(url) {
    if (!StringWrapper.startsWith(url, this._baseHref)) {
      return this._baseHref + url;
    }
    return url;
  },
  go: function(url) {
    var finalUrl = this.normalizeAbsolutely(url);
    this._browserLocation.pushState(null, '', finalUrl);
  },
  forward: function() {
    this._browserLocation.forward();
  },
  back: function() {
    this._browserLocation.back();
  },
  subscribe: function(onNext) {
    var onThrow = arguments[1] !== (void 0) ? arguments[1] : null;
    var onReturn = arguments[2] !== (void 0) ? arguments[2] : null;
    ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
  }
}, {});
Object.defineProperty(Location, "parameters", {get: function() {
    return [[BrowserLocation]];
  }});
Object.defineProperty(Location.prototype.normalize, "parameters", {get: function() {
    return [[$traceurRuntime.type.string]];
  }});
Object.defineProperty(Location.prototype.normalizeAbsolutely, "parameters", {get: function() {
    return [[$traceurRuntime.type.string]];
  }});
Object.defineProperty(Location.prototype._stripBaseHref, "parameters", {get: function() {
    return [[$traceurRuntime.type.string]];
  }});
Object.defineProperty(Location.prototype._addBaseHref, "parameters", {get: function() {
    return [[$traceurRuntime.type.string]];
  }});
Object.defineProperty(Location.prototype.go, "parameters", {get: function() {
    return [[$traceurRuntime.type.string]];
  }});
function stripIndexHtml(url) {
  if (url.length > 10 && StringWrapper.substring(url, url.length - 11) == '/index.html') {
    return StringWrapper.substring(url, 0, url.length - 11);
  }
  return url;
}
Object.defineProperty(stripIndexHtml, "parameters", {get: function() {
    return [[$traceurRuntime.type.string]];
  }});
//# sourceMappingURL=location.js.map

//# sourceMappingURL=./location.map