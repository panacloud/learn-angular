function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./change_detection'));
__export(require('./core'));
__export(require('./annotations'));
__export(require('./directives'));
__export(require('./forms'));
__export(require('./di'));
var async_1 = require('angular2/src/facade/async');
exports.Observable = async_1.Observable;
exports.EventEmitter = async_1.EventEmitter;
__export(require('angular2/src/render/api'));
var dom_renderer_1 = require('angular2/src/render/dom/dom_renderer');
exports.DomRenderer = dom_renderer_1.DomRenderer;
exports.DOCUMENT_TOKEN = dom_renderer_1.DOCUMENT_TOKEN;
exports.__esModule = true;
//# sourceMappingURL=angular2.js.map