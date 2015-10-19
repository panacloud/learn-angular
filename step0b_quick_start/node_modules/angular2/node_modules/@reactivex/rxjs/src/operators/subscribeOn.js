var SubscribeOnObservable_1 = require('../observables/SubscribeOnObservable');
function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return new SubscribeOnObservable_1.default(this, delay, scheduler);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = subscribeOn;
//# sourceMappingURL=subscribeOn.js.map