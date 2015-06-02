var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var emulated_unscoped_shadow_dom_strategy_1 = require('./emulated_unscoped_shadow_dom_strategy');
var util_1 = require('./util');
/**
 * This strategy emulates the Shadow DOM for the templates, styles **included**:
 * - components templates are added as children of their component element,
 * - both the template and the styles are modified so that styles are scoped to the component
 *   they belong to,
 * - styles are moved from the templates to the styleHost (i.e. the document head).
 *
 * Notes:
 * - styles are scoped to their component and will apply only to it,
 * - a common subset of shadow DOM selectors are supported,
 * - see `ShadowCss` for more information and limitations.
 */
var EmulatedScopedShadowDomStrategy = (function (_super) {
    __extends(EmulatedScopedShadowDomStrategy, _super);
    function EmulatedScopedShadowDomStrategy(styleInliner, styleUrlResolver, styleHost) {
        _super.call(this, styleUrlResolver, styleHost);
        this.styleInliner = styleInliner;
    }
    EmulatedScopedShadowDomStrategy.prototype.processStyleElement = function (hostComponentId, templateUrl, styleEl) {
        var cssText = dom_adapter_1.DOM.getText(styleEl);
        cssText = this.styleUrlResolver.resolveUrls(cssText, templateUrl);
        var inlinedCss = this.styleInliner.inlineImports(cssText, templateUrl);
        if (async_1.PromiseWrapper.isPromise(inlinedCss)) {
            dom_adapter_1.DOM.setText(styleEl, '');
            return inlinedCss
                .then(function (css) {
                css = util_1.shimCssForComponent(css, hostComponentId);
                dom_adapter_1.DOM.setText(styleEl, css);
            });
        }
        else {
            var css = util_1.shimCssForComponent(inlinedCss, hostComponentId);
            dom_adapter_1.DOM.setText(styleEl, css);
            dom_adapter_1.DOM.remove(styleEl);
            util_1.insertStyleElement(this.styleHost, styleEl);
            return null;
        }
    };
    EmulatedScopedShadowDomStrategy.prototype.processElement = function (hostComponentId, elementComponentId, element) {
        // Shim the element as a child of the compiled component
        if (lang_1.isPresent(hostComponentId)) {
            var contentAttribute = util_1.getContentAttribute(util_1.getComponentId(hostComponentId));
            dom_adapter_1.DOM.setAttribute(element, contentAttribute, '');
        }
        // If the current element is also a component, shim it as a host
        if (lang_1.isPresent(elementComponentId)) {
            var hostAttribute = util_1.getHostAttribute(util_1.getComponentId(elementComponentId));
            dom_adapter_1.DOM.setAttribute(element, hostAttribute, '');
        }
    };
    return EmulatedScopedShadowDomStrategy;
})(emulated_unscoped_shadow_dom_strategy_1.EmulatedUnscopedShadowDomStrategy);
exports.EmulatedScopedShadowDomStrategy = EmulatedScopedShadowDomStrategy;
exports.__esModule = true;
//# sourceMappingURL=emulated_scoped_shadow_dom_strategy.js.map