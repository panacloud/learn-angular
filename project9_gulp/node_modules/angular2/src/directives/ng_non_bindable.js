var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var annotations_1 = require('angular2/annotations');
/**
 * The `NgNonBindable` directive tells Angular not to compile or bind the contents of the current
 * DOM element. This is useful if the element contains what appears to be Angular directives and
 * bindings but which should be ignored by Angular. This could be the case if you have a site that
 * displays snippets of code, for instance.
 *
 * Example:
 *
 * ```
 * <div>Normal: {{1 + 2}}</div> // output "Normal: 3"
 * <div non-bindable>Ignored: {{1 + 2}}</div> // output "Ignored: {{1 + 2}}"
 * ```
 *
 * @exportedAs angular2/directives
 */
var NgNonBindable = (function () {
    function NgNonBindable() {
    }
    NgNonBindable = __decorate([
        annotations_1.Directive({ selector: '[ng-non-bindable]', compileChildren: false }), 
        __metadata('design:paramtypes', [])
    ], NgNonBindable);
    return NgNonBindable;
})();
exports.NgNonBindable = NgNonBindable;
exports.__esModule = true;
//# sourceMappingURL=ng_non_bindable.js.map