var Subject_1 = require('../Subject');
var multicast_1 = require('./multicast');
function subjectFactory() {
    return new Subject_1.default();
}
function publish() {
    return multicast_1.default.call(this, subjectFactory);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = publish;
//# sourceMappingURL=publish.js.map