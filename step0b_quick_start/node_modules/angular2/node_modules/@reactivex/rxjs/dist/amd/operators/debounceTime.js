var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Subscriber', '../schedulers/nextTick'], function (require, exports, Subscriber_1, nextTick_1) {
    function debounceTime(dueTime, scheduler) {
        if (scheduler === void 0) { scheduler = nextTick_1.default; }
        return this.lift(new DebounceTimeOperator(dueTime, scheduler));
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = debounceTime;
    var DebounceTimeOperator = (function () {
        function DebounceTimeOperator(dueTime, scheduler) {
            this.dueTime = dueTime;
            this.scheduler = scheduler;
        }
        DebounceTimeOperator.prototype.call = function (subscriber) {
            return new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler);
        };
        return DebounceTimeOperator;
    })();
    var DebounceTimeSubscriber = (function (_super) {
        __extends(DebounceTimeSubscriber, _super);
        function DebounceTimeSubscriber(destination, dueTime, scheduler) {
            _super.call(this, destination);
            this.dueTime = dueTime;
            this.scheduler = scheduler;
            this.debouncedSubscription = null;
            this.lastValue = null;
        }
        DebounceTimeSubscriber.prototype._next = function (value) {
            this.clearDebounce();
            this.lastValue = value;
            this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
        };
        DebounceTimeSubscriber.prototype._complete = function () {
            this.debouncedNext();
            this.destination.complete();
        };
        DebounceTimeSubscriber.prototype.debouncedNext = function () {
            this.clearDebounce();
            if (this.lastValue != null) {
                this.destination.next(this.lastValue);
                this.lastValue = null;
            }
        };
        DebounceTimeSubscriber.prototype.clearDebounce = function () {
            var debouncedSubscription = this.debouncedSubscription;
            if (debouncedSubscription !== null) {
                this.remove(debouncedSubscription);
                debouncedSubscription.unsubscribe();
                this.debouncedSubscription = null;
            }
        };
        return DebounceTimeSubscriber;
    })(Subscriber_1.default);
    function dispatchNext(subscriber) {
        subscriber.debouncedNext();
    }
});
//# sourceMappingURL=debounceTime.js.map