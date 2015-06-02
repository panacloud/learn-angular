import { BaseException } from 'angular2/src/facade/lang';
/**
 * Base class for all errors arising from misconfigured bindings.
 *
 * @exportedAs angular2/di_errors
 */
export declare class AbstractBindingError extends BaseException {
    name: string;
    message: string;
    keys: List<any>;
    constructResolvingMessage: Function;
    constructor(key: any, constructResolvingMessage: Function);
    addKey(key: any): void;
    toString(): string;
}
/**
 * Thrown when trying to retrieve a dependency by `Key` from {@link Injector}, but the
 * {@link Injector} does not have a {@link Binding} for {@link Key}.
 *
 * @exportedAs angular2/di_errors
 */
export declare class NoBindingError extends AbstractBindingError {
    constructor(key: any);
}
/**
 * Thrown when trying to retrieve an async {@link Binding} using the sync API.
 *
 * ## Example
 *
 * ```javascript
 * var injector = Injector.resolveAndCreate([
 *   bind(Number).toAsyncFactory(() => {
 *     return new Promise((resolve) => resolve(1 + 2));
 *   }),
 *   bind(String).toFactory((v) => { return "Value: " + v; }, [String])
 * ]);
 *
 * injector.asyncGet(String).then((v) => expect(v).toBe('Value: 3'));
 * expect(() => {
 *   injector.get(String);
 * }).toThrowError(AsycBindingError);
 * ```
 *
 * The above example throws because `String` depends on `Number` which is async. If any binding in
 * the dependency graph is async then the graph can only be retrieved using the `asyncGet` API.
 *
 * @exportedAs angular2/di_errors
 */
export declare class AsyncBindingError extends AbstractBindingError {
    constructor(key: any);
}
/**
 * Thrown when dependencies form a cycle.
 *
 * ## Example:
 *
 * ```javascript
 * class A {
 *   constructor(b:B) {}
 * }
 * class B {
 *   constructor(a:A) {}
 * }
 * ```
 *
 * Retrieving `A` or `B` throws a `CyclicDependencyError` as the graph above cannot be constructed.
 *
 * @exportedAs angular2/di_errors
 */
export declare class CyclicDependencyError extends AbstractBindingError {
    constructor(key: any);
}
/**
 * Thrown when a constructing type returns with an Error.
 *
 * The `InstantiationError` class contains the original error plus the dependency graph which caused
 * this object to be instantiated.
 *
 * @exportedAs angular2/di_errors
 */
export declare class InstantiationError extends AbstractBindingError {
    cause: any;
    causeKey: any;
    constructor(cause: any, key: any);
}
/**
 * Thrown when an object other then {@link Binding} (or `Type`) is passed to {@link Injector}
 * creation.
 *
 * @exportedAs angular2/di_errors
 */
export declare class InvalidBindingError extends BaseException {
    message: string;
    constructor(binding: any);
    toString(): string;
}
/**
 * Thrown when the class has no annotation information.
 *
 * Lack of annotation information prevents the {@link Injector} from determining which dependencies
 * need to be injected into the constructor.
 *
 * @exportedAs angular2/di_errors
 */
export declare class NoAnnotationError extends BaseException {
    name: string;
    message: string;
    constructor(typeOrFunc: any);
    toString(): string;
}
export declare var __esModule: boolean;
