var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var dom_adapter_1 = require('./dom_adapter');
/**
 * Provides DOM operations in any browser environment.
 */
var GenericBrowserDomAdapter = (function (_super) {
    __extends(GenericBrowserDomAdapter, _super);
    function GenericBrowserDomAdapter() {
        _super.apply(this, arguments);
    }
    GenericBrowserDomAdapter.prototype.getDistributedNodes = function (el) { return el.getDistributedNodes(); };
    GenericBrowserDomAdapter.prototype.resolveAndSetHref = function (el, baseUrl, href) {
        el.href = href == null ? baseUrl : baseUrl + '/../' + href;
    };
    GenericBrowserDomAdapter.prototype.cssToRules = function (css) {
        var style = this.createStyleElement(css);
        this.appendChild(this.defaultDoc().head, style);
        var rules = collection_1.ListWrapper.create();
        if (lang_1.isPresent(style.sheet)) {
            // TODO(sorvell): Firefox throws when accessing the rules of a stylesheet
            // with an @import
            // https://bugzilla.mozilla.org/show_bug.cgi?id=625013
            try {
                var rawRules = style.sheet.cssRules;
                rules = collection_1.ListWrapper.createFixedSize(rawRules.length);
                for (var i = 0; i < rawRules.length; i++) {
                    rules[i] = rawRules[i];
                }
            }
            catch (e) {
            }
        }
        else {
        }
        this.remove(style);
        return rules;
    };
    GenericBrowserDomAdapter.prototype.supportsDOMEvents = function () { return true; };
    GenericBrowserDomAdapter.prototype.supportsNativeShadowDOM = function () { return lang_1.isFunction(this.defaultDoc().body.createShadowRoot); };
    return GenericBrowserDomAdapter;
})(dom_adapter_1.DomAdapter);
exports.GenericBrowserDomAdapter = GenericBrowserDomAdapter;
exports.__esModule = true;
//# sourceMappingURL=generic_browser_adapter.js.map