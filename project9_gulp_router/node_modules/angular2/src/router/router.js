"use strict";
Object.defineProperties(module.exports, {
  Router: {get: function() {
      return Router;
    }},
  RootRouter: {get: function() {
      return RootRouter;
    }},
  __esModule: {value: true}
});
var $__angular2_47_src_47_facade_47_async__,
    $__angular2_47_src_47_facade_47_collection__,
    $__angular2_47_src_47_facade_47_lang__,
    $__route_95_registry__,
    $__pipeline__,
    $__instruction__,
    $__router_95_outlet__,
    $__location__;
var $__0 = ($__angular2_47_src_47_facade_47_async__ = require("angular2/src/facade/async"), $__angular2_47_src_47_facade_47_async__ && $__angular2_47_src_47_facade_47_async__.__esModule && $__angular2_47_src_47_facade_47_async__ || {default: $__angular2_47_src_47_facade_47_async__}),
    Promise = $__0.Promise,
    PromiseWrapper = $__0.PromiseWrapper,
    EventEmitter = $__0.EventEmitter,
    ObservableWrapper = $__0.ObservableWrapper;
var $__1 = ($__angular2_47_src_47_facade_47_collection__ = require("angular2/src/facade/collection"), $__angular2_47_src_47_facade_47_collection__ && $__angular2_47_src_47_facade_47_collection__.__esModule && $__angular2_47_src_47_facade_47_collection__ || {default: $__angular2_47_src_47_facade_47_collection__}),
    Map = $__1.Map,
    MapWrapper = $__1.MapWrapper,
    List = $__1.List,
    ListWrapper = $__1.ListWrapper;
var $__2 = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}),
    isBlank = $__2.isBlank,
    isPresent = $__2.isPresent,
    Type = $__2.Type;
var RouteRegistry = ($__route_95_registry__ = require("./route_registry"), $__route_95_registry__ && $__route_95_registry__.__esModule && $__route_95_registry__ || {default: $__route_95_registry__}).RouteRegistry;
var Pipeline = ($__pipeline__ = require("./pipeline"), $__pipeline__ && $__pipeline__.__esModule && $__pipeline__ || {default: $__pipeline__}).Pipeline;
var Instruction = ($__instruction__ = require("./instruction"), $__instruction__ && $__instruction__.__esModule && $__instruction__ || {default: $__instruction__}).Instruction;
var RouterOutlet = ($__router_95_outlet__ = require("./router_outlet"), $__router_95_outlet__ && $__router_95_outlet__.__esModule && $__router_95_outlet__ || {default: $__router_95_outlet__}).RouterOutlet;
var Location = ($__location__ = require("./location"), $__location__ && $__location__.__esModule && $__location__ || {default: $__location__}).Location;
var Router = function Router(registry, pipeline, parent, hostComponent) {
  this.hostComponent = hostComponent;
  this.navigating = false;
  this.parent = parent;
  this.previousUrl = null;
  this._outlets = MapWrapper.create();
  this._registry = registry;
  this._pipeline = pipeline;
  this._subject = new EventEmitter();
  this._currentInstruction = null;
};
var $Router = Router;
($traceurRuntime.createClass)(Router, {
  childRouter: function(hostComponent) {
    return new ChildRouter(this, hostComponent);
  },
  registerOutlet: function(outlet) {
    var name = arguments[1] !== (void 0) ? arguments[1] : 'default';
    MapWrapper.set(this._outlets, name, outlet);
    if (isPresent(this._currentInstruction)) {
      var childInstruction = this._currentInstruction.getChild(name);
      return outlet.activate(childInstruction);
    }
    return PromiseWrapper.resolve(true);
  },
  config: function(config) {
    var $__8 = this;
    if (config instanceof List) {
      config.forEach((function(configObject) {
        $__8._registry.config($__8.hostComponent, configObject);
      }));
    } else {
      this._registry.config(this.hostComponent, config);
    }
    return this.renavigate();
  },
  navigate: function(url) {
    var $__8 = this;
    if (this.navigating) {
      return PromiseWrapper.resolve(true);
    }
    this.lastNavigationAttempt = url;
    var matchedInstruction = this.recognize(url);
    if (isBlank(matchedInstruction)) {
      return PromiseWrapper.resolve(false);
    }
    if (isPresent(this._currentInstruction)) {
      matchedInstruction.reuseComponentsFrom(this._currentInstruction);
    }
    this._startNavigating();
    var result = this.commit(matchedInstruction).then((function(_) {
      ObservableWrapper.callNext($__8._subject, matchedInstruction.accumulatedUrl);
      $__8._finishNavigating();
    }));
    PromiseWrapper.catchError(result, (function(_) {
      return $__8._finishNavigating();
    }));
    return result;
  },
  _startNavigating: function() {
    this.navigating = true;
  },
  _finishNavigating: function() {
    this.navigating = false;
  },
  subscribe: function(onNext) {
    ObservableWrapper.subscribe(this._subject, onNext);
  },
  commit: function(instruction) {
    var $__8 = this;
    this._currentInstruction = instruction;
    var toDeactivate = ListWrapper.create();
    MapWrapper.forEach(this._outlets, (function(outlet, outletName) {
      if (!instruction.hasChild(outletName)) {
        MapWrapper.delete($__8._outlets, outletName);
        ListWrapper.push(toDeactivate, outlet);
      }
    }));
    return PromiseWrapper.all(ListWrapper.map(toDeactivate, (function(outlet) {
      return outlet.deactivate();
    }))).then((function(_) {
      return $__8.activate(instruction);
    }));
  },
  deactivate: function() {
    return this._eachOutletAsync((function(outlet) {
      return outlet.deactivate;
    }));
  },
  activate: function(instruction) {
    return this._eachOutletAsync((function(outlet, name) {
      return outlet.activate(instruction.getChild(name));
    }));
  },
  _eachOutletAsync: function(fn) {
    return mapObjAsync(this._outlets, fn);
  },
  recognize: function(url) {
    return this._registry.recognize(url, this.hostComponent);
  },
  renavigate: function() {
    var destination = isBlank(this.previousUrl) ? this.lastNavigationAttempt : this.previousUrl;
    if (this.navigating || isBlank(destination)) {
      return PromiseWrapper.resolve(false);
    }
    return this.navigate(destination);
  },
  generate: function(name, params) {
    return this._registry.generate(name, params, this.hostComponent);
  }
}, {});
Object.defineProperty(Router, "parameters", {get: function() {
    return [[RouteRegistry], [Pipeline], [Router], [$traceurRuntime.type.any]];
  }});
