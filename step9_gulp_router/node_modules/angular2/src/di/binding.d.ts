import { Type } from 'angular2/src/facade/lang';
import { Key } from './key';
/**
 * @private
 */
export declare class Dependency {
    key: Key;
    asPromise: boolean;
    lazy: boolean;
    optional: boolean;
    properties: List<any>;
    constructor(key: Key, asPromise: boolean, lazy: boolean, optional: boolean, properties: List<any>);
    static fromKey(key: Key): Dependency;
}
/**
 * Describes how the {@link Injector} should instantiate a given token.
 *
 * See {@link bind}.
 *
 * ## Example
 *
 * ```javascript
 * var injector = Injector.resolveAndCreate([
 *   new Binding(String, { toValue: 'Hello' })
 * ]);
 *
 * expect(injector.get(String)).toEqual('Hello');
 * ```
 *
 * @exportedAs angular2/di
 */
export declare class Binding {
    /**
     * Token used when retrieving this binding. Usually the `Type`.
     */
    token: any;
    /**
     * Binds an interface to an implementation / subclass.
     *
     * ## Example
     *
     * Becuse `toAlias` and `toClass` are often confused, the example contains both use cases for easy
     * comparison.
     *
     * ```javascript
     *
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   new Binding(Vehicle, { toClass: Car })
     * ]);
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   new Binding(Vehicle, { toAlias: Car })
     * ]);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
    toClass: Type;
    /**
     * Binds a key to a value.
     *
     * ## Example
     *
     * ```javascript
     * var injector = Injector.resolveAndCreate([
     *   new Binding(String, { toValue: 'Hello' })
     * ]);
     *
     * expect(injector.get(String)).toEqual('Hello');
     * ```
     */
    toValue: any;
    /**
     * Binds a key to the alias for an existing key.
     *
     * An alias means that {@link Injector} returns the same instance as if the alias token was used.
     * This is in contrast to `toClass` where a separate instance of `toClass` is returned.
     *
     * ## Example
     *
     * Becuse `toAlias` and `toClass` are often confused the example contains both use cases for easy
     * comparison.
     *
     * ```javascript
     *
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   new Binding(Vehicle, { toAlias: Car })
     * ]);
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   new Binding(Vehicle, { toClass: Car })
     * ]);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
    toAlias: any;
    /**
     * Binds a key to a function which computes the value.
     *
     * ## Example
     *
     * ```javascript
     * var injector = Injector.resolveAndCreate([
     *   new Binding(Number, { toFactory: () => { return 1+2; }}),
     *   new Binding(String, { toFactory: (value) => { return "Value: " + value; },
     *                         dependencies: [Number] })
     * ]);
     *
     * expect(injector.get(Number)).toEqual(3);
     * expect(injector.get(String)).toEqual('Value: 3');
     * ```
     */
    toFactory: Function;
    /**
     * Binds a key to a function which computes the value asynchronously.
     *
     * ## Example
     *
     * ```javascript
     * var injector = Injector.resolveAndCreate([
     *   new Binding(Number, { toAsyncFactory: () => {
     *     return new Promise((resolve) => resolve(1 + 2));
     *   }}),
     *   new Binding(String, { toFactory: (value) => { return "Value: " + value; },
     *                         dependencies: [Number]})
     * ]);
     *
     * injector.asyncGet(Number).then((v) => expect(v).toBe(3));
     * injector.asyncGet(String).then((v) => expect(v).toBe('Value: 3'));
     * ```
     *
     * The interesting thing to note is that event though `Number` has an async factory, the `String`
     * factory function takes the resolved value. This shows that the {@link Injector} delays
     *executing the
     *`String` factory
     * until after the `Number` is resolved. This can only be done if the `token` is retrieved using
     * the `asyncGet` API in the {@link Injector}.
     *
     */
    toAsyncFactory: Function;
    /**
     * Used in conjunction with `toFactory` or `toAsyncFactory` and specifies a set of dependencies
     * (as `token`s) which should be injected into the factory function.
     *
     * ## Example
     *
     * ```javascript
     * var injector = Injector.resolveAndCreate([
     *   new Binding(Number, { toFactory: () => { return 1+2; }}),
     *   new Binding(String, { toFactory: (value) => { return "Value: " + value; },
     *                         dependencies: [Number] })
     * ]);
     *
     * expect(injector.get(Number)).toEqual(3);
     * expect(injector.get(String)).toEqual('Value: 3');
     * ```
     */
    dependencies: List<any>;
    constructor(token: any, {toClass, toValue, toAlias, toFactory, toAsyncFactory, deps}: {
        toClass?: Type;
        toValue?: any;
        toAlias?: any;
        toFactory?: Function;
        toAsyncFactory?: Function;
        deps?: List<any>;
    });
    /**
     * Converts the {@link Binding} into {@link ResolvedBinding}.
     *
     * {@link Injector} internally only uses {@link ResolvedBinding}, {@link Binding} contains
     * convenience binding syntax.
     */
    resolve(): ResolvedBinding;
}
/**
 * An internal resolved representation of a {@link Binding} used by the {@link Injector}.
 *
 * A {@link Binding} is resolved when it has a factory function. Binding to a class, alias, or
 * value, are just convenience methods, as {@link Injector} only operates on calling factory
 * functions.
 *
 * @exportedAs angular2/di
 */
