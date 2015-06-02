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
var collection_1 = require('angular2/src/facade/collection');
var reflection_1 = require('angular2/src/reflection/reflection');
var key_1 = require('./key');
var annotations_impl_1 = require('./annotations_impl');
var exceptions_1 = require('./exceptions');
var forward_ref_1 = require('./forward_ref');
/**
 * @private
 */
var Dependency = (function () {
    function Dependency(key, asPromise, lazy, optional, properties) {
        this.key = key;
        this.asPromise = asPromise;
        this.lazy = lazy;
        this.optional = optional;
        this.properties = properties;
    }
    Dependency.fromKey = function (key) { return new Dependency(key, false, false, false, []); };
    return Dependency;
})();
exports.Dependency = Dependency;
var _EMPTY_LIST = []; // TODO: make const when supported
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
var Binding = (function () {
    function Binding(token, _a) {
        var toClass = _a.toClass, toValue = _a.toValue, toAlias = _a.toAlias, toFactory = _a.toFactory, toAsyncFactory = _a.toAsyncFactory, deps = _a.deps;
        this.token = token;
        this.toClass = toClass;
        this.toValue = toValue;
        this.toAlias = toAlias;
        this.toFactory = toFactory;
        this.toAsyncFactory = toAsyncFactory;
        this.dependencies = deps;
    }
    /**
     * Converts the {@link Binding} into {@link ResolvedBinding}.
     *
     * {@link Injector} internally only uses {@link ResolvedBinding}, {@link Binding} contains
     * convenience binding syntax.
     */
    Binding.prototype.resolve = function () {
        var _this = this;
        var factoryFn;
        var resolvedDeps;
        var isAsync = false;
        if (lang_1.isPresent(this.toClass)) {
            var toClass = forward_ref_1.resolveForwardRef(this.toClass);
            factoryFn = reflection_1.reflector.factory(toClass);
            resolvedDeps = _dependenciesFor(toClass);
        }
        else if (lang_1.isPresent(this.toAlias)) {
            factoryFn = function (aliasInstance) { return aliasInstance; };
            resolvedDeps = [Dependency.fromKey(key_1.Key.get(this.toAlias))];
        }
        else if (lang_1.isPresent(this.toFactory)) {
            factoryFn = this.toFactory;
            resolvedDeps = _constructDependencies(this.toFactory, this.dependencies);
        }
        else if (lang_1.isPresent(this.toAsyncFactory)) {
            factoryFn = this.toAsyncFactory;
            resolvedDeps = _constructDependencies(this.toAsyncFactory, this.dependencies);
            isAsync = true;
        }
        else {
            factoryFn = function () { return _this.toValue; };
            resolvedDeps = _EMPTY_LIST;
        }
        return new ResolvedBinding(key_1.Key.get(this.token), factoryFn, resolvedDeps, isAsync);
    };
    Binding = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [Object, Object])
    ], Binding);
    return Binding;
})();
exports.Binding = Binding;
/**
 * An internal resolved representation of a {@link Binding} used by the {@link Injector}.
 *
 * A {@link Binding} is resolved when it has a factory function. Binding to a class, alias, or
 * value, are just convenience methods, as {@link Injector} only operates on calling factory
 * functions.
 *
 * @exportedAs angular2/di
 */
var ResolvedBinding = (function () {
    function ResolvedBinding(
        /**
         * A key, usually a `Type`.
         */
        key, 
        /**
         * Factory function which can return an instance of an object represented by a key.
         */
        factory, 
        /**
         * Arguments (dependencies) to the `factory` function.
         */
        dependencies, 
        /**
         * Specifies whether the `factory` function returns a `Promise`.
         */
        providedAsPromise) {
        this.key = key;
        this.factory = factory;
        this.dependencies = dependencies;
        this.providedAsPromise = providedAsPromise;
    }
    return ResolvedBinding;
})();
exports.ResolvedBinding = ResolvedBinding;
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
function bind(token) {
    return new BindingBuilder(token);
}
exports.bind = bind;
/**
 * Helper class for the {@link bind} function.
 *
 * @exportedAs angular2/di
 */
