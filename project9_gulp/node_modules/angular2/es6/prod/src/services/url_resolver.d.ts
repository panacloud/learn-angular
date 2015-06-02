export declare class UrlResolver {
    static a: any;
    constructor();
    /**
     * Resolves the `url` given the `baseUrl`.
     *
     * ## When the `baseUrl` is null
     *
     * `url` is resolved in the context of the current document.
     * If the document location is 'http://www.foo.com/base' and the `url` is 'path/to/here', the
     * resolved url will be
     * 'http://www.foo.com/base/path/to/here'
     *
     * ## When the `baseUrl` is not null
     *
     * - when the `url` is null, the `baseUrl` is returned,
     * - due to a limitation in the process used to resolve urls (a HTMLLinkElement), `url` must not
     * start with a `/`,
     * - if `url` is relative ('path/to/here', './path/to/here'), the resolved url is a combination of
     * `baseUrl` and `url`,
     * - if `url` is absolute (it has a scheme: 'http://', 'https://'), the `url` is returned
     * (ignoring the `baseUrl`)
     *
     * @param {string} baseUrl
     * @param {string} url
     * @returns {string} the resolved URL
     */
    resolve(baseUrl: string, url: string): string;
}
