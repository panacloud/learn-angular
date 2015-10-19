var mergeAll_support_1 = require('./mergeAll-support');
function mergeAll(concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return this.lift(new mergeAll_support_1.MergeAllOperator(concurrent));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mergeAll;
//# sourceMappingURL=mergeAll.js.map