var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../schedulers/immediate', '../util/isDate', '../OuterSubscriber', '../util/subscribeToResult'], function (require, exports, immediate_1, isDate_1, OuterSubscriber_1, subscribeToResult_1) {
    function timeoutWith(due, withObservable, scheduler) {
        if (scheduler === void 0) { scheduler = immediate_1.default; }
        var absoluteTimeout = isDate_1.default(due);
        var waitFor = absoluteTimeout ? (+due - scheduler.now()) : due;
        return this.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = timeoutWith;
    var TimeoutWithOperator = (function () {
        function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
            this.waitFor = waitFor;
            this.absoluteTimeout = absoluteTimeout;
            this.withObservable = withObservable;
            this.scheduler = scheduler;
        }
        TimeoutWithOperator.prototype.call = function (subscriber) {
            return new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler);
        };
        return TimeoutWithOperator;
    })();
    var TimeoutWithSubscriber = (function (_super) {
        __extends(TimeoutWithSubscriber, _super);
        function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
            _super.call(this, destination);
            this.absoluteTimeout = absoluteTimeout;
            this.waitFor = waitFor;
            this.withObservable = withObservable;
            this.scheduler = scheduler;
            this.timeoutSubscription = undefined;
            this.timedOut = false;
            this.index = 0;
            this._previousIndex = 0;
            this._hasCompleted = false;
            this.scheduleTimeout();
        }
        Object.defineProperty(TimeoutWithSubscriber.prototype, "previousIndex", {
            get: function () {
                return this._previousIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeoutWithSubscriber.prototype, "hasCompleted", {
            get: function () {
                return this._hasCompleted;
            },
            enumerable: true,
            configurable: true
        });
        TimeoutWithSubscriber.dispatchTimeout = function (state) {
            var source = state.subscriber;
            var currentIndex = state.index;
            if (!source.hasCompleted && source.previousIndex === currentIndex) {
                source.handleTimeout();
            }
        };
        TimeoutWithSubscriber.prototype.scheduleTimeout = function () {
            var currentIndex = this.index;
            var timeoutState = { subscriber: this, index: currentIndex };
            this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, timeoutState);
            this.index++;
            this._previousIndex = currentIndex;
        };
        TimeoutWithSubscriber.prototype._next = function (value) {
            if (!this.timedOut) {
                this.destination.next(value);
                if (!this.absoluteTimeout) {
                    this.scheduleTimeout();
                }
            }
        };
        TimeoutWithSubscriber.prototype._error = function (err) {
            if (!this.timedOut) {
                this.destination.error(err);
                this._hasCompleted = true;
            }
        };
        TimeoutWithSubscriber.prototype._complete = function () {
            if (!this.timedOut) {
                this.destination.complete();
                this._hasCompleted = true;
            }
        };
        TimeoutWithSubscriber.prototype.handleTimeout = function () {
            var withObservable = this.withObservable;
            this.timedOut = true;
            this.add(this.timeoutSubscription = subscribeToResult_1.default(this, withObservable));
        };
        return TimeoutWithSubscriber;
    })(OuterSubscriber_1.default);
});
//# sourceMappingURL=timeoutWith.js.map