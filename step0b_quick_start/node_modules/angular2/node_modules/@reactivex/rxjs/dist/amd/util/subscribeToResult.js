define(["require", "exports", '../Observable', '../util/Symbol_iterator', '../util/Symbol_observable', '../InnerSubscriber'], function (require, exports, Observable_1, Symbol_iterator_1, Symbol_observable_1, InnerSubscriber_1) {
    var isArray = Array.isArray;
    function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
        var destination = new InnerSubscriber_1.default(outerSubscriber, outerValue, outerIndex);
        if (destination.isUnsubscribed) {
            return;
        }
        if (result instanceof Observable_1.default) {
            if (result._isScalar) {
                destination.next(result.value);
                destination.complete();
                return;
            }
            else {
                return result.subscribe(destination);
            }
        }
        if (isArray(result)) {
            for (var i = 0, len = result.length; i < len && !destination.isUnsubscribed; i++) {
                destination.next(result[i]);
            }
            if (!destination.isUnsubscribed) {
                destination.complete();
            }
        }
        else if (typeof result.then === 'function') {
            result.then(function (x) {
                if (!destination.isUnsubscribed) {
                    destination.next(x);
                    destination.complete();
                }
            }, function (err) { return destination.error(err); })
                .then(null, function (err) {
                // Escaping the Promise trap: globally throw unhandled errors
                setTimeout(function () { throw err; });
            });
            return destination;
        }
        else if (typeof result[Symbol_iterator_1.default] === 'function') {
            for (var _i = 0; _i < result.length; _i++) {
                var item = result[_i];
                destination.next(item);
                if (destination.isUnsubscribed) {
                    break;
                }
            }
            if (!destination.isUnsubscribed) {
                destination.complete();
            }
        }
        else if (typeof result[Symbol_observable_1.default] === 'function') {
            var obs = result[Symbol_observable_1.default]();
            if (typeof obs.subscribe !== 'function') {
                destination.error('invalid observable');
            }
            else {
                return obs.subscribe(new InnerSubscriber_1.default(outerSubscriber, outerValue, outerIndex));
            }
        }
        else {
            destination.error(new TypeError('unknown type returned'));
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = subscribeToResult;
});
//# sourceMappingURL=subscribeToResult.js.map