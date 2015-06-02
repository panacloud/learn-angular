"use strict";
Object.defineProperties(module.exports, {
  RouteParams: {get: function() {
      return RouteParams;
    }},
  Instruction: {get: function() {
      return Instruction;
    }},
  __esModule: {value: true}
});
var $__angular2_47_src_47_facade_47_collection__,
    $__angular2_47_src_47_facade_47_async__,
    $__angular2_47_src_47_facade_47_lang__;
var $__0 = ($__angular2_47_src_47_facade_47_collection__ = require("angular2/src/facade/collection"), $__angular2_47_src_47_facade_47_collection__ && $__angular2_47_src_47_facade_47_collection__.__esModule && $__angular2_47_src_47_facade_47_collection__ || {default: $__angular2_47_src_47_facade_47_collection__}),
    Map = $__0.Map,
    MapWrapper = $__0.MapWrapper,
    StringMap = $__0.StringMap,
    StringMapWrapper = $__0.StringMapWrapper,
    List = $__0.List,
    ListWrapper = $__0.ListWrapper;
var $__1 = ($__angular2_47_src_47_facade_47_async__ = require("angular2/src/facade/async"), $__angular2_47_src_47_facade_47_async__ && $__angular2_47_src_47_facade_47_async__.__esModule && $__angular2_47_src_47_facade_47_async__ || {default: $__angular2_47_src_47_facade_47_async__}),
    Promise = $__1.Promise,
    PromiseWrapper = $__1.PromiseWrapper;
var $__2 = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}),
    isPresent = $__2.isPresent,
    normalizeBlank = $__2.normalizeBlank;
var RouteParams = function RouteParams(params) {
  this.params = params;
};
($traceurRuntime.createClass)(RouteParams, {get: function(param) {
    return normalizeBlank(StringMapWrapper.get(this.params, param));
  }}, {});
Object.defineProperty(RouteParams, "parameters", {get: function() {
    return [[StringMap]];
  }});
Object.defineProperty(RouteParams.prototype.get, "parameters", {get: function() {
    return [[$traceurRuntime.type.string]];
  }});
var Instruction = function Instruction() {
  var $__5 = arguments[0] !== (void 0) ? arguments[0] : {},
      params = $__5.params,
      component = $__5.component,
      children = $__5.children,
      matchedUrl = $__5.matchedUrl,
      parentSpecificity = $__5.parentSpecificity;
  var $__3 = this;
  this.reuse = false;
  this.capturedUrl = matchedUrl;
  this.accumulatedUrl = matchedUrl;
  this.specificity = parentSpecificity;
  if (isPresent(children)) {
    this._children = children;
    var childUrl;
    StringMapWrapper.forEach(this._children, (function(child, _) {
      childUrl = child.accumulatedUrl;
      $__3.specificity += child.specificity;
    }));
    if (isPresent(childUrl)) {
      this.accumulatedUrl += childUrl;
    }
  } else {
    this._children = StringMapWrapper.create();
  }
  this.component = component;
  this.params = params;
};
var $Instruction = Instruction;
($traceurRuntime.createClass)(Instruction, {
  hasChild: function(outletName) {
    return StringMapWrapper.contains(this._children, outletName);
  },
  getChild: function(outletName) {
    return StringMapWrapper.get(this._children, outletName);
  },
  forEachChild: function(fn) {
    StringMapWrapper.forEach(this._children, fn);
  },
  traverseSync: function(fn) {
    this.forEachChild(fn);
    this.forEachChild((function(childInstruction, _) {
      return childInstruction.traverseSync(fn);
    }));
  },
  reuseComponentsFrom: function(oldInstruction) {
    this.traverseSync((function(childInstruction, outletName) {
      var oldInstructionChild = oldInstruction.getChild(outletName);
      if (shouldReuseComponent(childInstruction, oldInstructionChild)) {
        childInstruction.reuse = true;
      }
    }));
  }
}, {});
Object.defineProperty(Instruction.prototype.hasChild, "parameters", {get: function() {
    return [[$traceurRuntime.type.string]];
  }});
Object.defineProperty(Instruction.prototype.getChild, "parameters", {get: function() {
    return [[$traceurRuntime.type.string]];
  }});
Object.defineProperty(Instruction.prototype.forEachChild, "parameters", {get: function() {
    return [[Function]];
  }});
Object.defineProperty(Instruction.prototype.traverseSync, "parameters", {get: function() {
    return [[Function]];
  }});
Object.defineProperty(Instruction.prototype.reuseComponentsFrom, "parameters", {get: function() {
    return [[Instruction]];
  }});
function shouldReuseComponent(instr1, instr2) {
  return instr1.component == instr2.component && StringMapWrapper.equals(instr1.params, instr2.params);
}
Object.defineProperty(shouldReuseComponent, "parameters", {get: function() {
    return [[Instruction], [Instruction]];
  }});
function mapObjAsync(obj, fn) {
  return PromiseWrapper.all(mapObj(obj, fn));
}
Object.defineProperty(mapObjAsync, "parameters", {get: function() {
    return [[StringMap], []];
  }});
function mapObj(obj, fn) {
  var result = ListWrapper.create();
  StringMapWrapper.forEach(obj, (function(value, key) {
    return ListWrapper.push(result, fn(value, key));
  }));
  return result;
}
Object.defineProperty(mapObj, "parameters", {get: function() {
    return [[StringMap], [Function]];
  }});
//# sourceMappingURL=instruction.js.map

//# sourceMappingURL=./instruction.map