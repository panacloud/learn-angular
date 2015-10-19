var root_1 = require('./root');
if (!root_1.root.Symbol) {
    root_1.root.Symbol = {};
}
if (!root_1.root.Symbol.dispose) {
    if (typeof root_1.root.Symbol.for === 'function') {
        root_1.root.Symbol.dispose = root_1.root.Symbol.for('dispose');
    }
    else {
        root_1.root.Symbol.dispose = '@@dispose';
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = root_1.root.Symbol.dispose;
//# sourceMappingURL=Symbol_dispose.js.map