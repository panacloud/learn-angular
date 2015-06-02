var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
function findFirstClosedCycle(keys) {
    var res = [];
    for (var i = 0; i < keys.length; ++i) {
        if (collection_1.ListWrapper.contains(res, keys[i])) {
            collection_1.ListWrapper.push(res, keys[i]);
            return res;
        }
        else {
            collection_1.ListWrapper.push(res, keys[i]);
        }
    }
    return res;
}
function constructResolvingPath(keys) {
    if (keys.length > 1) {
        var reversed = findFirstClosedCycle(collection_1.ListWrapper.reversed(keys));
        var tokenStrs = collection_1.ListWrapper.map(reversed, function (k) { return lang_1.stringify(k.token); });
        return " (" + tokenStrs.join(' -> ') + ")";
    }
    else {
        return "";
    }
}
/**
 * Base class for all errors arising from misconfigured bindings.
 *
 * @exportedAs angular2/di_errors
 */
var AbstractBindingError = (function (_super) {
    __extends(AbstractBindingError, _super);
    // TODO(tbosch): Can't do key:Key as this results in a circular dependency!
    function AbstractBindingError(key, constructResolvingMessage) {
        _super.call(this);
        this.keys = [key];
        this.constructResolvingMessage = constructResolvingMessage;
        this.message = this.constructResolvingMessage(this.keys);
    }
    // TODO(tbosch): Can't do key:Key as this results in a circular dependency!
    AbstractBindingError.prototype.addKey = function (key) {
        collection_1.ListWrapper.push(this.keys, key);
        this.message = this.constructResolvingMessage(this.keys);
    };
    AbstractBindingError.prototype.toString = function () { return this.message; };
    return AbstractBindingError;
})(lang_1.BaseException);
exports.AbstractBindingError = AbstractBindingError;
/**
 * Thrown when trying to retrieve a dependency by `Key` from {@link Injector}, but the
 * {@link Injector} does not have a {@link Binding} for {@link Key}.
 *
 * @exportedAs angular2/di_errors
 */
var NoBindingError = (function (_super) {
    __extends(NoBindingError, _super);
    // TODO(tbosch): Can't do key:Key as this results in a circular dependency!
    function NoBindingError(key) {
        _super.call(this, key, function (keys) {
            var first = lang_1.stringify(collection_1.ListWrapper.first(keys).token);
            return "No provider for " + first + "!" + constructResolvingPath(keys);
        });
    }
    return NoBindingError;
})(AbstractBindingError);
exports.NoBindingError = NoBindingError;
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
var AsyncBindingError = (function (_super) {
    __extends(AsyncBindingError, _super);
    // TODO(tbosch): Can't do key:Key as this results in a circular dependency!
    function AsyncBindingError(key) {
        _super.call(this, key, function (keys) {
            var first = lang_1.stringify(collection_1.ListWrapper.first(keys).token);
            return "Cannot instantiate " + first + " synchronously. It is provided as a promise!" + constructResolvingPath(keys);
        });
    }
    return AsyncBindingError;
})(AbstractBindingError);
exports.AsyncBindingError = AsyncBindingError;
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
var CyclicDependencyError = (function (_super) {
    __extends(CyclicDependencyError, _super);
    // TODO(tbosch): Can't do key:Key as this results in a circular dependency!
    function CyclicDependencyError(key) {
        _super.call(this, key, function (keys) {
            return "Cannot instantiate cyclic dependency!" + constructResolvingPath(keys);
        });
    }
    return CyclicDependencyError;
})(AbstractBindingError);
exports.CyclicDependencyError = CyclicDependencyError;
/**
 * Thrown when a constructing type returns with an Error.
 *
 * The `InstantiationError` class contains the original error plus the dependency graph which caused
 * this object to be instantiated.
 *
 * @exportedAs angular2/di_errors
 */
var InstantiationError = (function (_super) {
    __extends(InstantiationError, _super);
    // TODO(tbosch): Can't do key:Key as this results in a circular dependency!
    function InstantiationError(cause, key) {
        _super.call(this, key, function (keys) {
            var first = lang_1.stringify(collection_1.ListWrapper.first(keys).token);
            return "Error during instantiation of " + first + "!" + constructResolvingPath(keys) + ". ORIGINAL ERROR: " + cause;
        });
        this.cause = cause;
        this.causeKey = key;
    }
    return InstantiationError;
})(AbstractBindingError);
exports.InstantiationError = InstantiationError;
/**
 * Thrown when an object other then {@link Binding} (or `Type`) is passed to {@link Injector}
 * creation.
 *
 * @exportedAs angular2/di_errors
 */
var InvalidBindingError = (function (_super) {
    __extends(InvalidBindingError, _super);
    function InvalidBindingError(binding) {
        _super.call(this);
        this.message = "Invalid binding - only instances of Binding and Type are allowed, got: " +
            binding.toString();
    }
    InvalidBindingError.prototype.toString = function () { return this.message; };
    return InvalidBindingError;
})(lang_1.BaseException);
exports.InvalidBindingError = InvalidBindingError;
/**
 * Thrown when the class has no annotation information.
 *
 * Lack of annotation information prevents the {@link Injector} from determining which dependencies
 * need to be injected into the constructor.
 *
 * @exportedAs angular2/di_errors
 */
var NoAnnotationError = (function (_super) {
    __extends(NoAnnotationError, _super);
    function NoAnnotationError(typeOrFunc) {
        _super.call(this);
        this.message = "Cannot resolve all parameters for " + lang_1.stringify(typeOrFunc) + ". " +
            'Make sure they all have valid type or annotations.';
    }
    NoAnnotationError.prototype.toString = function () { return this.message; };
    return NoAnnotationError;
})(lang_1.BaseException);
exports.NoAnnotationError = NoAnnotationError;
exports.__esModule = true;
//# sourceMappingURL=exceptions.js.map