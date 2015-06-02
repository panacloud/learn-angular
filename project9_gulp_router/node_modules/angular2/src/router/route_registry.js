"use strict";
Object.defineProperties(module.exports, {
  RouteRegistry: {get: function() {
      return RouteRegistry;
    }},
  __esModule: {value: true}
});
var $__route_95_recognizer__,
    $__instruction__,
    $__angular2_47_src_47_facade_47_collection__,
    $__angular2_47_src_47_facade_47_lang__,
    $__route_95_config_95_impl__,
    $__angular2_47_src_47_reflection_47_reflection__;
var $__0 = ($__route_95_recognizer__ = require("./route_recognizer"), $__route_95_recognizer__ && $__route_95_recognizer__.__esModule && $__route_95_recognizer__ || {default: $__route_95_recognizer__}),
    RouteRecognizer = $__0.RouteRecognizer,
    RouteMatch = $__0.RouteMatch;
var $__1 = ($__instruction__ = require("./instruction"), $__instruction__ && $__instruction__.__esModule && $__instruction__ || {default: $__instruction__}),
    Instruction = $__1.Instruction,
    noopInstruction = $__1.noopInstruction;
var $__2 = ($__angular2_47_src_47_facade_47_collection__ = require("angular2/src/facade/collection"), $__angular2_47_src_47_facade_47_collection__ && $__angular2_47_src_47_facade_47_collection__.__esModule && $__angular2_47_src_47_facade_47_collection__ || {default: $__angular2_47_src_47_facade_47_collection__}),
    List = $__2.List,
    ListWrapper = $__2.ListWrapper,
    Map = $__2.Map,
    MapWrapper = $__2.MapWrapper,
    StringMap = $__2.StringMap,
    StringMapWrapper = $__2.StringMapWrapper;
var $__3 = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}),
    isPresent = $__3.isPresent,
    isBlank = $__3.isBlank,
    isType = $__3.isType,
    StringWrapper = $__3.StringWrapper,
    BaseException = $__3.BaseException;