Object.defineProperty(Router.prototype.childRouter, "parameters", {get: function() {
    return [[$traceurRuntime.type.any]];
  }});
Object.defineProperty(Router.prototype.registerOutlet, "parameters", {get: function() {
    return [[RouterOutlet], [$traceurRuntime.type.string]];
  }});
Object.defineProperty(Router.prototype.config, "parameters", {get: function() {
    return [[$traceurRuntime.type.any]];
  }});
Object.defineProperty(Router.prototype.navigate, "parameters", {get: function() {
    return [[$traceurRuntime.type.string]];
  }});
Object.defineProperty(Router.prototype.commit, "parameters", {get: function() {
    return [[Instruction]];
  }});
Object.defineProperty(Router.prototype.activate, "parameters", {get: function() {
    return [[Instruction]];
  }});
Object.defineProperty(Router.prototype.recognize, "parameters", {get: function() {
    return [[$traceurRuntime.type.string]];
  }});
Object.defineProperty(Router.prototype.generate, "parameters", {get: function() {
    return [[$traceurRuntime.type.string], [$traceurRuntime.genericType(StringMap, $traceurRuntime.type.string, $traceurRuntime.type.string)]];
  }});
var RootRouter = function RootRouter(registry, pipeline, location, hostComponent) {
  var $__8;
  $traceurRuntime.superConstructor($RootRouter).call(this, registry, pipeline, null, hostComponent);
  this._location = location;
  this._location.subscribe(($__8 = this, function(change) {
    return $__8.navigate(change['url']);
  }));
  this._registry.configFromComponent(hostComponent);
  this.navigate(location.path());
};
var $RootRouter = RootRouter;
($traceurRuntime.createClass)(RootRouter, {commit: function(instruction) {
    var $__8 = this;
    return $traceurRuntime.superGet(this, $RootRouter.prototype, "commit").call(this, instruction).then((function(_) {
      $__8._location.go(instruction.accumulatedUrl);
    }));
  }}, {}, Router);
Object.defineProperty(RootRouter, "parameters", {get: function() {
    return [[RouteRegistry], [Pipeline], [Location], [Type]];
  }});
var ChildRouter = function ChildRouter(parent, hostComponent) {
  $traceurRuntime.superConstructor($ChildRouter).call(this, parent._registry, parent._pipeline, parent, hostComponent);
  this.parent = parent;
};
var $ChildRouter = ChildRouter;
($traceurRuntime.createClass)(ChildRouter, {}, {}, Router);
Object.defineProperty(ChildRouter, "parameters", {get: function() {
    return [[Router], []];
  }});
function mapObjAsync(obj, fn) {
  return PromiseWrapper.all(mapObj(obj, fn));
}
Object.defineProperty(mapObjAsync, "parameters", {get: function() {
    return [[Map], []];
  }});
function mapObj(obj, fn) {
  var result = ListWrapper.create();
  MapWrapper.forEach(obj, (function(value, key) {
    return ListWrapper.push(result, fn(value, key));
  }));
  return result;
}
Object.defineProperty(mapObj, "parameters", {get: function() {
    return [[Map], []];
  }});
//# sourceMappingURL=router.js.map

//# sourceMappingURL=./router.map