var find_support_1 = require('./find-support');
function findIndex(predicate, thisArg) {
    return this.lift(new find_support_1.FindValueOperator(predicate, this, true, thisArg));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = findIndex;
//# sourceMappingURL=findIndex.js.map