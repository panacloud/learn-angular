"use strict";
Object.defineProperties(module.exports, {
  Pipeline: {get: function() {
      return Pipeline;
    }},
  __esModule: {value: true}
});
var $__angular2_47_src_47_facade_47_async__,
    $__angular2_47_src_47_facade_47_collection__,
    $__instruction__;
var $__0 = ($__angular2_47_src_47_facade_47_async__ = require("angular2/src/facade/async"), $__angular2_47_src_47_facade_47_async__ && $__angular2_47_src_47_facade_47_async__.__esModule && $__angular2_47_src_47_facade_47_async__ || {default: $__angular2_47_src_47_facade_47_async__}),
    Promise = $__0.Promise,
    PromiseWrapper = $__0.PromiseWrapper;
var $__1 = ($__angular2_47_src_47_facade_47_collection__ = require("angular2/src/facade/collection"), $__angular2_47_src_47_facade_47_collection__ && $__angular2_47_src_47_facade_47_collection__.__esModule && $__angular2_47_src_47_facade_47_collection__ || {default: $__angular2_47_src_47_facade_47_collection__}),
    List = $__1.List,
    ListWrapper = $__1.ListWrapper;
var Instruction = ($__instruction__ = require("./instruction"), $__instruction__ && $__instruction__.__esModule && $__instruction__ || {default: $__instruction__}).Instruction;
var Pipeline = function Pipeline() {
  this.steps = [(function(instruction) {
    return instruction.router.activateOutlets(instruction);
  })];
};
($traceurRuntime.createClass)(Pipeline, {process: function(instruction) {
    var steps = this.steps,
        currentStep = 0;
    function processOne() {
      var result = arguments[0] !== (void 0) ? arguments[0] : true;
      if (currentStep >= steps.length) {
        return PromiseWrapper.resolve(result);
      }
      var step = steps[currentStep];
      currentStep += 1;
      return PromiseWrapper.resolve(step(instruction)).then(processOne);
    }
    Object.defineProperty(processOne, "parameters", {get: function() {
        return [[$traceurRuntime.type.any]];
      }});
    return processOne();
  }}, {});
Object.defineProperty(Pipeline.prototype.process, "parameters", {get: function() {
    return [[Instruction]];
  }});
//# sourceMappingURL=pipeline.js.map

//# sourceMappingURL=./pipeline.map