export declare class ResolvedBinding {
    /**
     * A key, usually a `Type`.
     */
    key: Key;
    /**
     * Factory function which can return an instance of an object represented by a key.
     */
    factory: Function;
    /**
     * Arguments (dependencies) to the `factory` function.
     */
    dependencies: List<Dependency>;
    /**
     * Specifies whether the `factory` function returns a `Promise`.
     */
    providedAsPromise: boolean;
    constructor(
        /**
         * A key, usually a `Type`.
         */
        key: Key, 
        /**
         * Factory function which can return an instance of an object represented by a key.
         */
        factory: Function, 
        /**
         * Arguments (dependencies) to the `factory` function.
         */
        dependencies: List<Dependency>, 
        /**
         * Specifies whether the `factory` function returns a `Promise`.
         */
        providedAsPromise: boolean);
}
/**
 * Provides an API for imperatively constructing {@link Binding}s.
 *
 * This is only relevant for JavaScript. See {@link BindingBuilder}.
 *
 * ## Example
 *
 * ```javascript
 * bind(MyInterface).toClass(MyClass)
 *
 * ```
 *
 * @exportedAs angular2/di
 */
export declare function bind(token: any): BindingBuilder;
/**
 * Helper class for the {@link bind} function.
 *
 * @exportedAs angular2/di
 */
export declare class BindingBuilder {
    token: any;
    constructor(token: any);
    /**
     * Binds an interface to an implementation / subclass.
     *
     * ## Example
     *
     * Because `toAlias` and `toClass` are often confused, the example contains both use cases for
     * easy comparison.
     *
     * ```javascript
     *
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   bind(Vehicle).toClass(Car)
     * ]);
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   bind(Vehicle).toAlias(Car)
     * ]);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
    toClass(type: Type): Binding;
    /**
     * Binds a key to a value.
     *
     * ## Example
     *
     * ```javascript
     * var injector = Injector.resolveAndCreate([
     *   bind(String).toValue('Hello')
     * ]);
     *
     * expect(injector.get(String)).toEqual('Hello');
     * ```
     */
    toValue(value: any): Binding;
    /**
     * Binds a key to the alias for an existing key.
     *
     * An alias means that we will return the same instance as if the alias token was used. (This is
     * in contrast to `toClass` where a separet instance of `toClass` will be returned.)
     *
     * ## Example
     *
     * Becuse `toAlias` and `toClass` are often confused, the example contains both use cases for easy
     * comparison.
     *
     * ```javascript
     *
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   bind(Vehicle).toAlias(Car)
     * ]);
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   bind(Vehicle).toClass(Car)
     * ]);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
    toAlias(aliasToken: any): Binding;
    /**
     * Binds a key to a function which computes the value.
     *
     * ## Example
     *
     * ```javascript
     * var injector = Injector.resolveAndCreate([
     *   bind(Number).toFactory(() => { return 1+2; }),
     *   bind(String).toFactory((v) => { return "Value: " + v; }, [Number])
     * ]);
     *
     * expect(injector.get(Number)).toEqual(3);
     * expect(injector.get(String)).toEqual('Value: 3');
     * ```
     */
    toFactory(factoryFunction: Function, dependencies?: List<any>): Binding;
    /**
     * Binds a key to a function which computes the value asynchronously.
     *
     * ## Example
     *
     * ```javascript
     * var injector = Injector.resolveAndCreate([
     *   bind(Number).toAsyncFactory(() => {
     *     return new Promise((resolve) => resolve(1 + 2));
     *   }),
     *   bind(String).toFactory((v) => { return "Value: " + v; }, [Number])
     * ]);
     *
     * injector.asyncGet(Number).then((v) => expect(v).toBe(3));
     * injector.asyncGet(String).then((v) => expect(v).toBe('Value: 3'));
     * ```
     *
     * The interesting thing to note is that event though `Number` has an async factory, the `String`
     * factory function takes the resolved value. This shows that the {@link Injector} delays
     * executing of the `String` factory
     * until after the `Number` is resolved. This can only be done if the `token` is retrieved using
     * the `asyncGet` API in the {@link Injector}.
     */
    toAsyncFactory(factoryFunction: Function, dependencies?: List<any>): Binding;
}
export declare var __esModule: boolean;
