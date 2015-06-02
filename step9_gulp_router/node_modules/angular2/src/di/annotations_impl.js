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
var lang_1 = require("angular2/src/facade/lang");
/**
 * A parameter annotation that specifies a dependency.
 *
 * ```
 * class AComponent {
 *   constructor(@Inject(MyService) aService:MyService) {}
 * }
 * ```
 *
 * @exportedAs angular2/di_annotations
 */
var Inject = (function () {
    function Inject(token) {
        this.token = token;
    }
    Inject = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [Object])
    ], Inject);
    return Inject;
})();
exports.Inject = Inject;
/**
 * A parameter annotation that specifies a `Promise` of a dependency.
 *
 * ```
 * class AComponent {
 *   constructor(@InjectPromise(MyService) aServicePromise:Promise<MyService>) {
 *     aServicePromise.then(aService:MyService => ...);
 *   }
 * }
 * ```
 *
 * @exportedAs angular2/di_annotations
 */
var InjectPromise = (function () {
    function InjectPromise(token) {
        this.token = token;
    }
    InjectPromise = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [Object])
    ], InjectPromise);
    return InjectPromise;
})();
exports.InjectPromise = InjectPromise;
/**
 * A parameter annotation that creates a synchronous lazy dependency.
 *
 * ```
 * class AComponent {
 *   constructor(@InjectLazy(MyService) aServiceFn:Function) {
 *     var aService:MyService = aServiceFn();
 *   }
 * }
 * ```
 *
 * @exportedAs angular2/di_annotations
 */
var InjectLazy = (function () {
    function InjectLazy(token) {
        this.token = token;
    }
    InjectLazy = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [Object])
    ], InjectLazy);
    return InjectLazy;
})();
exports.InjectLazy = InjectLazy;
/**
 * A parameter annotation that marks a dependency as optional. {@link Injector} provides `null` if
 * the dependency is not found.
 *
 * ```
 * class AComponent {
 *   constructor(@Optional() aService:MyService) {
 *     this.aService = aService;
 *   }
 * }
 * ```
 *
 * @exportedAs angular2/di_annotations
 */
var Optional = (function () {
    function Optional() {
    }
    Optional = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [])
    ], Optional);
    return Optional;
})();
exports.Optional = Optional;
/**
 * `DependencyAnnotation` is used by the framework to extend DI.
 *
 * Only annotations implementing `DependencyAnnotation` are added to the list of dependency
 * properties.
 *
 * For example:
 *
 * ```
 * class Parent extends DependencyAnnotation {}
 * class NotDependencyProperty {}
 *
 * class AComponent {
 *   constructor(@Parent @NotDependencyProperty aService:AService) {}
 * }
 * ```
 *
 * will create the following dependency:
 *
 * ```
 * new Dependency(Key.get(AService), [new Parent()])
 * ```
 *
 * The framework can use `new Parent()` to handle the `aService` dependency
 * in a specific way.
 *
 * @exportedAs angular2/di_annotations
 */
var DependencyAnnotation = (function () {
    function DependencyAnnotation() {
    }
    Object.defineProperty(DependencyAnnotation.prototype, "token", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    DependencyAnnotation = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [])
    ], DependencyAnnotation);
    return DependencyAnnotation;
})();
exports.DependencyAnnotation = DependencyAnnotation;
/**
 * A marker annotation that marks a class as available to `Injector` for creation. Used by tooling
 * for generating constructor stubs.
 *
 * ```
 * class NeedsService {
 *   constructor(svc:UsefulService) {}
 * }
 *
 * @Injectable
 * class UsefulService {}
 * ```
 * @exportedAs angular2/di_annotations
 */
var Injectable = (function () {
    function Injectable() {
    }
    Injectable = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [])
    ], Injectable);
    return Injectable;
})();
exports.Injectable = Injectable;
exports.__esModule = true;
//# sourceMappingURL=annotations_impl.js.map