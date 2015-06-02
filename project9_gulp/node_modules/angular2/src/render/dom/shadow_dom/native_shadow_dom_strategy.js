var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var shadow_dom_strategy_1 = require('./shadow_dom_strategy');
/**
 * This strategies uses the native Shadow DOM support.
 *
 * The templates for the component are inserted in a Shadow Root created on the component element.
 * Hence they are strictly isolated.
 */
var NativeShadowDomStrategy = (function (_super) {
    __extends(NativeShadowDomStrategy, _super);
    function NativeShadowDomStrategy(styleUrlResolver) {
        _super.call(this);
        this.styleUrlResolver = styleUrlResolver;
    }
    NativeShadowDomStrategy.prototype.prepareShadowRoot = function (el) { return dom_adapter_1.DOM.createShadowRoot(el); };
    NativeShadowDomStrategy.prototype.processStyleElement = function (hostComponentId, templateUrl, styleEl) {
        var cssText = dom_adapter_1.DOM.getText(styleEl);
        cssText = this.styleUrlResolver.resolveUrls(cssText, templateUrl);
        dom_adapter_1.DOM.setText(styleEl, cssText);
        return null;
    };
    return NativeShadowDomStrategy;
})(shadow_dom_strategy_1.ShadowDomStrategy);
exports.NativeShadowDomStrategy = NativeShadowDomStrategy;
exports.__esModule = true;
//# sourceMappingURL=native_shadow_dom_strategy.js.map