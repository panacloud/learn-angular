var ng = require('./angular2');
// the router should have its own SFX bundle
// But currently the module arithemtic 'angular2/router_sfx - angular2/angular2',
// is not support by system builder.
var router = require('./router');
var angular = ng;
window.angular = angular;
var _prevAngular = window.angular;
angular.router = router;
/**
 * Calling noConflict will restore window.angular to its pre-angular loading state
 * and return the angular module object.
 */
angular.noConflict = function () {
    window.angular = _prevAngular;
    return angular;
};
exports.__esModule = true;
//# sourceMappingURL=angular2_sfx.js.map