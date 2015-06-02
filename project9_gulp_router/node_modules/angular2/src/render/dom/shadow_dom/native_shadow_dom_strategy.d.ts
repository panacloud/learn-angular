import { StyleUrlResolver } from './style_url_resolver';
import { ShadowDomStrategy } from './shadow_dom_strategy';
/**
 * This strategies uses the native Shadow DOM support.
 *
 * The templates for the component are inserted in a Shadow Root created on the component element.
 * Hence they are strictly isolated.
 */
export declare class NativeShadowDomStrategy extends ShadowDomStrategy {
    styleUrlResolver: StyleUrlResolver;
    constructor(styleUrlResolver: StyleUrlResolver);
    prepareShadowRoot(el: any): any;
    processStyleElement(hostComponentId: string, templateUrl: string, styleEl: any): Promise<any>;
}
export declare var __esModule: boolean;
