var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var di_1 = require('angular2/di');
var lang_1 = require('angular2/src/facade/lang');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var UrlResolver = (function () {
    function UrlResolver() {
        if (lang_1.isBlank(UrlResolver.a)) {
            UrlResolver.a = dom_adapter_1.DOM.createElement('a');
        }
    }
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
    UrlResolver.prototype.resolve = function (baseUrl, url) {
        if (lang_1.isBlank(baseUrl)) {
            dom_adapter_1.DOM.resolveAndSetHref(UrlResolver.a, url, null);
            return dom_adapter_1.DOM.getHref(UrlResolver.a);
        }
        if (lang_1.isBlank(url) || url == '')
            return baseUrl;
        if (url[0] == '/') {
            // The `HTMLLinkElement` does not allow resolving this case (the `url` would be interpreted as
            // relative):
            // - `baseUrl` = 'http://www.foo.com/base'
            // - `url` = '/absolute/path/to/here'
            // - the result would be 'http://www.foo.com/base/absolute/path/to/here' while
            // 'http://www.foo.com/absolute/path/to/here'
            // is expected (without the 'base' segment).
            throw new lang_1.BaseException("Could not resolve the url " + url + " from " + baseUrl);
        }
        var m = lang_1.RegExpWrapper.firstMatch(_schemeRe, url);
        if (lang_1.isPresent(m[1])) {
            return url;
        }
        dom_adapter_1.DOM.resolveAndSetHref(UrlResolver.a, baseUrl, url);
        return dom_adapter_1.DOM.getHref(UrlResolver.a);
    };
    UrlResolver = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UrlResolver);
    return UrlResolver;
})();
exports.UrlResolver = UrlResolver;
var _schemeRe = lang_1.RegExpWrapper.create('^([^:/?#]+:)?');
exports.__esModule = true;
//# sourceMappingURL=url_resolver.js.map