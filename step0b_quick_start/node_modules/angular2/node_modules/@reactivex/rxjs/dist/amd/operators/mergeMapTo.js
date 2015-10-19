define(["require", "exports", './mergeMapTo-support'], function (require, exports, mergeMapTo_support_1) {
    function mergeMapTo(observable, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        return this.lift(new mergeMapTo_support_1.MergeMapToOperator(observable, resultSelector, concurrent));
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = mergeMapTo;
});
//# sourceMappingURL=mergeMapTo.js.map