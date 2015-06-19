import { UrlResolver } from 'angular2/src/services/url_resolver';
/**
 * Rewrites URLs by resolving '@import' and 'url()' URLs from the given base URL.
 */
export declare class StyleUrlResolver {
    _resolver: UrlResolver;
    constructor(_resolver: UrlResolver);
    resolveUrls(cssText: string, baseUrl: string): string;
    _replaceUrls(cssText: string, re: RegExp, baseUrl: string): string;
}
