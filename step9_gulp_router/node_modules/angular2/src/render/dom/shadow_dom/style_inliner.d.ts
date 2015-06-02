import { XHR } from 'angular2/src/services/xhr';
import { UrlResolver } from 'angular2/src/services/url_resolver';
import { StyleUrlResolver } from './style_url_resolver';
/**
 * Inline @import rules in the given CSS.
 *
 * When an @import rules is inlined, it's url are rewritten.
 */
export declare class StyleInliner {
    _xhr: XHR;
    _urlResolver: UrlResolver;
    _styleUrlResolver: StyleUrlResolver;
    constructor(xhr: XHR, styleUrlResolver: StyleUrlResolver, urlResolver: UrlResolver);
    /**
     * Inline the @imports rules in the given CSS text.
     *
     * The baseUrl is required to rewrite URLs in the inlined content.
     *
     * @param {string} cssText
     * @param {string} baseUrl
     * @returns {*} a Promise<string> when @import rules are present, a string otherwise
     */
    inlineImports(cssText: string, baseUrl: string): Promise<string> | string;
    _inlineImports(cssText: string, baseUrl: string, inlinedUrls: List<string>): Promise<string> | string;
    _transformImportedCss(css: string, mediaQuery: string, url: string): string;
}
export declare var __esModule: boolean;
