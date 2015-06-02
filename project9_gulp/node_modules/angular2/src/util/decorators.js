var lang_1 = require('angular2/src/facade/lang');
function makeDecorator(annotationCls) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var Reflect = lang_1.global.Reflect;
        if (!(Reflect && Reflect.getMetadata)) {
            throw 'reflect-metadata shim is required when using class decorators';
        }
        var annotationInstance = Object.create(annotationCls.prototype);
        annotationCls.apply(annotationInstance, args);
        return function (cls) {
            var annotations = Reflect.getMetadata('annotations', cls);
            annotations = annotations || [];
            annotations.push(annotationInstance);
            Reflect.defineMetadata('annotations', annotations, cls);
            return cls;
        };
    };
}
exports.makeDecorator = makeDecorator;
function makeParamDecorator(annotationCls) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var Reflect = lang_1.global.Reflect;
        if (!(Reflect && Reflect.getMetadata)) {
            throw 'reflect-metadata shim is required when using parameter decorators';
        }
        var annotationInstance = Object.create(annotationCls.prototype);
        annotationCls.apply(annotationInstance, args);
        return function (cls, unusedKey, index) {
            var parameters = Reflect.getMetadata('parameters', cls);
            parameters = parameters || [];
            // there might be gaps if some in between parameters do not have annotations.
            // we pad with nulls.
            while (parameters.length <= index) {
                parameters.push(null);
            }
            parameters[index] = parameters[index] || [];
            var annotationsForParam = parameters[index];
            annotationsForParam.push(annotationInstance);
            Reflect.defineMetadata('parameters', parameters, cls);
            return cls;
        };
    };
}
exports.makeParamDecorator = makeParamDecorator;
exports.__esModule = true;
//# sourceMappingURL=decorators.js.map