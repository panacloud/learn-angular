define(["require", "exports"], function (require, exports) {
    var EmptyError = (function () {
        function EmptyError() {
            this.name = 'EmptyError';
            this.message = 'no elements in sequence';
        }
        return EmptyError;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = EmptyError;
});
//# sourceMappingURL=EmptyError.js.map