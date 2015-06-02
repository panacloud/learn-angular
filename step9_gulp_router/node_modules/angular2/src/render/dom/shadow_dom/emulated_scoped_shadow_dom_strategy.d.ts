import { StyleInliner } from 'angular2/src/render/dom/shadow_dom/style_inliner';
import { StyleUrlResolver } from 'angular2/src/render/dom/shadow_dom/style_url_resolver';
import { EmulatedUnscopedShadowDomStrategy } from './emulated_unscoped_shadow_dom_strategy';
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
export declare class EmulatedScopedShadowDomStrategy extends EmulatedUnscopedShadowDomStrategy {
    styleInliner: StyleInliner;
    constructor(styleInliner: StyleInliner, styleUrlResolver: StyleUrlResolver, styleHost: any);
    processStyleElement(hostComponentId: string, templateUrl: string, styleEl: any): Promise<any>;
    processElement(hostComponentId: string, elementComponentId: string, element: any): void;
}
export declare var __esModule: boolean;
