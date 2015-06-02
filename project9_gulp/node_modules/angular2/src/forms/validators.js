var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
/**
 * Provides a set of validators used by form controls.
 *
 * # Example
 *
 * ```
 * var loginControl = new Control("", Validators.required)
 * ```
 *
 * @exportedAs angular2/forms
 */
var Validators = (function () {
    function Validators() {
    }
    Validators.required = function (c) {
        return lang_1.isBlank(c.value) || c.value == "" ? { "required": true } : null;
    };
    Validators.nullValidator = function (c) { return null; };
    Validators.compose = function (validators) {
        return function (c) {
            var res = collection_1.ListWrapper.reduce(validators, function (res, validator) {
                var errors = validator(c);
                return lang_1.isPresent(errors) ? collection_1.StringMapWrapper.merge(res, errors) : res;
            }, {});
            return collection_1.StringMapWrapper.isEmpty(res) ? null : res;
        };
    };
    Validators.group = function (c) {
        var res = {};
        collection_1.StringMapWrapper.forEach(c.controls, function (control, name) {
            if (c.contains(name) && lang_1.isPresent(control.errors)) {
                Validators._mergeErrors(control, res);
            }
        });
        return collection_1.StringMapWrapper.isEmpty(res) ? null : res;
    };
    Validators.array = function (c) {
        var res = {};
        collection_1.ListWrapper.forEach(c.controls, function (control) {
            if (lang_1.isPresent(control.errors)) {
                Validators._mergeErrors(control, res);
            }
        });
        return collection_1.StringMapWrapper.isEmpty(res) ? null : res;
    };
    Validators._mergeErrors = function (control, res) {
        collection_1.StringMapWrapper.forEach(control.errors, function (value, error) {
            if (!collection_1.StringMapWrapper.contains(res, error)) {
                res[error] = [];
            }
            collection_1.ListWrapper.push(res[error], control);
        });
    };
    return Validators;
})();
exports.Validators = Validators;
exports.__esModule = true;
//# sourceMappingURL=validators.js.map