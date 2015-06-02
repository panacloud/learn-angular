"use strict";
var $__src_47_router_47_router__,
    $__src_47_router_47_router_95_outlet__,
    $__src_47_router_47_router_95_link__,
    $__src_47_router_47_instruction__,
    $__src_47_router_47_route_95_config_95_annotation__,
    $__src_47_router_47_route_95_config_95_decorator__,
    $__src_47_router_47_browser_95_location__,
    $__src_47_router_47_router__,
    $__src_47_router_47_route_95_registry__,
    $__src_47_router_47_pipeline__,
    $__src_47_router_47_location__,
    $__src_47_core_47_application_95_tokens__,
    $__di__;
var $__src_47_router_47_router__ = ($__src_47_router_47_router__ = require("./src/router/router"), $__src_47_router_47_router__ && $__src_47_router_47_router__.__esModule && $__src_47_router_47_router__ || {default: $__src_47_router_47_router__});
var $__src_47_router_47_router_95_outlet__ = ($__src_47_router_47_router_95_outlet__ = require("./src/router/router_outlet"), $__src_47_router_47_router_95_outlet__ && $__src_47_router_47_router_95_outlet__.__esModule && $__src_47_router_47_router_95_outlet__ || {default: $__src_47_router_47_router_95_outlet__});
var $__src_47_router_47_router_95_link__ = ($__src_47_router_47_router_95_link__ = require("./src/router/router_link"), $__src_47_router_47_router_95_link__ && $__src_47_router_47_router_95_link__.__esModule && $__src_47_router_47_router_95_link__ || {default: $__src_47_router_47_router_95_link__});
var $__src_47_router_47_instruction__ = ($__src_47_router_47_instruction__ = require("./src/router/instruction"), $__src_47_router_47_instruction__ && $__src_47_router_47_instruction__.__esModule && $__src_47_router_47_instruction__ || {default: $__src_47_router_47_instruction__});
var $__src_47_router_47_route_95_config_95_annotation__ = ($__src_47_router_47_route_95_config_95_annotation__ = require("./src/router/route_config_annotation"), $__src_47_router_47_route_95_config_95_annotation__ && $__src_47_router_47_route_95_config_95_annotation__.__esModule && $__src_47_router_47_route_95_config_95_annotation__ || {default: $__src_47_router_47_route_95_config_95_annotation__});
var $__src_47_router_47_route_95_config_95_decorator__ = ($__src_47_router_47_route_95_config_95_decorator__ = require("./src/router/route_config_decorator"), $__src_47_router_47_route_95_config_95_decorator__ && $__src_47_router_47_route_95_config_95_decorator__.__esModule && $__src_47_router_47_route_95_config_95_decorator__ || {default: $__src_47_router_47_route_95_config_95_decorator__});
var BrowserLocation = ($__src_47_router_47_browser_95_location__ = require("./src/router/browser_location"), $__src_47_router_47_browser_95_location__ && $__src_47_router_47_browser_95_location__.__esModule && $__src_47_router_47_browser_95_location__ || {default: $__src_47_router_47_browser_95_location__}).BrowserLocation;
var $__1 = ($__src_47_router_47_router__ = require("./src/router/router"), $__src_47_router_47_router__ && $__src_47_router_47_router__.__esModule && $__src_47_router_47_router__ || {default: $__src_47_router_47_router__}),
    Router = $__1.Router,
    RootRouter = $__1.RootRouter;
var RouteRegistry = ($__src_47_router_47_route_95_registry__ = require("./src/router/route_registry"), $__src_47_router_47_route_95_registry__ && $__src_47_router_47_route_95_registry__.__esModule && $__src_47_router_47_route_95_registry__ || {default: $__src_47_router_47_route_95_registry__}).RouteRegistry;
var Pipeline = ($__src_47_router_47_pipeline__ = require("./src/router/pipeline"), $__src_47_router_47_pipeline__ && $__src_47_router_47_pipeline__.__esModule && $__src_47_router_47_pipeline__ || {default: $__src_47_router_47_pipeline__}).Pipeline;
var Location = ($__src_47_router_47_location__ = require("./src/router/location"), $__src_47_router_47_location__ && $__src_47_router_47_location__.__esModule && $__src_47_router_47_location__ || {default: $__src_47_router_47_location__}).Location;
var appComponentTypeToken = ($__src_47_core_47_application_95_tokens__ = require("./src/core/application_tokens"), $__src_47_core_47_application_95_tokens__ && $__src_47_core_47_application_95_tokens__.__esModule && $__src_47_core_47_application_95_tokens__ || {default: $__src_47_core_47_application_95_tokens__}).appComponentTypeToken;
var bind = ($__di__ = require("./di"), $__di__ && $__di__.__esModule && $__di__ || {default: $__di__}).bind;
var routerInjectables = [RouteRegistry, Pipeline, BrowserLocation, Location, bind(Router).toFactory((function(registry, pipeline, location, appRoot) {
  return new RootRouter(registry, pipeline, location, appRoot);
}), [RouteRegistry, Pipeline, Location, appComponentTypeToken])];
module.exports = $traceurRuntime.exportStar({
  get Router() {
    return $__src_47_router_47_router__.Router;
  },
  get RouterOutlet() {
    return $__src_47_router_47_router_95_outlet__.RouterOutlet;
  },
  get RouterLink() {
    return $__src_47_router_47_router_95_link__.RouterLink;
  },
  get RouteParams() {
    return $__src_47_router_47_instruction__.RouteParams;
  },
  get routerInjectables() {
    return routerInjectables;
  },
  __esModule: true
}, $__src_47_router_47_route_95_config_95_annotation__, $__src_47_router_47_route_95_config_95_decorator__);
//# sourceMappingURL=router.js.map

//# sourceMappingURL=./router.map