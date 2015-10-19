define(["require", "exports", './expand-support'], function (require, exports, expand_support_1) {
    function expand(project, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        return this.lift(new expand_support_1.ExpandOperator(project, concurrent));
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = expand;
});
//# sourceMappingURL=expand.js.map