var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Subscriber'], function (require, exports, Subscriber_1) {
    var OuterSubscriber = (function (_super) {
        __extends(OuterSubscriber, _super);
        function OuterSubscriber() {
            _super.apply(this, arguments);
        }
        OuterSubscriber.prototype.notifyComplete = function (inner) {
            this.destination.complete();
        };
        OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
            this.destination.next(innerValue);
        };
        OuterSubscriber.prototype.notifyError = function (error, inner) {
            this.destination.error(error);
        };
        return OuterSubscriber;
    })(Subscriber_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = OuterSubscriber;
});
//# sourceMappingURL=OuterSubscriber.js.map