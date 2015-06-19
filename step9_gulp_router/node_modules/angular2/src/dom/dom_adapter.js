var lang_1 = require('angular2/src/facade/lang');
exports.DOM;
function setRootDomAdapter(adapter) {
    if (lang_1.isBlank(exports.DOM)) {
        exports.DOM = adapter;
    }
}
exports.setRootDomAdapter = setRootDomAdapter;
function _abstract() {
    return new lang_1.BaseException('This method is abstract');
}
/**
 * Provides DOM operations in an environment-agnostic way.
 */
var DomAdapter = (function () {
    function DomAdapter() {
    }
    DomAdapter.prototype.logError = function (error) { throw _abstract(); };
    Object.defineProperty(DomAdapter.prototype, "attrToPropMap", {
        /**
         * Maps attribute names to their corresponding property names for cases
         * where attribute name doesn't match property name.
         */
        get: function () { throw _abstract(); },
        enumerable: true,
        configurable: true
    });
    DomAdapter.prototype.parse = function (templateHtml) { throw _abstract(); };
    DomAdapter.prototype.query = function (selector) { throw _abstract(); };
    DomAdapter.prototype.querySelector = function (el, selector) { throw _abstract(); };
    DomAdapter.prototype.querySelectorAll = function (el, selector) { throw _abstract(); };
    DomAdapter.prototype.on = function (el, evt, listener) { throw _abstract(); };
    DomAdapter.prototype.onAndCancel = function (el, evt, listener) { throw _abstract(); };
    DomAdapter.prototype.dispatchEvent = function (el, evt) { throw _abstract(); };
    DomAdapter.prototype.createMouseEvent = function (eventType) { throw _abstract(); };
    DomAdapter.prototype.createEvent = function (eventType) { throw _abstract(); };
    DomAdapter.prototype.preventDefault = function (evt) { throw _abstract(); };
    DomAdapter.prototype.getInnerHTML = function (el) { throw _abstract(); };
    DomAdapter.prototype.getOuterHTML = function (el) { throw _abstract(); };
    DomAdapter.prototype.nodeName = function (node) { throw _abstract(); };
    DomAdapter.prototype.nodeValue = function (node) { throw _abstract(); };
    DomAdapter.prototype.type = function (node) { throw _abstract(); };
    DomAdapter.prototype.content = function (node) { throw _abstract(); };
    DomAdapter.prototype.firstChild = function (el) { throw _abstract(); };
    DomAdapter.prototype.nextSibling = function (el) { throw _abstract(); };
    DomAdapter.prototype.parentElement = function (el) { throw _abstract(); };
    DomAdapter.prototype.childNodes = function (el) { throw _abstract(); };
    DomAdapter.prototype.childNodesAsList = function (el) { throw _abstract(); };
    DomAdapter.prototype.clearNodes = function (el) { throw _abstract(); };
    DomAdapter.prototype.appendChild = function (el, node) { throw _abstract(); };
    DomAdapter.prototype.removeChild = function (el, node) { throw _abstract(); };
    DomAdapter.prototype.replaceChild = function (el, newNode, oldNode) { throw _abstract(); };
    DomAdapter.prototype.remove = function (el) { throw _abstract(); };
    DomAdapter.prototype.insertBefore = function (el, node) { throw _abstract(); };
    DomAdapter.prototype.insertAllBefore = function (el, nodes) { throw _abstract(); };
    DomAdapter.prototype.insertAfter = function (el, node) { throw _abstract(); };
    DomAdapter.prototype.setInnerHTML = function (el, value) { throw _abstract(); };
    DomAdapter.prototype.getText = function (el) { throw _abstract(); };
    DomAdapter.prototype.setText = function (el, value) { throw _abstract(); };
    DomAdapter.prototype.getValue = function (el) { throw _abstract(); };
    DomAdapter.prototype.setValue = function (el, value) { throw _abstract(); };
    DomAdapter.prototype.getChecked = function (el) { throw _abstract(); };
    DomAdapter.prototype.setChecked = function (el, value) { throw _abstract(); };
    DomAdapter.prototype.createTemplate = function (html) { throw _abstract(); };
    DomAdapter.prototype.createElement = function (tagName, doc) {
        if (doc === void 0) { doc = null; }
        throw _abstract();
    };
    DomAdapter.prototype.createTextNode = function (text, doc) {
        if (doc === void 0) { doc = null; }
        throw _abstract();
    };
    DomAdapter.prototype.createScriptTag = function (attrName, attrValue, doc) {
        if (doc === void 0) { doc = null; }
        throw _abstract();
    };
    DomAdapter.prototype.createStyleElement = function (css, doc) {
        if (doc === void 0) { doc = null; }
        throw _abstract();
    };
    DomAdapter.prototype.createShadowRoot = function (el) { throw _abstract(); };
    DomAdapter.prototype.getShadowRoot = function (el) { throw _abstract(); };
    DomAdapter.prototype.getHost = function (el) { throw _abstract(); };
    DomAdapter.prototype.getDistributedNodes = function (el) { throw _abstract(); };
    DomAdapter.prototype.clone = function (node) { throw _abstract(); };
    DomAdapter.prototype.hasProperty = function (element, name) { throw _abstract(); };
    DomAdapter.prototype.getElementsByClassName = function (element, name) { throw _abstract(); };
    DomAdapter.prototype.getElementsByTagName = function (element, name) { throw _abstract(); };
    DomAdapter.prototype.classList = function (element) { throw _abstract(); };
    DomAdapter.prototype.addClass = function (element, classname) { throw _abstract(); };
    DomAdapter.prototype.removeClass = function (element, classname) { throw _abstract(); };
    DomAdapter.prototype.hasClass = function (element, classname) { throw _abstract(); };
    DomAdapter.prototype.setStyle = function (element, stylename, stylevalue) { throw _abstract(); };
    DomAdapter.prototype.removeStyle = function (element, stylename) { throw _abstract(); };
    DomAdapter.prototype.getStyle = function (element, stylename) { throw _abstract(); };
    DomAdapter.prototype.tagName = function (element) { throw _abstract(); };
    DomAdapter.prototype.attributeMap = function (element) { throw _abstract(); };
    DomAdapter.prototype.hasAttribute = function (element, attribute) { throw _abstract(); };
    DomAdapter.prototype.getAttribute = function (element, attribute) { throw _abstract(); };
    DomAdapter.prototype.setAttribute = function (element, name, value) { throw _abstract(); };
    DomAdapter.prototype.removeAttribute = function (element, attribute) { throw _abstract(); };
    DomAdapter.prototype.templateAwareRoot = function (el) { throw _abstract(); };
    DomAdapter.prototype.createHtmlDocument = function () { throw _abstract(); };
    DomAdapter.prototype.defaultDoc = function () { throw _abstract(); };
    DomAdapter.prototype.getBoundingClientRect = function (el) { throw _abstract(); };
    DomAdapter.prototype.getTitle = function () { throw _abstract(); };
    DomAdapter.prototype.setTitle = function (newTitle) { throw _abstract(); };
    DomAdapter.prototype.elementMatches = function (n, selector) { throw _abstract(); };
    DomAdapter.prototype.isTemplateElement = function (el) { throw _abstract(); };
    DomAdapter.prototype.isTextNode = function (node) { throw _abstract(); };
    DomAdapter.prototype.isCommentNode = function (node) { throw _abstract(); };
    DomAdapter.prototype.isElementNode = function (node) { throw _abstract(); };
    DomAdapter.prototype.hasShadowRoot = function (node) { throw _abstract(); };
    DomAdapter.prototype.isShadowRoot = function (node) { throw _abstract(); };
    DomAdapter.prototype.importIntoDoc = function (node) { throw _abstract(); };
    DomAdapter.prototype.isPageRule = function (rule) { throw _abstract(); };
    DomAdapter.prototype.isStyleRule = function (rule) { throw _abstract(); };
    DomAdapter.prototype.isMediaRule = function (rule) { throw _abstract(); };
    DomAdapter.prototype.isKeyframesRule = function (rule) { throw _abstract(); };
    DomAdapter.prototype.getHref = function (element) { throw _abstract(); };
    DomAdapter.prototype.getEventKey = function (event) { throw _abstract(); };
    DomAdapter.prototype.resolveAndSetHref = function (element, baseUrl, href) { throw _abstract(); };
    DomAdapter.prototype.cssToRules = function (css) { throw _abstract(); };
    DomAdapter.prototype.supportsDOMEvents = function () { throw _abstract(); };
    DomAdapter.prototype.supportsNativeShadowDOM = function () { throw _abstract(); };
    DomAdapter.prototype.getGlobalEventTarget = function (target) { throw _abstract(); };
    DomAdapter.prototype.getHistory = function () { throw _abstract(); };
    DomAdapter.prototype.getLocation = function () { throw _abstract(); };
    DomAdapter.prototype.getBaseHref = function () { throw _abstract(); };
    DomAdapter.prototype.getUserAgent = function () { throw _abstract(); };
    DomAdapter.prototype.setData = function (element, name, value) { throw _abstract(); };
    DomAdapter.prototype.getData = function (element, name) { throw _abstract(); };
    DomAdapter.prototype.setGlobalVar = function (name, value) { throw _abstract(); };
    return DomAdapter;
})();
exports.DomAdapter = DomAdapter;
exports.__esModule = true;
//# sourceMappingURL=dom_adapter.js.map