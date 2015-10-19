var ArrayObservable_1 = require('../observables/ArrayObservable');
var zip_support_1 = require('./zip-support');
function zip() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var project = observables[observables.length - 1];
    if (typeof project === 'function') {
        observables.pop();
    }
    return new ArrayObservable_1.default(observables).lift(new zip_support_1.ZipOperator(project));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = zip;
//# sourceMappingURL=zip-static.js.map