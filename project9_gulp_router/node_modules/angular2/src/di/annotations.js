/**
 * This indirection is needed to free up Component, etc symbols in the public API
 * to be used by the decorator versions of these annotations.
 */
var annotations_impl_1 = require('./annotations_impl');
exports.InjectAnnotation = annotations_impl_1.Inject;
exports.InjectPromiseAnnotation = annotations_impl_1.InjectPromise;
exports.InjectLazyAnnotation = annotations_impl_1.InjectLazy;
exports.OptionalAnnotation = annotations_impl_1.Optional;
exports.InjectableAnnotation = annotations_impl_1.Injectable;
exports.DependencyAnnotation = annotations_impl_1.DependencyAnnotation;
exports.__esModule = true;
//# sourceMappingURL=annotations.js.map