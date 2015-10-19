var zip_support_1 = require('./zip-support');
function zipAll(project) {
    return this.lift(new zip_support_1.ZipOperator(project));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = zipAll;
//# sourceMappingURL=zipAll.js.map