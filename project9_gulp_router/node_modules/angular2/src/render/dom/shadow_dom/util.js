var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var shadow_css_1 = require('./shadow_css');
var _componentUIDs = collection_1.MapWrapper.create();
var _nextComponentUID = 0;
var _sharedStyleTexts = collection_1.MapWrapper.create();
var _lastInsertedStyleEl;
function getComponentId(componentStringId) {
    var id = collection_1.MapWrapper.get(_componentUIDs, componentStringId);
    if (lang_1.isBlank(id)) {
        id = _nextComponentUID++;
        collection_1.MapWrapper.set(_componentUIDs, componentStringId, id);
    }
    return id;
}
exports.getComponentId = getComponentId;
function insertSharedStyleText(cssText, styleHost, styleEl) {
    if (!collection_1.MapWrapper.contains(_sharedStyleTexts, cssText)) {
        // Styles are unscoped and shared across components, only append them to the head
        // when there are not present yet
        collection_1.MapWrapper.set(_sharedStyleTexts, cssText, true);
        insertStyleElement(styleHost, styleEl);
    }
}
exports.insertSharedStyleText = insertSharedStyleText;
function insertStyleElement(host, styleEl) {
    if (lang_1.isBlank(_lastInsertedStyleEl)) {
        var firstChild = dom_adapter_1.DOM.firstChild(host);
        if (lang_1.isPresent(firstChild)) {
            dom_adapter_1.DOM.insertBefore(firstChild, styleEl);
        }
        else {
            dom_adapter_1.DOM.appendChild(host, styleEl);
        }
    }
    else {
        dom_adapter_1.DOM.insertAfter(_lastInsertedStyleEl, styleEl);
    }
    _lastInsertedStyleEl = styleEl;
}
exports.insertStyleElement = insertStyleElement;
// Return the attribute to be added to the component
function getHostAttribute(id) {
    return "_nghost-" + id;
}
exports.getHostAttribute = getHostAttribute;
// Returns the attribute to be added on every single element nodes in the component
function getContentAttribute(id) {
    return "_ngcontent-" + id;
}
exports.getContentAttribute = getContentAttribute;
function shimCssForComponent(cssText, componentId) {
    var id = getComponentId(componentId);
    var shadowCss = new shadow_css_1.ShadowCss();
    return shadowCss.shimCssText(cssText, getContentAttribute(id), getHostAttribute(id));
}
exports.shimCssForComponent = shimCssForComponent;
// Reset the caches - used for tests only
function resetShadowDomCache() {
    collection_1.MapWrapper.clear(_componentUIDs);
    _nextComponentUID = 0;
    collection_1.MapWrapper.clear(_sharedStyleTexts);
    _lastInsertedStyleEl = null;
}
exports.resetShadowDomCache = resetShadowDomCache;
exports.__esModule = true;
//# sourceMappingURL=util.js.map