/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />
var collection_1 = require('angular2/src/facade/collection');
var binding_1 = require('./binding');
var exceptions_1 = require('./exceptions');
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
var key_1 = require('./key');
var forward_ref_1 = require('./forward_ref');
var _constructing = lang_1.CONST_EXPR(new Object());
var _notFound = lang_1.CONST_EXPR(new Object());
var _Waiting = (function () {
    function _Waiting(promise) {
        this.promise = promise;
    }
    return _Waiting;
})();
function _isWaiting(obj) {
    return obj instanceof _Waiting;
}
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
var Injector = (function () {
    /**
     * @param `bindings` A sparse list of {@link ResolvedBinding}s. See `resolve` for the
     * {@link Injector}.
     * @param `parent` Parent Injector or `null` if root Injector.
     * @param `defaultBindings` Setting to true will auto-create bindings. (Only use with root
     * injector.)
     */
    function Injector(_bindings, _parent, _defaultBindings) {
        this._bindings = _bindings;
        this._parent = _parent;
        this._defaultBindings = _defaultBindings;
        this._instances = this._createInstances();
        this._asyncStrategy = new _AsyncInjectorStrategy(this);
        this._syncStrategy = new _SyncInjectorStrategy(this);
    }
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
    Injector.resolve = function (bindings) {
        var resolvedBindings = resolveBindings(bindings);
        var flatten = _flattenBindings(resolvedBindings, collection_1.MapWrapper.create());
        return _createListOfBindings(flatten);
    };
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
    Injector.resolveAndCreate = function (bindings, _a) {
        var _b = (_a === void 0 ? {} : _a).defaultBindings, defaultBindings = _b === void 0 ? false : _b;
        return new Injector(Injector.resolve(bindings), null, defaultBindings);
    };
    /**
     * Creates an injector from previously resolved bindings. This bypasses resolution and flattening.
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * @param `bindings` A sparse list of {@link ResolvedBinding}s. See `resolve` for the
     * {@link Injector}.
     * @param `defaultBindings` Setting to true will auto-create bindings.
     */
    Injector.fromResolvedBindings = function (bindings, _a) {
        var _b = (_a === void 0 ? {} : _a).defaultBindings, defaultBindings = _b === void 0 ? false : _b;
        return new Injector(bindings, null, defaultBindings);
    };
    Object.defineProperty(Injector.prototype, "parent", {
        /**
         * Direct parent of this injector.
         */
        get: function () { return this._parent; },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves an instance from the injector.
     *
     * @param `token`: usually the `Type` of an object. (Same as the token used while setting up a
     *binding).
     * @returns an instance represented by the token. Throws if not found.
     */
    Injector.prototype.get = function (token) { return this._getByKey(key_1.Key.get(token), false, false, false); };
    /**
     * Retrieves an instance from the injector.
     *
     * @param `token`: usually a `Type`. (Same as the token used while setting up a binding).
     * @returns an instance represented by the token. Returns `null` if not found.
     */
    Injector.prototype.getOptional = function (token) { return this._getByKey(key_1.Key.get(token), false, false, true); };
    /**
     * Retrieves an instance from the injector asynchronously. Used with asynchronous bindings.
     *
     * @param `token`: usually a `Type`. (Same as token used while setting up a binding).
     * @returns a `Promise` which resolves to the instance represented by the token.
     */
    Injector.prototype.asyncGet = function (token) { return this._getByKey(key_1.Key.get(token), true, false, false); };
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
    Injector.prototype.resolveAndCreateChild = function (bindings) {
        return new Injector(Injector.resolve(bindings), this, false);
    };
    /**
     * Creates a child injector and loads a new set of {@link ResolvedBinding}s into it.
     *
     * @param `bindings`: A sparse list of {@link ResolvedBinding}s.
     * See `resolve` for the {@link Injector}.
     * @returns a new child {@link Injector}.
     */
    Injector.prototype.createChildFromResolved = function (bindings) {
        return new Injector(bindings, this, false);
    };
    Injector.prototype._createInstances = function () { return collection_1.ListWrapper.createFixedSize(key_1.Key.numberOfKeys + 1); };
    Injector.prototype._getByKey = function (key, returnPromise, returnLazy, optional) {
        var _this = this;
        if (returnLazy) {
            return function () { return _this._getByKey(key, returnPromise, false, optional); };
        }
        var strategy = returnPromise ? this._asyncStrategy : this._syncStrategy;
        var instance = strategy.readFromCache(key);
        if (instance !== _notFound)
            return instance;
        instance = strategy.instantiate(key);
        if (instance !== _notFound)
            return instance;
        if (lang_1.isPresent(this._parent)) {
            return this._parent._getByKey(key, returnPromise, returnLazy, optional);
        }
        if (optional) {
            return null;
        }
        else {
            throw new exceptions_1.NoBindingError(key);
        }
    };
    Injector.prototype._resolveDependencies = function (key, binding, forceAsync) {
        var _this = this;
        try {
            var getDependency = function (d) { return _this._getByKey(d.key, forceAsync || d.asPromise, d.lazy, d.optional); };
            return collection_1.ListWrapper.map(binding.dependencies, getDependency);
        }
        catch (e) {
            this._clear(key);
            if (e instanceof exceptions_1.AbstractBindingError)
                e.addKey(key);
            throw e;
        }
    };
    Injector.prototype._getInstance = function (key) {
        if (this._instances.length <= key.id)
            return null;
        return collection_1.ListWrapper.get(this._instances, key.id);
    };
    Injector.prototype._setInstance = function (key, obj) { collection_1.ListWrapper.set(this._instances, key.id, obj); };
    Injector.prototype._getBinding = function (key) {
        var binding = this._bindings.length <= key.id ? null : collection_1.ListWrapper.get(this._bindings, key.id);
        if (lang_1.isBlank(binding) && this._defaultBindings) {
            var token = key.token;
            return binding_1.bind(key.token).toClass(token).resolve();
        }
        else {
            return binding;
        }
    };
    Injector.prototype._markAsConstructing = function (key) { this._setInstance(key, _constructing); };
    Injector.prototype._clear = function (key) { this._setInstance(key, null); };
    return Injector;
})();
exports.Injector = Injector;
var _SyncInjectorStrategy = (function () {
    function _SyncInjectorStrategy(_injector) {
        this._injector = _injector;
    }
    _SyncInjectorStrategy.prototype.readFromCache = function (key) {
        if (key.token === Injector) {
            return this._injector;
        }
        var instance = this._injector._getInstance(key);
        if (instance === _constructing) {
            throw new exceptions_1.CyclicDependencyError(key);
        }
        else if (lang_1.isPresent(instance) && !_isWaiting(instance)) {
            return instance;
        }
        else {
            return _notFound;
        }
    };
    _SyncInjectorStrategy.prototype.instantiate = function (key) {
        var binding = this._injector._getBinding(key);
        if (lang_1.isBlank(binding))
            return _notFound;
        if (binding.providedAsPromise)
            throw new exceptions_1.AsyncBindingError(key);
        // add a marker so we can detect cyclic dependencies
        this._injector._markAsConstructing(key);
        var deps = this._injector._resolveDependencies(key, binding, false);
        return this._createInstance(key, binding, deps);
    };
    _SyncInjectorStrategy.prototype._createInstance = function (key, binding, deps) {
        try {
            var instance = lang_1.FunctionWrapper.apply(binding.factory, deps);
            this._injector._setInstance(key, instance);
            return instance;
        }
        catch (e) {
            this._injector._clear(key);
            throw new exceptions_1.InstantiationError(e, key);
        }
    };
    return _SyncInjectorStrategy;
})();
var _AsyncInjectorStrategy = (function () {
    function _AsyncInjectorStrategy(_injector) {
        this._injector = _injector;
    }
    _AsyncInjectorStrategy.prototype.readFromCache = function (key) {
        if (key.token === Injector) {
            return async_1.PromiseWrapper.resolve(this._injector);
        }
        var instance = this._injector._getInstance(key);
        if (instance === _constructing) {
            throw new exceptions_1.CyclicDependencyError(key);
        }
        else if (_isWaiting(instance)) {
            return instance.promise;
        }
        else if (lang_1.isPresent(instance)) {
            return async_1.PromiseWrapper.resolve(instance);
        }
        else {
            return _notFound;
        }
    };
    _AsyncInjectorStrategy.prototype.instantiate = function (key) {
        var _this = this;
        var binding = this._injector._getBinding(key);
        if (lang_1.isBlank(binding))
            return _notFound;
        // add a marker so we can detect cyclic dependencies
        this._injector._markAsConstructing(key);
        var deps = this._injector._resolveDependencies(key, binding, true);
        var depsPromise = async_1.PromiseWrapper.all(deps);
        var promise = async_1.PromiseWrapper.then(depsPromise, null, function (e, s) { return _this._errorHandler(key, e, s); })
            .then(function (deps) { return _this._findOrCreate(key, binding, deps); })
            .then(function (instance) { return _this._cacheInstance(key, instance); });
        this._injector._setInstance(key, new _Waiting(promise));
        return promise;
    };
    _AsyncInjectorStrategy.prototype._errorHandler = function (key, e, stack) {
        if (e instanceof exceptions_1.AbstractBindingError)
            e.addKey(key);
        return async_1.PromiseWrapper.reject(e, stack);
    };
    _AsyncInjectorStrategy.prototype._findOrCreate = function (key, binding, deps) {
        try {
            var instance = this._injector._getInstance(key);
            if (!_isWaiting(instance))
                return instance;
            return lang_1.FunctionWrapper.apply(binding.factory, deps);
        }
        catch (e) {
            this._injector._clear(key);
            throw new exceptions_1.InstantiationError(e, key);
        }
    };
    _AsyncInjectorStrategy.prototype._cacheInstance = function (key, instance) {
        this._injector._setInstance(key, instance);
        return instance;
    };
    return _AsyncInjectorStrategy;
})();
function resolveBindings(bindings) {
    var resolvedList = collection_1.ListWrapper.createFixedSize(bindings.length);
    for (var i = 0; i < bindings.length; i++) {
        var unresolved = forward_ref_1.resolveForwardRef(bindings[i]);
        var resolved;
        if (unresolved instanceof binding_1.ResolvedBinding) {
            resolved = unresolved; // ha-ha! I'm easily amused
        }
        else if (unresolved instanceof lang_1.Type) {
            resolved = binding_1.bind(unresolved).toClass(unresolved).resolve();
        }
        else if (unresolved instanceof binding_1.Binding) {
            resolved = unresolved.resolve();
        }
        else if (unresolved instanceof collection_1.List) {
            resolved = resolveBindings(unresolved);
        }
        else if (unresolved instanceof binding_1.BindingBuilder) {
            throw new exceptions_1.InvalidBindingError(unresolved.token);
        }
        else {
            throw new exceptions_1.InvalidBindingError(unresolved);
        }
        resolvedList[i] = resolved;
    }
    return resolvedList;
}
exports.resolveBindings = resolveBindings;
function flattenBindings(bindings) {
    var map = _flattenBindings(bindings, collection_1.MapWrapper.create());
    var res = collection_1.ListWrapper.create();
    collection_1.MapWrapper.forEach(map, function (binding, keyId) { return collection_1.ListWrapper.push(res, binding); });
    return res;
}
function _createListOfBindings(flattenedBindings) {
    var bindings = collection_1.ListWrapper.createFixedSize(key_1.Key.numberOfKeys + 1);
    collection_1.MapWrapper.forEach(flattenedBindings, function (v, keyId) { return bindings[keyId] = v; });
    return bindings;
}
function _flattenBindings(bindings, res) {
    collection_1.ListWrapper.forEach(bindings, function (b) {
        if (b instanceof binding_1.ResolvedBinding) {
            collection_1.MapWrapper.set(res, b.key.id, b);
        }
        else if (b instanceof collection_1.List) {
            _flattenBindings(b, res);
        }
    });
    return res;
}
exports.__esModule = true;
//# sourceMappingURL=injector.js.map