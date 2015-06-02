var ShadowDomStrategy = (function () {
    function ShadowDomStrategy() {
    }
    ShadowDomStrategy.prototype.hasNativeContentElement = function () { return true; };
    /**
     * Prepares and returns the shadow root for the given element.
     */
    ShadowDomStrategy.prototype.prepareShadowRoot = function (el) { return null; };
    ShadowDomStrategy.prototype.constructLightDom = function (lightDomView, el) { return null; };
    /**
     * An optional step that can modify the template style elements.
     */
    ShadowDomStrategy.prototype.processStyleElement = function (hostComponentId, templateUrl, styleElement) {
        return null;
    };
    ;
    /**
     * An optional step that can modify the template elements (style elements exlcuded).
     */
    ShadowDomStrategy.prototype.processElement = function (hostComponentId, elementComponentId, element) { };
    return ShadowDomStrategy;
})();
exports.ShadowDomStrategy = ShadowDomStrategy;
exports.__esModule = true;
//# sourceMappingURL=shadow_dom_strategy.js.map