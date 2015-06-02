import { DomAdapter } from './dom_adapter';
/**
 * Provides DOM operations in any browser environment.
 */
export declare class GenericBrowserDomAdapter extends DomAdapter {
    getDistributedNodes(el: any): any;
    resolveAndSetHref(el: any, baseUrl: string, href: string): void;
    cssToRules(css: string): List<any>;
    supportsDOMEvents(): boolean;
    supportsNativeShadowDOM(): boolean;
}
export declare var __esModule: boolean;
