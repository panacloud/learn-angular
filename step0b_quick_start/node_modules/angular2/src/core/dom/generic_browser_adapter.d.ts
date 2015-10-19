import { Type } from 'angular2/src/core/facade/lang';
import { DomAdapter } from './dom_adapter';
/**
 * Provides DOM operations in any browser environment.
 */
export declare abstract class GenericBrowserDomAdapter extends DomAdapter {
    private _animationPrefix;
    private _transitionEnd;
    constructor();
    getXHR(): Type;
    getDistributedNodes(el: HTMLElement): Node[];
    resolveAndSetHref(el: HTMLAnchorElement, baseUrl: string, href: string): void;
    cssToRules(css: string): any[];
    supportsDOMEvents(): boolean;
    supportsNativeShadowDOM(): boolean;
    supportsUnprefixedCssAnimation(): boolean;
    getAnimationPrefix(): string;
    getTransitionEnd(): string;
    supportsAnimation(): boolean;
}
