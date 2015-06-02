import * as viewModule from '../view/view';
import { LightDom } from './light_dom';
import { ShadowDomStrategy } from './shadow_dom_strategy';
import { StyleUrlResolver } from './style_url_resolver';
/**
 * This strategy emulates the Shadow DOM for the templates, styles **excluded**:
 * - components templates are added as children of their component element,
 * - styles are moved from the templates to the styleHost (i.e. the document head).
 *
 * Notes:
 * - styles are **not** scoped to their component and will apply to the whole document,
 * - you can **not** use shadow DOM specific selectors in the styles
 */
export declare class EmulatedUnscopedShadowDomStrategy extends ShadowDomStrategy {
    styleUrlResolver: StyleUrlResolver;
    styleHost: any;
    constructor(styleUrlResolver: StyleUrlResolver, styleHost: any);
    hasNativeContentElement(): boolean;
    prepareShadowRoot(el: any): any;
    constructLightDom(lightDomView: viewModule.DomView, el: any): LightDom;
    processStyleElement(hostComponentId: string, templateUrl: string, styleEl: any): Promise<any>;
}
