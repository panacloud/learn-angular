var lang_1 = require('angular2/src/facade/lang');
exports.NG_BINDING_CLASS_SELECTOR = '.ng-binding';
exports.NG_BINDING_CLASS = 'ng-binding';
exports.EVENT_TARGET_SEPARATOR = ':';
var CAMEL_CASE_REGEXP = lang_1.RegExpWrapper.create('([A-Z])');
var DASH_CASE_REGEXP = lang_1.RegExpWrapper.create('-([a-z])');
function camelCaseToDashCase(input) {
    return lang_1.StringWrapper.replaceAllMapped(input, CAMEL_CASE_REGEXP, function (m) { return '-' + m[1].toLowerCase(); });
}
exports.camelCaseToDashCase = camelCaseToDashCase;
function dashCaseToCamelCase(input) {
    return lang_1.StringWrapper.replaceAllMapped(input, DASH_CASE_REGEXP, function (m) { return m[1].toUpperCase(); });
}
exports.dashCaseToCamelCase = dashCaseToCamelCase;
exports.__esModule = true;
//# sourceMappingURL=util.js.map