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
import { CONST } from 'angular2/src/facade/lang';
import { DependencyAnnotation } from 'angular2/src/di/annotations_impl';
/**
 * Specifies that a constant attribute value should be injected.
 *
 * The directive can inject constant string literals of host element attributes.
 *
 * ## Example
 *
 * Suppose we have an `<input>` element and want to know its `type`.
 *
 * ```html
 * <input type="text">
 * ```
 *
 * A decorator can inject string literal `text` like so:
 *
 * ```javascript
 * @Directive({
 *   selector: `input'
 * })
 * class InputDirective {
 *   constructor(@Attribute('type') type) {
 *     // type would be `text` in this example
 *   }
 * }
 * ```
 *
 * @exportedAs angular2/annotations
 */
export let Attribute = class extends DependencyAnnotation {
    constructor(attributeName) {
        super();
        this.attributeName = attributeName;
    }
    get token() {
        // Normally one would default a token to a type of an injected value but here
        // the type of a variable is "string" and we can't use primitive type as a return value
        // so we use instance of Attribute instead. This doesn't matter much in practice as arguments
        // with @Attribute annotation are injected by ElementInjector that doesn't take tokens into
        // account.
        return this;
    }
};
Attribute = __decorate([
    CONST(), 
    __metadata('design:paramtypes', [String])
], Attribute);
/**
 * Specifies that a {@link QueryList} should be injected.
 *
 * See {@link QueryList} for usage and example.
 *
 * @exportedAs angular2/annotations
 */
export let Query = class extends DependencyAnnotation {
    constructor(directive) {
        super();
        this.directive = directive;
    }
};
Query = __decorate([
    CONST(), 
    __metadata('design:paramtypes', [Object])
], Query);
//# sourceMappingURL=di.js.map