var ReplaySubject_1 = require('../subjects/ReplaySubject');
var multicast_1 = require('./multicast');
function publishReplay(bufferSize, windowTime, scheduler) {
    if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
    if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
    return multicast_1.default.call(this, function () { return new ReplaySubject_1.default(bufferSize, windowTime, scheduler); });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = publishReplay;
//# sourceMappingURL=publishReplay.js.map