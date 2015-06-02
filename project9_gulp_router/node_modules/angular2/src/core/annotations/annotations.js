/**
 * This indirection is needed to free up Component, etc symbols in the public API
 * to be used by the decorator versions of these annotations.
 */
var annotations_1 = require('../annotations_impl/annotations');
exports.ComponentAnnotation = annotations_1.Component;
exports.DirectiveAnnotation = annotations_1.Directive;
exports.onDestroy = annotations_1.onDestroy;
exports.onChange = annotations_1.onChange;
exports.onAllChangesDone = annotations_1.onAllChangesDone;
exports.__esModule = true;
//# sourceMappingURL=annotations.js.map