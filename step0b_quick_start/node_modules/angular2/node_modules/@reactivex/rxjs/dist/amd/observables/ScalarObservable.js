var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Observable', '../util/tryCatch', '../util/errorObject', './ErrorObservable', './EmptyObservable'], function (require, exports, Observable_1, tryCatch_1, errorObject_1, ErrorObservable_1, EmptyObservable_1) {
    var ScalarObservable = (function (_super) {
        __extends(ScalarObservable, _super);
        function ScalarObservable(value, scheduler) {
            _super.call(this);
            this.value = value;
            this.scheduler = scheduler;
            this._isScalar = true;
        }
        ScalarObservable.create = function (value, scheduler) {
            return new ScalarObservable(value, scheduler);
        };
        ScalarObservable.dispatch = function (state) {
            var done = state.done, value = state.value, subscriber = state.subscriber;
            if (done) {
                subscriber.complete();
                return;
            }
            subscriber.next(value);
            if (subscriber.isUnsubscribed) {
                return;
            }
            state.done = true;
            this.schedule(state);
        };
        ScalarObservable.prototype._subscribe = function (subscriber) {
            var value = this.value;
            var scheduler = this.scheduler;
            if (scheduler) {
                subscriber.add(scheduler.schedule(ScalarObservable.dispatch, 0, {
                    done: false, value: value, subscriber: subscriber
                }));
            }
            else {
                subscriber.next(value);
                if (!subscriber.isUnsubscribed) {
                    subscriber.complete();
                }
            }
        };
        return ScalarObservable;
    })(Observable_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ScalarObservable;
    // TypeScript is weird about class prototype member functions and instance properties touching on it's plate.
    var proto = ScalarObservable.prototype;
    proto.map = function (project, thisArg) {
        var result = tryCatch_1.default(project).call(thisArg || this, this.value, 0);
        if (result === errorObject_1.errorObject) {
            return new ErrorObservable_1.default(errorObject_1.errorObject.e);
        }
        else {
            return new ScalarObservable(project.call(thisArg || this, this.value, 0));
        }
    };
    proto.filter = function (select, thisArg) {
        var result = tryCatch_1.default(select).call(thisArg || this, this.value, 0);
        if (result === errorObject_1.errorObject) {
            return new ErrorObservable_1.default(errorObject_1.errorObject.e);
        }
        else if (result) {
            return this;
        }
        else {
            return new EmptyObservable_1.default();
        }
    };
    proto.reduce = function (project, acc) {
        if (typeof acc === 'undefined') {
            return this;
        }
        var result = tryCatch_1.default(project)(acc, this.value);
        if (result === errorObject_1.errorObject) {
            return new ErrorObservable_1.default(errorObject_1.errorObject.e);
        }
        else {
            return new ScalarObservable(result);
        }
    };
    proto.scan = function (project, acc) {
        return this.reduce(project, acc);
    };
    proto.count = function (predicate, thisArg) {
        if (!predicate) {
            return new ScalarObservable(1);
        }
        else {
            var result = tryCatch_1.default(predicate).call(thisArg || this, this.value, 0, this);
            if (result === errorObject_1.errorObject) {
                return new ErrorObservable_1.default(errorObject_1.errorObject.e);
            }
            else {
                return new ScalarObservable(result ? 1 : 0);
            }
        }
    };
    proto.skip = function (count) {
        if (count > 0) {
            return new EmptyObservable_1.default();
        }
        return this;
    };
    proto.take = function (count) {
        if (count > 0) {
            return this;
        }
        return new EmptyObservable_1.default();
    };
});
//# sourceMappingURL=ScalarObservable.js.map