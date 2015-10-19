var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Subscriber', '../util/tryCatch', '../util/errorObject', '../util/bindCallback', '../util/EmptyError'], function (require, exports, Subscriber_1, tryCatch_1, errorObject_1, bindCallback_1, EmptyError_1) {
    function single(predicate, thisArg) {
        return this.lift(new SingleOperator(predicate, thisArg, this));
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = single;
    var SingleOperator = (function () {
        function SingleOperator(predicate, thisArg, source) {
            this.predicate = predicate;
            this.thisArg = thisArg;
            this.source = source;
        }
        SingleOperator.prototype.call = function (subscriber) {
            return new SingleSubscriber(subscriber, this.predicate, this.thisArg, this.source);
        };
        return SingleOperator;
    })();
    var SingleSubscriber = (function (_super) {
        __extends(SingleSubscriber, _super);
        function SingleSubscriber(destination, predicate, thisArg, source) {
            _super.call(this, destination);
            this.thisArg = thisArg;
            this.source = source;
            this.seenValue = false;
            this.index = 0;
            if (typeof predicate === 'function') {
                this.predicate = bindCallback_1.default(predicate, thisArg, 3);
            }
        }
        SingleSubscriber.prototype.applySingleValue = function (value) {
            if (this.seenValue) {
                this.destination.error('Sequence contains more than one element');
            }
            else {
                this.seenValue = true;
                this.singleValue = value;
            }
        };
        SingleSubscriber.prototype._next = function (value) {
            var predicate = this.predicate;
            var currentIndex = this.index++;
            if (predicate) {
                var result = tryCatch_1.default(predicate)(value, currentIndex, this.source);
                if (result === errorObject_1.errorObject) {
                    this.destination.error(result.e);
                }
                else if (result) {
                    this.applySingleValue(value);
                }
            }
            else {
                this.applySingleValue(value);
            }
        };
        SingleSubscriber.prototype._complete = function () {
            var destination = this.destination;
            if (this.index > 0) {
                destination.next(this.seenValue ? this.singleValue : undefined);
                destination.complete();
            }
            else {
                destination.error(new EmptyError_1.default);
            }
        };
        return SingleSubscriber;
    })(Subscriber_1.default);
});
//# sourceMappingURL=single.js.map