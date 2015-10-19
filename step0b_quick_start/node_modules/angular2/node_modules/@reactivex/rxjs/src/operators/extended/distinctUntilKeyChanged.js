var distinctUntilChanged_1 = require('../distinctUntilChanged');
function distinctUntilKeyChanged(key, compare, thisArg) {
    return distinctUntilChanged_1.default.call(this, function (x, y) {
        if (compare) {
            return compare.call(thisArg, x[key], y[key]);
        }
        return x[key] === y[key];
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = distinctUntilKeyChanged;
//# sourceMappingURL=distinctUntilKeyChanged.js.map