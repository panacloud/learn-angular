var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var light_dom_1 = require('./light_dom');
var shadow_dom_strategy_1 = require('./shadow_dom_strategy');
var util_1 = require('./util');
/**
 * This strategy emulates the Shadow DOM for the templates, styles **excluded**:
 * - components templates are added as children of their component element,
 * - styles are moved from the templates to the styleHost (i.e. the document head).
 *
 * Notes:
 * - styles are **not** scoped to their component and will apply to the whole document,
 * - you can **not** use shadow DOM specific selectors in the styles
 */
var EmulatedUnscopedShadowDomStrategy = (function (_super) {
    __extends(EmulatedUnscopedShadowDomStrategy, _super);
    function EmulatedUnscopedShadowDomStrategy(styleUrlResolver, styleHost) {
        _super.call(this);
        this.styleUrlResolver = styleUrlResolver;
        this.styleHost = styleHost;
    }
    EmulatedUnscopedShadowDomStrategy.prototype.hasNativeContentElement = function () { return false; };
    EmulatedUnscopedShadowDomStrategy.prototype.prepareShadowRoot = function (el) { return el; };
    EmulatedUnscopedShadowDomStrategy.prototype.constructLightDom = function (lightDomView, el) {
        return new light_dom_1.LightDom(lightDomView, el);
    };
    EmulatedUnscopedShadowDomStrategy.prototype.processStyleElement = function (hostComponentId, templateUrl, styleEl) {
        var cssText = dom_adapter_1.DOM.getText(styleEl);
        cssText = this.styleUrlResolver.resolveUrls(cssText, templateUrl);
        dom_adapter_1.DOM.setText(styleEl, cssText);
        dom_adapter_1.DOM.remove(styleEl);
        util_1.insertSharedStyleText(cssText, this.styleHost, styleEl);
        return null;
    };
    return EmulatedUnscopedShadowDomStrategy;
})(shadow_dom_strategy_1.ShadowDomStrategy);
exports.EmulatedUnscopedShadowDomStrategy = EmulatedUnscopedShadowDomStrategy;
exports.__esModule = true;
//# sourceMappingURL=emulated_unscoped_shadow_dom_strategy.js.map