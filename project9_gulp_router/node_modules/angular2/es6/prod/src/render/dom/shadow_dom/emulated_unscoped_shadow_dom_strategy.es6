import { DOM } from 'angular2/src/dom/dom_adapter';
import { LightDom } from './light_dom';
import { ShadowDomStrategy } from './shadow_dom_strategy';
import { insertSharedStyleText } from './util';
/**
 * This strategy emulates the Shadow DOM for the templates, styles **excluded**:
 * - components templates are added as children of their component element,
 * - styles are moved from the templates to the styleHost (i.e. the document head).
 *
 * Notes:
 * - styles are **not** scoped to their component and will apply to the whole document,
 * - you can **not** use shadow DOM specific selectors in the styles
 */
export class EmulatedUnscopedShadowDomStrategy extends ShadowDomStrategy {
    constructor(styleUrlResolver, styleHost) {
        super();
        this.styleUrlResolver = styleUrlResolver;
        this.styleHost = styleHost;
    }
    hasNativeContentElement() { return false; }
    prepareShadowRoot(el) { return el; }
    constructLightDom(lightDomView, el) {
        return new LightDom(lightDomView, el);
    }
    processStyleElement(hostComponentId, templateUrl, styleEl) {
        var cssText = DOM.getText(styleEl);
        cssText = this.styleUrlResolver.resolveUrls(cssText, templateUrl);
        DOM.setText(styleEl, cssText);
        DOM.remove(styleEl);
        insertSharedStyleText(cssText, this.styleHost, styleEl);
        return null;
    }
}
//# sourceMappingURL=emulated_unscoped_shadow_dom_strategy.js.map