var RouteConfig = ($__route_95_config_95_impl__ = require("./route_config_impl"), $__route_95_config_95_impl__ && $__route_95_config_95_impl__.__esModule && $__route_95_config_95_impl__ || {default: $__route_95_config_95_impl__}).RouteConfig;
var reflector = ($__angular2_47_src_47_reflection_47_reflection__ = require("angular2/src/reflection/reflection"), $__angular2_47_src_47_reflection_47_reflection__ && $__angular2_47_src_47_reflection_47_reflection__.__esModule && $__angular2_47_src_47_reflection_47_reflection__ || {default: $__angular2_47_src_47_reflection_47_reflection__}).reflector;
var RouteRegistry = function RouteRegistry() {
  this._rules = MapWrapper.create();
};
($traceurRuntime.createClass)(RouteRegistry, {
  config: function(parentComponent, config) {
    var $__6 = this;
    if (!StringMapWrapper.contains(config, 'path')) {
      throw new BaseException('Route config does not contain "path"');
    }
    if (!StringMapWrapper.contains(config, 'component') && !StringMapWrapper.contains(config, 'components') && !StringMapWrapper.contains(config, 'redirectTo')) {
      throw new BaseException('Route config does not contain "component," "components," or "redirectTo"');
    }
    var recognizer = MapWrapper.get(this._rules, parentComponent);
    if (isBlank(recognizer)) {
      recognizer = new RouteRecognizer();
      MapWrapper.set(this._rules, parentComponent, recognizer);
    }
    config = normalizeConfig(config);
    if (StringMapWrapper.contains(config, 'redirectTo')) {
      recognizer.addRedirect(config['path'], config['redirectTo']);
      return ;
    }
    var components = config['components'];
    StringMapWrapper.forEach(components, (function(component, _) {
      return $__6.configFromComponent(component);
    }));
    recognizer.addConfig(config['path'], config, config['as']);
  },
  configFromComponent: function(component) {
    var $__6 = this;
    if (!isType(component)) {
      return ;
    }
    if (MapWrapper.contains(this._rules, component)) {
      return ;
    }
    var annotations = reflector.annotations(component);
    if (isPresent(annotations)) {
      for (var i = 0; i < annotations.length; i++) {
        var annotation = annotations[i];
        if (annotation instanceof RouteConfig) {
          ListWrapper.forEach(annotation.configs, (function(config) {
            return $__6.config(component, config);
          }));
        }
      }
    }
  },
  recognize: function(url, parentComponent) {
    var componentRecognizer = MapWrapper.get(this._rules, parentComponent);
    if (isBlank(componentRecognizer)) {
      return null;
    }
    var possibleMatches = componentRecognizer.recognize(url);
    var fullSolutions = ListWrapper.create();
    for (var i = 0; i < possibleMatches.length; i++) {
      var candidate = possibleMatches[i];
      if (candidate.unmatchedUrl.length == 0) {
        ListWrapper.push(fullSolutions, routeMatchToInstruction(candidate, parentComponent));
      } else {
        var children = StringMapWrapper.create(),
            allChildrenMatch = true,
            components = StringMapWrapper.get(candidate.handler, 'components');
        var componentNames = StringMapWrapper.keys(components);
        for (var nameIndex = 0; nameIndex < componentNames.length; nameIndex++) {
          var name = componentNames[nameIndex];
          var component = StringMapWrapper.get(components, name);
          var childInstruction = this.recognize(candidate.unmatchedUrl, component);
          if (isPresent(childInstruction)) {
            childInstruction.params = candidate.params;
            children[name] = childInstruction;
          } else {
            allChildrenMatch = false;
            break;
          }
        }
        if (allChildrenMatch) {
          ListWrapper.push(fullSolutions, new Instruction({
            component: parentComponent,
            children: children,
            matchedUrl: candidate.matchedUrl,
            parentSpecificity: candidate.specificity
          }));
        }
      }
    }
    if (fullSolutions.length > 0) {
      var mostSpecificSolution = fullSolutions[0];
      for (var solutionIndex = 1; solutionIndex < fullSolutions.length; solutionIndex++) {
        var solution = fullSolutions[solutionIndex];
        if (solution.specificity > mostSpecificSolution.specificity) {
          mostSpecificSolution = solution;
        }
      }
      return mostSpecificSolution;
    }
    return null;
  },
  generate: function(name, params, hostComponent) {
    var componentRecognizer = MapWrapper.get(this._rules, hostComponent);
    return isPresent(componentRecognizer) ? componentRecognizer.generate(name, params) : null;
  }
}, {});
Object.defineProperty(RouteRegistry.prototype.config, "parameters", {get: function() {
    return [[], [$traceurRuntime.genericType(StringMap, $traceurRuntime.type.string, $traceurRuntime.type.any)]];
  }});
Object.defineProperty(RouteRegistry.prototype.recognize, "parameters", {get: function() {
    return [[$traceurRuntime.type.string], []];
  }});
Object.defineProperty(RouteRegistry.prototype.generate, "parameters", {get: function() {
    return [[$traceurRuntime.type.string], [$traceurRuntime.genericType(StringMap, $traceurRuntime.type.string, $traceurRuntime.type.string)], []];
  }});
function routeMatchToInstruction(routeMatch, parentComponent) {
  var children = StringMapWrapper.create();
  var components = StringMapWrapper.get(routeMatch.handler, 'components');
  StringMapWrapper.forEach(components, (function(component, outletName) {
    children[outletName] = new Instruction({
      component: component,
      params: routeMatch.params,
      parentSpecificity: 0
    });
  }));
  return new Instruction({
    component: parentComponent,
    children: children,
    matchedUrl: routeMatch.matchedUrl,
    parentSpecificity: routeMatch.specificity
  });
}
Object.defineProperty(routeMatchToInstruction, "parameters", {get: function() {
    return [[RouteMatch], []];
  }});
function normalizeConfig(config) {
  if (!StringMapWrapper.contains(config, 'component')) {
    return config;
  }
  var newConfig = {'components': {'default': config['component']}};
  StringMapWrapper.forEach(config, (function(value, key) {
    if (key != 'component' && key != 'components') {
      newConfig[key] = value;
    }
  }));
  return newConfig;
}
Object.defineProperty(normalizeConfig, "parameters", {get: function() {
    return [[$traceurRuntime.genericType(StringMap, $traceurRuntime.type.string, $traceurRuntime.type.any)]];
  }});
//# sourceMappingURL=route_registry.js.map

//# sourceMappingURL=./route_registry.map