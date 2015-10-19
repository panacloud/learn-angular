define(["require", "exports", '../observables/ArrayObservable', './combineLatest-support'], function (require, exports, ArrayObservable_1, combineLatest_support_1) {
    /**
     * Combines the values from this observable with values from observables passed as arguments. This is done by subscribing
     * to each observable, in order, and collecting an array of each of the most recent values any time any of the observables
     * emits, then either taking that array and passing it as arguments to an option `project` function and emitting the return
     * value of that, or just emitting the array of recent values directly if there is no `project` function.
     * @param {...Observable} observables the observables to combine the source with
     * @param {function} [project] an optional function to project the values from the combined recent values into a new value for emission.
     * @returns {Observable} an observable of other projected values from the most recent values from each observable, or an array of each of
     * the most recent values from each observable.
     */
    function combineLatest() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i - 0] = arguments[_i];
        }
        observables.unshift(this);
        var project;
        if (typeof observables[observables.length - 1] === 'function') {
            project = observables.pop();
        }
        return new ArrayObservable_1.default(observables).lift(new combineLatest_support_1.CombineLatestOperator(project));
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = combineLatest;
});
//# sourceMappingURL=combineLatest.js.map