import { ListWrapper } from 'angular2/src/facade/collection';
import { isPresent, isFunction } from 'angular2/src/facade/lang';
import { DomAdapter } from './dom_adapter';
/**
 * Provides DOM operations in any browser environment.
 */
export class GenericBrowserDomAdapter extends DomAdapter {
    getDistributedNodes(el) { return el.getDistributedNodes(); }
    resolveAndSetHref(el, baseUrl, href) {
        el.href = href == null ? baseUrl : baseUrl + '/../' + href;
    }
    cssToRules(css) {
        var style = this.createStyleElement(css);
        this.appendChild(this.defaultDoc().head, style);
        var rules = ListWrapper.create();
        if (isPresent(style.sheet)) {
            // TODO(sorvell): Firefox throws when accessing the rules of a stylesheet
            // with an @import
            // https://bugzilla.mozilla.org/show_bug.cgi?id=625013
            try {
                var rawRules = style.sheet.cssRules;
                rules = ListWrapper.createFixedSize(rawRules.length);
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
    }
    supportsDOMEvents() { return true; }
    supportsNativeShadowDOM() { return isFunction(this.defaultDoc().body.createShadowRoot); }
}
//# sourceMappingURL=generic_browser_adapter.js.map