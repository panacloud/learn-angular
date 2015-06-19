/// <reference path="../../../../../angular2/typings/es6-promise/es6-promise.d.ts" />
import { ResolvedBinding, Binding } from './binding';
import { Type } from 'angular2/src/facade/lang';
import { Key } from './key';
/**
 * A dependency injection container used for resolving dependencies.
 *
 * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
 * constructor dependencies.
 * In typical use, application code asks for the dependencies in the constructor and they are
 * resolved by the `Injector`.
 *
 * ## Example:
 *
 * Suppose that we want to inject an `Engine` into class `Car`, we would define it like this:
 *
 * ```javascript
 * class Engine {
 * }
 *
 * class Car {
 *   constructor(@Inject(Engine) engine) {
 *   }
 * }
 *
 * ```
 *
 * Next we need to write the code that creates and instantiates the `Injector`. We then ask for the
 * `root` object, `Car`, so that the `Injector` can recursively build all of that object's
 *dependencies.
 *
 * ```javascript
 * main() {
 *   var injector = Injector.resolveAndCreate([Car, Engine]);
 *
 *   // Get a reference to the `root` object, which will recursively instantiate the tree.
 *   var car = injector.get(Car);
 * }
 * ```
 * Notice that we don't use the `new` operator because we explicitly want to have the `Injector`
 * resolve all of the object's dependencies automatically.
 *
 * @exportedAs angular2/di
 */
export declare class Injector {
    private _bindings;
    private _parent;
    private _defaultBindings;
    private _instances;
    private _asyncStrategy;
    private _syncStrategy;
    /**
     * Turns a list of binding definitions into an internal resolved list of resolved bindings.
     *
     * A resolution is a process of flattening multiple nested lists and converting individual
     * bindings into a list of {@link ResolvedBinding}s. The resolution can be cached by `resolve`
     * for the {@link Injector} for performance-sensitive code.
     *
     * @param `bindings` can be a list of `Type`, {@link Binding}, {@link ResolvedBinding}, or a
     * recursive list of more bindings.
     *
     * The returned list is sparse, indexed by `id` for the {@link Key}. It is generally not useful to
     *application code
     * other than for passing it to {@link Injector} functions that require resolved binding lists,
     *such as
     * `fromResolvedBindings` and `createChildFromResolved`.
     */
    static resolve(bindings: List<Type | Binding | List<any>>): List<ResolvedBinding>;
    /**
     * Resolves bindings and creates an injector based on those bindings. This function is slower than
     * the corresponding `fromResolvedBindings` because it needs to resolve bindings first. See
     *`resolve`
     * for the {@link Injector}.
     *
     * Prefer `fromResolvedBindings` in performance-critical code that creates lots of injectors.
     *
     * @param `bindings` can be a list of `Type`, {@link Binding}, {@link ResolvedBinding}, or a
     *recursive list of more
     * bindings.
     * @param `defaultBindings` Setting to true will auto-create bindings.
     */
    static resolveAndCreate(bindings: List<Type | Binding | List<any>>, {defaultBindings}?: any): Injector;
    /**
     * Creates an injector from previously resolved bindings. This bypasses resolution and flattening.
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * @param `bindings` A sparse list of {@link ResolvedBinding}s. See `resolve` for the
     * {@link Injector}.
     * @param `defaultBindings` Setting to true will auto-create bindings.
     */
    static fromResolvedBindings(bindings: List<ResolvedBinding>, {defaultBindings}?: any): Injector;
    /**
     * @param `bindings` A sparse list of {@link ResolvedBinding}s. See `resolve` for the
     * {@link Injector}.
     * @param `parent` Parent Injector or `null` if root Injector.
     * @param `defaultBindings` Setting to true will auto-create bindings. (Only use with root
     * injector.)
     */
    constructor(_bindings: List<ResolvedBinding>, _parent: Injector, _defaultBindings: boolean);
    /**
     * Direct parent of this injector.
     */
    parent: Injector;
    /**
     * Retrieves an instance from the injector.
     *
     * @param `token`: usually the `Type` of an object. (Same as the token used while setting up a
     *binding).
     * @returns an instance represented by the token. Throws if not found.
     */
    get(token: any): any;
    /**
     * Retrieves an instance from the injector.
     *
     * @param `token`: usually a `Type`. (Same as the token used while setting up a binding).
     * @returns an instance represented by the token. Returns `null` if not found.
     */
    getOptional(token: any): any;
    /**
     * Retrieves an instance from the injector asynchronously. Used with asynchronous bindings.
     *
     * @param `token`: usually a `Type`. (Same as token used while setting up a binding).
     * @returns a `Promise` which resolves to the instance represented by the token.
     */
    asyncGet(token: any): Promise<any>;
    /**
     * Creates a child injector and loads a new set of bindings into it.
     *
     * A resolution is a process of flattening multiple nested lists and converting individual
     * bindings into a list of {@link ResolvedBinding}s. The resolution can be cached by `resolve`
     * for the {@link Injector} for performance-sensitive code.
     *
     * @param `bindings` can be a list of `Type`, {@link Binding}, {@link ResolvedBinding}, or a
     * recursive list of more bindings.
     *
     */
    resolveAndCreateChild(bindings: List<Type | Binding | List<any>>): Injector;
    /**
     * Creates a child injector and loads a new set of {@link ResolvedBinding}s into it.
     *
     * @param `bindings`: A sparse list of {@link ResolvedBinding}s.
     * See `resolve` for the {@link Injector}.
     * @returns a new child {@link Injector}.
     */
    createChildFromResolved(bindings: List<ResolvedBinding>): Injector;
    _createInstances(): List<any>;
    _getByKey(key: Key, returnPromise: boolean, returnLazy: boolean, optional: boolean): any;
    _resolveDependencies(key: Key, binding: ResolvedBinding, forceAsync: boolean): List<any>;
    _getInstance(key: Key): any;
    _setInstance(key: Key, obj: any): void;
    _getBinding(key: Key): any;
    _markAsConstructing(key: Key): void;
    _clear(key: Key): void;
}
export declare function resolveBindings(bindings: List<Type | Binding | List<any>>): List<ResolvedBinding>;
export declare var __esModule: boolean;
