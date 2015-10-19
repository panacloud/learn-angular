define(["require", "exports", './publishReplay'], function (require, exports, publishReplay_1) {
    function shareReplay(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
        if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
        return publishReplay_1.default.call(this, bufferSize, windowTime, scheduler).refCount();
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = shareReplay;
});
//# sourceMappingURL=shareReplay.js.map