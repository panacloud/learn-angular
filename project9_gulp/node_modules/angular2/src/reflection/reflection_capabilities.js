var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var ReflectionCapabilities = (function () {
    function ReflectionCapabilities(reflect) {
        this._reflect = lang_1.isPresent(reflect) ? reflect : lang_1.global.Reflect;
    }
    ReflectionCapabilities.prototype.factory = function (t) {
        switch (t.length) {
            case 0:
                return function () { return new t(); };
            case 1:
                return function (a1) { return new t(a1); };
            case 2:
                return function (a1, a2) { return new t(a1, a2); };
            case 3:
                return function (a1, a2, a3) { return new t(a1, a2, a3); };
            case 4:
                return function (a1, a2, a3, a4) { return new t(a1, a2, a3, a4); };
            case 5:
                return function (a1, a2, a3, a4, a5) { return new t(a1, a2, a3, a4, a5); };
            case 6:
                return function (a1, a2, a3, a4, a5, a6) { return new t(a1, a2, a3, a4, a5, a6); };
            case 7:
                return function (a1, a2, a3, a4, a5, a6, a7) { return new t(a1, a2, a3, a4, a5, a6, a7); };
            case 8:
                return function (a1, a2, a3, a4, a5, a6, a7, a8) {
                    return new t(a1, a2, a3, a4, a5, a6, a7, a8);
                };
            case 9:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                    return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9);
                };
            case 10:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
                    return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
                };
        }
        ;
        throw new Error("Cannot create a factory for '" + lang_1.stringify(t) + "' because its constructor has more than 10 arguments");
    };
    ReflectionCapabilities.prototype._zipTypesAndAnnotaions = function (paramTypes, paramAnnotations) {
        var result;
        if (typeof paramTypes === 'undefined') {
            result = collection_1.ListWrapper.createFixedSize(paramAnnotations.length);
        }
        else {
            result = collection_1.ListWrapper.createFixedSize(paramTypes.length);
        }
        for (var i = 0; i < result.length; i++) {
            // TS outputs Object for parameters without types, while Traceur omits
            // the annotations. For now we preserve the Traceur behavior to aid
            // migration, but this can be revisited.
            if (typeof paramTypes === 'undefined') {
                result[i] = [];
            }
            else if (paramTypes[i] != Object) {
                result[i] = [paramTypes[i]];
            }
            else {
                result[i] = [];
            }
            if (lang_1.isPresent(paramAnnotations) && lang_1.isPresent(paramAnnotations[i])) {
                result[i] = result[i].concat(paramAnnotations[i]);
            }
        }
        return result;
    };
    ReflectionCapabilities.prototype.parameters = function (typeOfFunc) {
        // Prefer the direct API.
        if (lang_1.isPresent(typeOfFunc.parameters)) {
            return typeOfFunc.parameters;
        }
        if (lang_1.isPresent(this._reflect) && lang_1.isPresent(this._reflect.getMetadata)) {
            var paramAnnotations = this._reflect.getMetadata('parameters', typeOfFunc);
            var paramTypes = this._reflect.getMetadata('design:paramtypes', typeOfFunc);
            if (lang_1.isPresent(paramTypes) || lang_1.isPresent(paramAnnotations)) {
                return this._zipTypesAndAnnotaions(paramTypes, paramAnnotations);
            }
        }
        return collection_1.ListWrapper.createFixedSize(typeOfFunc.length);
    };
    ReflectionCapabilities.prototype.annotations = function (typeOfFunc) {
        // Prefer the direct API.
        if (lang_1.isPresent(typeOfFunc.annotations)) {
            return typeOfFunc.annotations;
        }
        if (lang_1.isPresent(this._reflect) && lang_1.isPresent(this._reflect.getMetadata)) {
            var annotations = this._reflect.getMetadata('annotations', typeOfFunc);
            if (lang_1.isPresent(annotations))
                return annotations;
        }
        return [];
    };
    ReflectionCapabilities.prototype.getter = function (name) { return new Function('o', 'return o.' + name + ';'); };
    ReflectionCapabilities.prototype.setter = function (name) { return new Function('o', 'v', 'return o.' + name + ' = v;'); };
    ReflectionCapabilities.prototype.method = function (name) {
        var functionBody = "if (!o." + name + ") throw new Error('\"" + name + "\" is undefined');\n        return o." + name + ".apply(o, args);";
        return new Function('o', 'args', functionBody);
    };
    return ReflectionCapabilities;
})();
exports.ReflectionCapabilities = ReflectionCapabilities;
exports.__esModule = true;
//# sourceMappingURL=reflection_capabilities.js.map