var SubscriptionLog = (function () {
    function SubscriptionLog(subscribedFrame, unsubscribedFrame) {
        if (unsubscribedFrame === void 0) { unsubscribedFrame = Number.POSITIVE_INFINITY; }
        this.subscribedFrame = subscribedFrame;
        this.unsubscribedFrame = unsubscribedFrame;
    }
    return SubscriptionLog;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubscriptionLog;
//# sourceMappingURL=SubscriptionLog.js.map