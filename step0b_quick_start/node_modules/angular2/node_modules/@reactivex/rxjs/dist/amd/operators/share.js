define(["require", "exports", './publish'], function (require, exports, publish_1) {
    function share() {
        return publish_1.default.call(this).refCount();
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = share;
    ;
});
//# sourceMappingURL=share.js.map