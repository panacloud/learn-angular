var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../util/tryCatch', '../util/errorObject', '../OuterSubscriber', '../util/subscribeToResult'], function (require, exports, tryCatch_1, errorObject_1, OuterSubscriber_1, subscribeToResult_1) {
    var ExpandOperator = (function () {
        function ExpandOperator(project, concurrent) {
            if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
            this.project = project;
            this.concurrent = concurrent;
        }
        ExpandOperator.prototype.call = function (subscriber) {
            return new ExpandSubscriber(subscriber, this.project, this.concurrent);
        };
        return ExpandOperator;
    })();
    exports.ExpandOperator = ExpandOperator;
    var ExpandSubscriber = (function (_super) {
        __extends(ExpandSubscriber, _super);
        function ExpandSubscriber(destination, project, concurrent) {
            if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
            _super.call(this, destination);
            this.project = project;
            this.concurrent = concurrent;
            this.index = 0;
            this.active = 0;
            this.hasCompleted = false;
            if (concurrent < Number.POSITIVE_INFINITY) {
                this.buffer = [];
            }
        }
        ExpandSubscriber.prototype._next = function (value) {
            var index = this.index++;
            this.destination.next(value);
            if (this.active < this.concurrent) {
                var result = tryCatch_1.default(this.project)(value, index);
                if (result === errorObject_1.errorObject) {
                    this.destination.error(result.e);
                }
                else {
                    if (result._isScalar) {
                        this._next(result.value);
                    }
                    else {
                        this.active++;
                        this.add(subscribeToResult_1.default(this, result, value, index));
                    }
                }
            }
            else {
                this.buffer.push(value);
            }
        };
        ExpandSubscriber.prototype._complete = function () {
            this.hasCompleted = true;
            if (this.hasCompleted && this.active === 0) {
                this.destination.complete();
            }
        };
        ExpandSubscriber.prototype.notifyComplete = function (innerSub) {
            var buffer = this.buffer;
            this.remove(innerSub);
            this.active--;
            if (buffer && buffer.length > 0) {
                this._next(buffer.shift());
            }
            if (this.hasCompleted && this.active === 0) {
                this.destination.complete();
            }
        };
        ExpandSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
            this._next(innerValue);
        };
        return ExpandSubscriber;
    })(OuterSubscriber_1.default);
    exports.ExpandSubscriber = ExpandSubscriber;
});
//# sourceMappingURL=expand-support.js.map