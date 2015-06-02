import { isBlank, isPresent } from 'angular2/src/facade/lang';
import { ListWrapper, StringMapWrapper } from 'angular2/src/facade/collection';
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
export class Validators {
    static required(c) {
        return isBlank(c.value) || c.value == "" ? { "required": true } : null;
    }
    static nullValidator(c) { return null; }
    static compose(validators) {
        return function (c) {
            var res = ListWrapper.reduce(validators, (res, validator) => {
                var errors = validator(c);
                return isPresent(errors) ? StringMapWrapper.merge(res, errors) : res;
            }, {});
            return StringMapWrapper.isEmpty(res) ? null : res;
        };
    }
    static group(c) {
        var res = {};
        StringMapWrapper.forEach(c.controls, (control, name) => {
            if (c.contains(name) && isPresent(control.errors)) {
                Validators._mergeErrors(control, res);
            }
        });
        return StringMapWrapper.isEmpty(res) ? null : res;
    }
    static array(c) {
        var res = {};
        ListWrapper.forEach(c.controls, (control) => {
            if (isPresent(control.errors)) {
                Validators._mergeErrors(control, res);
            }
        });
        return StringMapWrapper.isEmpty(res) ? null : res;
    }
    static _mergeErrors(control, res) {
        StringMapWrapper.forEach(control.errors, (value, error) => {
            if (!StringMapWrapper.contains(res, error)) {
                res[error] = [];
            }
            ListWrapper.push(res[error], control);
        });
    }
}
//# sourceMappingURL=validators.js.map