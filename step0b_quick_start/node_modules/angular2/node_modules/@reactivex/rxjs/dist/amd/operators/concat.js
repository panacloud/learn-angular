define(["require", "exports", '../Observable'], function (require, exports, Observable_1) {
    /**
     * Joins this observable with multiple other observables by subscribing to them one at a time, starting with the source,
     * and merging their results into the returned observable. Will wait for each observable to complete before moving
     * on to the next.
     * @params {...Observable} the observables to concatenate
     * @params {Scheduler} [scheduler] an optional scheduler to schedule each observable subscription on.
     * @returns {Observable} All values of each passed observable merged into a single observable, in order, in serial fashion.
     */
    function concat() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i - 0] = arguments[_i];
        }
        var args = observables;
        args.unshift(this);
        if (args.length > 1 && typeof args[args.length - 1].schedule === 'function') {
            args.splice(args.length - 2, 0, 1);
        }
        return Observable_1.default.fromArray(args).mergeAll(1);
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = concat;
});
//# sourceMappingURL=concat.js.map