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
import { CONST } from "angular2/src/facade/lang";
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
export let Inject = class {
    constructor(token) {
        this.token = token;
    }
};
Inject = __decorate([
    CONST(), 
    __metadata('design:paramtypes', [Object])
], Inject);
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
export let InjectPromise = class {
    constructor(token) {
        this.token = token;
    }
};
InjectPromise = __decorate([
    CONST(), 
    __metadata('design:paramtypes', [Object])
], InjectPromise);
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
export let InjectLazy = class {
    constructor(token) {
        this.token = token;
    }
};
InjectLazy = __decorate([
    CONST(), 
    __metadata('design:paramtypes', [Object])
], InjectLazy);
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
export let Optional = class {
};
Optional = __decorate([
    CONST(), 
    __metadata('design:paramtypes', [])
], Optional);
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
export let DependencyAnnotation = class {
    get token() { return null; }
};
DependencyAnnotation = __decorate([
    CONST(), 
    __metadata('design:paramtypes', [])
], DependencyAnnotation);
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
export let Injectable = class {
};
Injectable = __decorate([
    CONST(), 
    __metadata('design:paramtypes', [])
], Injectable);
//# sourceMappingURL=annotations_impl.js.map