var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var lang_1 = require("angular2/src/facade/lang");
var ExpressionChangedAfterItHasBeenChecked = (function (_super) {
    __extends(ExpressionChangedAfterItHasBeenChecked, _super);
    function ExpressionChangedAfterItHasBeenChecked(proto, change) {
        _super.call(this);
        this.message =
            ("Expression '" + proto.expressionAsString + "' has changed after it was checked. ") +
                ("Previous value: '" + change.previousValue + "'. Current value: '" + change.currentValue + "'");
    }
    ExpressionChangedAfterItHasBeenChecked.prototype.toString = function () { return this.message; };
    return ExpressionChangedAfterItHasBeenChecked;
})(lang_1.BaseException);
exports.ExpressionChangedAfterItHasBeenChecked = ExpressionChangedAfterItHasBeenChecked;
var ChangeDetectionError = (function (_super) {
    __extends(ChangeDetectionError, _super);
    function ChangeDetectionError(proto, originalException) {
        _super.call(this);
        this.originalException = originalException;
        this.location = proto.expressionAsString;
        this.message = this.originalException + " in [" + this.location + "]";
    }
    ChangeDetectionError.prototype.toString = function () { return this.message; };
    return ChangeDetectionError;
})(lang_1.BaseException);
exports.ChangeDetectionError = ChangeDetectionError;
exports.__esModule = true;
//# sourceMappingURL=exceptions.js.map