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
    Log.prototype.result = function () { return collection_1.ListWrapper.join(this._result, "; "); };
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
var _RE_SPECIAL_CHARS = ['-', '[', ']', '/', '{', '}', '\\', '(', ')', '*', '+', '?', '.', '^', '$', '|'];
var _ESCAPE_RE = lang_1.RegExpWrapper.create("[\\" + _RE_SPECIAL_CHARS.join('\\') + "]");
function containsRegexp(input) {
    return lang_1.RegExpWrapper.create(lang_1.StringWrapper.replaceAllMapped(input, _ESCAPE_RE, function (match) { return ("\\" + match[0]); }));
}
exports.containsRegexp = containsRegexp;
function normalizeCSS(css) {
    css = lang_1.StringWrapper.replaceAll(css, lang_1.RegExpWrapper.create('\\s+'), ' ');
    css = lang_1.StringWrapper.replaceAll(css, lang_1.RegExpWrapper.create(':\\s'), ':');
    css = lang_1.StringWrapper.replaceAll(css, lang_1.RegExpWrapper.create("\\'"), '"');
    css = lang_1.StringWrapper.replaceAllMapped(css, lang_1.RegExpWrapper.create('url\\(\\"(.+)\\"\\)'), function (match) { return ("url(" + match[1] + ")"); });
    css = lang_1.StringWrapper.replaceAllMapped(css, lang_1.RegExpWrapper.create('\\[(.+)=([^"\\]]+)\\]'), function (match) { return ("[" + match[1] + "=\"" + match[2] + "\"]"); });
    return css;
}
exports.normalizeCSS = normalizeCSS;
var _singleTagWhitelist = ['br', 'hr', 'input'];
function stringifyElement(el) {
    var result = '';
    if (dom_adapter_1.DOM.isElementNode(el)) {
        var tagName = lang_1.StringWrapper.toLowerCase(dom_adapter_1.DOM.tagName(el));
        // Opening tag
        result += "<" + tagName;
        // Attributes in an ordered way
        var attributeMap = dom_adapter_1.DOM.attributeMap(el);
        var keys = collection_1.ListWrapper.create();
        collection_1.MapWrapper.forEach(attributeMap, function (v, k) { collection_1.ListWrapper.push(keys, k); });
        collection_1.ListWrapper.sort(keys);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var attValue = collection_1.MapWrapper.get(attributeMap, key);
            if (!lang_1.isString(attValue)) {
                result += " " + key;
            }
            else {
                result += " " + key + "=\"" + attValue + "\"";
            }
        }
        result += '>';
        // Children
        var children = dom_adapter_1.DOM.childNodes(dom_adapter_1.DOM.templateAwareRoot(el));
        for (var j = 0; j < children.length; j++) {
            result += stringifyElement(children[j]);
        }
        // Closing tag
        if (!collection_1.ListWrapper.contains(_singleTagWhitelist, tagName)) {
            result += "</" + tagName + ">";
        }
    }
    else {
        result += dom_adapter_1.DOM.getText(el);
    }
    return result;
}
exports.stringifyElement = stringifyElement;
exports.__esModule = true;
//# sourceMappingURL=utils.js.map