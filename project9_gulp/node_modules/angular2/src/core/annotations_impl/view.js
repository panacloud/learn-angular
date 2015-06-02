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
var lang_1 = require('angular2/src/facade/lang');
/**
 * Declares the available HTML templates for an application.
 *
 * Each angular component requires a single `@Component` and at least one `@View` annotation. The
 * @View
 * annotation specifies the HTML template to use, and lists the directives that are active within
 * the template.
 *
 * When a component is instantiated, the template is loaded into the component's shadow root, and
 * the
 * expressions and statements in the template are evaluated against the component.
 *
 * For details on the `@Component` annotation, see {@link Component}.
 *
 * ## Example
 *
 * ```
 * @Component({
 *   selector: 'greet'
 * })
 * @View({
 *   template: 'Hello {{name}}!',
 *   directives: [GreetUser, Bold]
 * })
 * class Greet {
 *   name: string;
 *
 *   constructor() {
 *     this.name = 'World';
 *   }
 * }
 * ```
 *
 * @exportedAs angular2/annotations
 */
var View = (function () {
    function View(_a) {
        var _b = _a === void 0 ? {} : _a, templateUrl = _b.templateUrl, template = _b.template, directives = _b.directives, renderer = _b.renderer;
        this.templateUrl = templateUrl;
        this.template = template;
        this.directives = directives;
        this.renderer = renderer;
    }
    View = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [Object])
    ], View);
    return View;
})();
exports.View = View;
exports.__esModule = true;
//# sourceMappingURL=view.js.map