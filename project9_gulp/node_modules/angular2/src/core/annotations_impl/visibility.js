var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
var annotations_impl_1 = require('angular2/src/di/annotations_impl');
var Visibility = (function (_super) {
    __extends(Visibility, _super);
    function Visibility(depth, crossComponentBoundaries) {
        _super.call(this);
        this.depth = depth;
        this.crossComponentBoundaries = crossComponentBoundaries;
    }
    Visibility.prototype.shouldIncludeSelf = function () { return this.depth === 0; };
    Visibility = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [Number, Boolean])
    ], Visibility);
    return Visibility;
})(annotations_impl_1.DependencyAnnotation);
exports.Visibility = Visibility;
/**
 * Specifies that an injector should retrieve a dependency from its element.
 *
 * ## Example
 *
 * Here is a simple directive that retrieves a dependency from its element.
 *
 * ```
 * @Directive({
 *   selector: '[dependency]',
 *   properties: {
 *     'id':'dependency'
 *   }
 * })
 * class Dependency {
 *   id:string;
 * }
 *
 *
 * @Directive({
 *   selector: '[my-directive]'
 * })
 * class Dependency {
 *   constructor(@Self() dependency:Dependency) {
 *     expect(dependency.id).toEqual(1);
 *   };
 * }
 * ```
 *
 * We use this with the following HTML template:
 *
 * ```
 *<div dependency="1" my-directive></div>
 * ```
 *
 * @exportedAs angular2/annotations
 */
var Self = (function (_super) {
    __extends(Self, _super);
    function Self() {
        _super.call(this, 0, false);
    }
    Self = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [])
    ], Self);
    return Self;
})(Visibility);
exports.Self = Self;
// make constants after switching to ts2dart
exports.self = new Self();
/**
 * Specifies that an injector should retrieve a dependency from the direct parent.
 *
 * ## Example
 *
 * Here is a simple directive that retrieves a dependency from its parent element.
 *
 * ```
 * @Directive({
 *   selector: '[dependency]',
 *   properties: {
 *     'id':'dependency'
 *   }
 * })
 * class Dependency {
 *   id:string;
 * }
 *
 *
 * @Directive({
 *   selector: '[my-directive]'
 * })
 * class Dependency {
 *   constructor(@Parent() dependency:Dependency) {
 *     expect(dependency.id).toEqual(1);
 *   };
 * }
 * ```
 *
 * We use this with the following HTML template:
 *
 * ```
 * <div dependency="1">
 *   <div dependency="2" my-directive></div>
 * </div>
 * ```
 * The `@Parent()` annotation in our constructor forces the injector to retrieve the dependency from
 * the
 * parent element (even thought the current element could resolve it): Angular injects
 * `dependency=1`.
 *
 * @exportedAs angular2/annotations
 */
var Parent = (function (_super) {
    __extends(Parent, _super);
    function Parent() {
        _super.call(this, 1, false);
    }
    Parent = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [])
    ], Parent);
    return Parent;
})(Visibility);
exports.Parent = Parent;
/**
 * Specifies that an injector should retrieve a dependency from any ancestor element within the same
 * shadow boundary.
 *
 * An ancestor is any element between the parent element and shadow root.
 *
 *
 * ## Example
 *
 * Here is a simple directive that retrieves a dependency from an ancestor element.
 *
 * ```
 * @Directive({
 *   selector: '[dependency]',
 *   properties: {
 *     'id':'dependency'
 *   }
 * })
 * class Dependency {
 *   id:string;
 * }
 *
 *
 * @Directive({
 *   selector: '[my-directive]'
 * })
 * class Dependency {
 *   constructor(@Ancestor() dependency:Dependency) {
 *     expect(dependency.id).toEqual(2);
 *   };
 * }
 * ```
 *
 *  We use this with the following HTML template:
 *
 * ```
 * <div dependency="1">
 *   <div dependency="2">
 *     <div>
 *       <div dependency="3" my-directive></div>
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * The `@Ancestor()` annotation in our constructor forces the injector to retrieve the dependency
 * from the
 * nearest ancestor element:
 * - The current element `dependency="3"` is skipped because it is not an ancestor.
 * - Next parent has no directives `<div>`
 * - Next parent has the `Dependency` directive and so the dependency is satisfied.
 *
 * Angular injects `dependency=2`.
 *
 * @exportedAs angular2/annotations
 */
var Ancestor = (function (_super) {
    __extends(Ancestor, _super);
    function Ancestor() {
        _super.call(this, 999999, false);
    }
    Ancestor = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [])
    ], Ancestor);
    return Ancestor;
})(Visibility);
exports.Ancestor = Ancestor;
/**
 * Specifies that an injector should retrieve a dependency from any ancestor element.
 *
 * An ancestor is any element between the parent element and shadow root.
 *
 *
 * ## Example
 *
 * Here is a simple directive that retrieves a dependency from an ancestor element.
 *
 * ```
 * @Directive({
 *   selector: '[dependency]',
 *   properties: {
 *     'id':'dependency'
 *   }
 * })
 * class Dependency {
 *   id:string;
 * }
 *
 *
 * @Directive({
 *   selector: '[my-directive]'
 * })
 * class Dependency {
 *   constructor(@Unbounded() dependency:Dependency) {
 *     expect(dependency.id).toEqual(2);
 *   };
 * }
 * ```
 *
 * @exportedAs angular2/annotations
 */
var Unbounded = (function (_super) {
    __extends(Unbounded, _super);
    function Unbounded() {
        _super.call(this, 999999, true);
    }
    Unbounded = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [])
    ], Unbounded);
    return Unbounded;
})(Visibility);
exports.Unbounded = Unbounded;
exports.__esModule = true;
//# sourceMappingURL=visibility.js.map