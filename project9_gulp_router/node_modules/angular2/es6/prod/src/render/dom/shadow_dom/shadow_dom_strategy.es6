export class ShadowDomStrategy {
    hasNativeContentElement() { return true; }
    /**
     * Prepares and returns the shadow root for the given element.
     */
    prepareShadowRoot(el) { return null; }
    constructLightDom(lightDomView, el) { return null; }
    /**
     * An optional step that can modify the template style elements.
     */
    processStyleElement(hostComponentId, templateUrl, styleElement) {
        return null;
    }
    ;
    /**
     * An optional step that can modify the template elements (style elements exlcuded).
     */
    processElement(hostComponentId, elementComponentId, element) { }
}
//# sourceMappingURL=shadow_dom_strategy.js.map