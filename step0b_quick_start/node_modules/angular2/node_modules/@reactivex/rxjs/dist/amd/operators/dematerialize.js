var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Subscriber'], function (require, exports, Subscriber_1) {
    function dematerialize() {
        return this.lift(new DeMaterializeOperator());
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = dematerialize;
    var DeMaterializeOperator = (function () {
        function DeMaterializeOperator() {
        }
        DeMaterializeOperator.prototype.call = function (subscriber) {
            return new DeMaterializeSubscriber(subscriber);
        };
        return DeMaterializeOperator;
    })();
    var DeMaterializeSubscriber = (function (_super) {
        __extends(DeMaterializeSubscriber, _super);
        function DeMaterializeSubscriber(destination) {
            _super.call(this, destination);
        }
        DeMaterializeSubscriber.prototype._next = function (value) {
            value.observe(this.destination);
        };
        return DeMaterializeSubscriber;
    })(Subscriber_1.default);
});
//# sourceMappingURL=dematerialize.js.map