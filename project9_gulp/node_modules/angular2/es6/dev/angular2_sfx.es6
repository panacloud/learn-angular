import * as angular from './angular2';
import * as router from './router';
angular.router = router;
var _prevAngular = window.angular;
angular.noConflict = function() {
  window.angular = _prevAngular;
  return angular;
};
window.angular = angular;
//# sourceMappingURL=angular2_sfx.es6.map

//# sourceMappingURL=./angular2_sfx.map