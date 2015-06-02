import { DependencyAnnotation } from 'angular2/src/di/annotations_impl';
export declare class Visibility extends DependencyAnnotation {
    depth: number;
    crossComponentBoundaries: boolean;
    constructor(depth: number, crossComponentBoundaries: boolean);
    shouldIncludeSelf(): boolean;
}
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
export declare class Self extends Visibility {
    constructor();
}
export declare var self: Self;
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
export declare class Parent extends Visibility {
    constructor();
}
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
export declare class Ancestor extends Visibility {
    constructor();
}
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
export declare class Unbounded extends Visibility {
    constructor();
}
export declare var __esModule: boolean;
