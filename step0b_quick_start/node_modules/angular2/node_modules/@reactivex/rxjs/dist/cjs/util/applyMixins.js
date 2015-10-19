"use strict";

exports.__esModule = true;
exports["default"] = applyMixins;

function applyMixins(derivedCtor, baseCtors) {
    for (var i = 0, len = baseCtors.length; i < len; i++) {
        var baseCtor = baseCtors[i];
        var propertyKeys = Object.getOwnPropertyNames(baseCtor.prototype);
        for (var j = 0, len2 = propertyKeys.length; j < len2; j++) {
            var _name = propertyKeys[j];
            derivedCtor.prototype[_name] = baseCtor.prototype[_name];
        }
    }
}

module.exports = exports["default"];