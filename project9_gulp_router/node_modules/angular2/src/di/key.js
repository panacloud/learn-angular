var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var type_literal_1 = require('./type_literal');
var forward_ref_1 = require('./forward_ref');
var type_literal_2 = require('./type_literal');
exports.TypeLiteral = type_literal_2.TypeLiteral;
// TODO: uncoment `int` once https://github.com/angular/angular/issues/1414 is fixed
/**
 * A unique object used for retrieving items from the {@link Injector}.
 *
 * Keys have:
 * - a system-wide unique `id`.
 * - a `token`, usually the `Type` of the instance.
 *
 * Keys are used internally by the {@link Injector} because their system-wide unique `id`s allow the
 * injector to index in arrays rather than looking up items in maps.
 *
 * @exportedAs angular2/di
 */
var Key = (function () {
    /**
     * @private
     */
    function Key(token, id) {
        if (lang_1.isBlank(token)) {
            throw new lang_1.BaseException('Token must be defined!');
        }
        this.token = token;
        this.id = id;
    }
    Object.defineProperty(Key.prototype, "displayName", {
        get: function () { return lang_1.stringify(this.token); },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves a `Key` for a token.
     */
    Key.get = function (token) { return _globalKeyRegistry.get(forward_ref_1.resolveForwardRef(token)); };
    Object.defineProperty(Key, "numberOfKeys", {
        /**
         * @returns the number of keys registered in the system.
         */
        get: function () { return _globalKeyRegistry.numberOfKeys; },
        enumerable: true,
        configurable: true
    });
    return Key;
})();
exports.Key = Key;
/**
 * @private
 */
var KeyRegistry = (function () {
    function KeyRegistry() {
        this._allKeys = collection_1.MapWrapper.create();
    }
    KeyRegistry.prototype.get = function (token) {
        if (token instanceof Key)
            return token;
        // TODO: workaround for https://github.com/Microsoft/TypeScript/issues/3123
        var theToken = token;
        if (token instanceof type_literal_1.TypeLiteral) {
            theToken = token.type;
        }
        token = theToken;
        if (collection_1.MapWrapper.contains(this._allKeys, token)) {
            return collection_1.MapWrapper.get(this._allKeys, token);
        }
        var newKey = new Key(token, Key.numberOfKeys);
        collection_1.MapWrapper.set(this._allKeys, token, newKey);
        return newKey;
    };
    Object.defineProperty(KeyRegistry.prototype, "numberOfKeys", {
        get: function () { return collection_1.MapWrapper.size(this._allKeys); },
        enumerable: true,
        configurable: true
    });
    return KeyRegistry;
})();
exports.KeyRegistry = KeyRegistry;
var _globalKeyRegistry = new KeyRegistry();
exports.__esModule = true;
//# sourceMappingURL=key.js.map