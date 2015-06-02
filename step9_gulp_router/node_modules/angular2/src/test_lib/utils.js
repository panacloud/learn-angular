var collection_1 = require('angular2/src/facade/collection');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var lang_1 = require('angular2/src/facade/lang');
var view_1 = require('angular2/src/render/dom/view/view');
var Log = (function () {
    function Log() {
        this._result = [];
    }
    Log.prototype.add = function (value) { collection_1.ListWrapper.push(this._result, value); };
    Log.prototype.fn = function (value) {
        var _this = this;
        return function (a1, a2, a3, a4, a5) {
            if (a1 === void 0) { a1 = null; }
            if (a2 === void 0) { a2 = null; }
            if (a3 === void 0) { a3 = null; }
            if (a4 === void 0) { a4 = null; }
            if (a5 === void 0) { a5 = null; }
            collection_1.ListWrapper.push(_this._result, value);
        };
    };
    Log.prototype.result = function () {
        return collection_1.ListWrapper.join(this._result, "; ");
    };
    return Log;
})();
exports.Log = Log;
function viewRootNodes(view) {
    return view_1.resolveInternalDomView(view.render).rootNodes;
}
exports.viewRootNodes = viewRootNodes;
function queryView(view, selector) {
    var rootNodes = viewRootNodes(view);
    for (var i = 0; i < rootNodes.length; ++i) {
        var res = dom_adapter_1.DOM.querySelector(rootNodes[i], selector);
        if (lang_1.isPresent(res)) {
            return res;
        }
    }
    return null;
}
exports.queryView = queryView;
function dispatchEvent(element, eventType) {
    dom_adapter_1.DOM.dispatchEvent(element, dom_adapter_1.DOM.createEvent(eventType));
}
exports.dispatchEvent = dispatchEvent;
function el(html) {
    return dom_adapter_1.DOM.firstChild(dom_adapter_1.DOM.content(dom_adapter_1.DOM.createTemplate(html)));
}
exports.el = el;
exports.__esModule = true;
//# sourceMappingURL=utils.js.map