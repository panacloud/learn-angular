/**
 * @module
 * @public
 * @description
 * This module is used for handling user input, by defining and building a {@link ControlGroup} that
 * consists of
 * {@link Control} objects, and mapping them onto the DOM. {@link Control} objects can then be used
 * to read information
 * from the form DOM elements.
 *
 * This module is not included in the `angular2` module; you must import the forms module
 * explicitly.
 *
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./src/forms/model'));
__export(require('./src/forms/directives'));
__export(require('./src/forms/validators'));
__export(require('./src/forms/validator_directives'));
__export(require('./src/forms/form_builder'));
exports.__esModule = true;
//# sourceMappingURL=forms.js.map