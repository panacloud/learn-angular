var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Subscriber'], function (require, exports, Subscriber_1) {
    function ignoreElements() {
        return this.lift(new IgnoreElementsOperator());
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ignoreElements;
    ;
    var IgnoreElementsOperator = (function () {
        function IgnoreElementsOperator() {
        }
        IgnoreElementsOperator.prototype.call = function (subscriber) {
            return new IgnoreElementsSubscriber(subscriber);
        };
        return IgnoreElementsOperator;
    })();
    var IgnoreElementsSubscriber = (function (_super) {
        __extends(IgnoreElementsSubscriber, _super);
        function IgnoreElementsSubscriber() {
            _super.apply(this, arguments);
        }
        IgnoreElementsSubscriber.prototype._next = function () { };
        return IgnoreElementsSubscriber;
    })(Subscriber_1.default);
});
//# sourceMappingURL=ignoreElements.js.map