var BindingBuilder = (function () {
    function BindingBuilder(token) {
        this.token = token;
    }
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
    BindingBuilder.prototype.toClass = function (type) { return new Binding(this.token, { toClass: type }); };
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
    BindingBuilder.prototype.toValue = function (value) { return new Binding(this.token, { toValue: value }); };
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
    BindingBuilder.prototype.toAlias = function (aliasToken) { return new Binding(this.token, { toAlias: aliasToken }); };
    /**
     * Binds a key to a function which computes the value.
     *
     * ## Example
     *
     * ```javascript
     * var injector = Injector.resolveAndCreate([
     *   bind(Number).toFactory(() => { return 1+2; }}),
     *   bind(String).toFactory((v) => { return "Value: " + v; }, [Number] })
     * ]);
     *
     * expect(injector.get(Number)).toEqual(3);
     * expect(injector.get(String)).toEqual('Value: 3');
     * ```
     */
    BindingBuilder.prototype.toFactory = function (factoryFunction, dependencies) {
        return new Binding(this.token, { toFactory: factoryFunction, deps: dependencies });
    };
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
    BindingBuilder.prototype.toAsyncFactory = function (factoryFunction, dependencies) {
        return new Binding(this.token, { toAsyncFactory: factoryFunction, deps: dependencies });
    };
    return BindingBuilder;
})();
exports.BindingBuilder = BindingBuilder;
function _constructDependencies(factoryFunction, dependencies) {
    return lang_1.isBlank(dependencies) ?
        _dependenciesFor(factoryFunction) :
        collection_1.ListWrapper.map(dependencies, function (t) { return _extractToken(factoryFunction, t); });
}
function _dependenciesFor(typeOrFunc) {
    var params = reflection_1.reflector.parameters(typeOrFunc);
    if (lang_1.isBlank(params))
        return [];
    if (collection_1.ListWrapper.any(params, function (p) { return lang_1.isBlank(p); })) {
        throw new exceptions_1.NoAnnotationError(typeOrFunc);
    }
    return collection_1.ListWrapper.map(params, function (p) { return _extractToken(typeOrFunc, p); });
}
function _extractToken(typeOrFunc, annotations) {
    var depProps = [];
    var token = null;
    var optional = false;
    var lazy = false;
    var asPromise = false;
    if (!collection_1.ListWrapper.isList(annotations)) {
        return _createDependency(annotations, asPromise, lazy, optional, depProps);
    }
    for (var i = 0; i < annotations.length; ++i) {
        var paramAnnotation = annotations[i];
        if (paramAnnotation instanceof lang_1.Type) {
            token = paramAnnotation;
        }
        else if (paramAnnotation instanceof annotations_impl_1.Inject) {
            token = paramAnnotation.token;
        }
        else if (paramAnnotation instanceof annotations_impl_1.InjectPromise) {
            token = paramAnnotation.token;
            asPromise = true;
        }
        else if (paramAnnotation instanceof annotations_impl_1.InjectLazy) {
            token = paramAnnotation.token;
            lazy = true;
        }
        else if (paramAnnotation instanceof annotations_impl_1.Optional) {
            optional = true;
        }
        else if (paramAnnotation instanceof annotations_impl_1.DependencyAnnotation) {
            if (lang_1.isPresent(paramAnnotation.token)) {
                token = paramAnnotation.token;
            }
            collection_1.ListWrapper.push(depProps, paramAnnotation);
        }
    }
    token = forward_ref_1.resolveForwardRef(token);
    if (lang_1.isPresent(token)) {
        return _createDependency(token, asPromise, lazy, optional, depProps);
    }
    else {
        throw new exceptions_1.NoAnnotationError(typeOrFunc);
    }
}
function _createDependency(token, asPromise, lazy, optional, depProps) {
    return new Dependency(key_1.Key.get(token), asPromise, lazy, optional, depProps);
}
exports.__esModule = true;
//# sourceMappingURL=binding.js.map