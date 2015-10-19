var BehaviorSubject_1 = require('../subjects/BehaviorSubject');
var multicast_1 = require('./multicast');
function publishBehavior(value) {
    return multicast_1.default.call(this, function () { return new BehaviorSubject_1.default(value); });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = publishBehavior;
//# sourceMappingURL=publishBehavior.js.map