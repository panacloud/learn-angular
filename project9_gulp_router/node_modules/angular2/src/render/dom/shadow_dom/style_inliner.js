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
var xhr_1 = require('angular2/src/services/xhr');
var collection_1 = require('angular2/src/facade/collection');
var url_resolver_1 = require('angular2/src/services/url_resolver');
var style_url_resolver_1 = require('./style_url_resolver');
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
/**
 * Inline @import rules in the given CSS.
 *
 * When an @import rules is inlined, it's url are rewritten.
 */
var StyleInliner = (function () {
    function StyleInliner(xhr, styleUrlResolver, urlResolver) {
        this._xhr = xhr;
        this._urlResolver = urlResolver;
        this._styleUrlResolver = styleUrlResolver;
    }
    /**
     * Inline the @imports rules in the given CSS text.
     *
     * The baseUrl is required to rewrite URLs in the inlined content.
     *
     * @param {string} cssText
     * @param {string} baseUrl
     * @returns {*} a Promise<string> when @import rules are present, a string otherwise
     */
    StyleInliner.prototype.inlineImports = function (cssText, baseUrl) {
        return this._inlineImports(cssText, baseUrl, []);
    };
    StyleInliner.prototype._inlineImports = function (cssText, baseUrl, inlinedUrls) {
        var _this = this;
        var partIndex = 0;
        var parts = lang_1.StringWrapper.split(cssText, _importRe);
        if (parts.length === 1) {
            // no @import rule found, return the original css
            return cssText;
        }
        var promises = [];
        while (partIndex < parts.length - 1) {
            // prefix is the content before the @import rule
            var prefix = parts[partIndex];
            // rule is the parameter of the @import rule
            var rule = parts[partIndex + 1];
            var url = _extractUrl(rule);
            if (lang_1.isPresent(url)) {
                url = this._urlResolver.resolve(baseUrl, url);
            }
            var mediaQuery = _extractMediaQuery(rule);
            var promise;
            if (lang_1.isBlank(url)) {
                promise = async_1.PromiseWrapper.resolve("/* Invalid import rule: \"@import " + rule + ";\" */");
            }
            else if (collection_1.ListWrapper.contains(inlinedUrls, url)) {
                // The current import rule has already been inlined, return the prefix only
                // Importing again might cause a circular dependency
                promise = async_1.PromiseWrapper.resolve(prefix);
            }
            else {
                collection_1.ListWrapper.push(inlinedUrls, url);
                promise = async_1.PromiseWrapper.then(this._xhr.get(url), function (rawCss) {
                    // resolve nested @import rules
                    var inlinedCss = _this._inlineImports(rawCss, url, inlinedUrls);
                    if (async_1.PromiseWrapper.isPromise(inlinedCss)) {
                        // wait until nested @import are inlined
                        return inlinedCss
                            .then(function (css) {
                            return prefix + _this._transformImportedCss(css, mediaQuery, url) +
                                '\n';
                        });
                    }
                    else {
                        // there are no nested @import, return the css
                        return prefix + _this._transformImportedCss(inlinedCss, mediaQuery, url) + '\n';
                    }
                }, function (error) { return ("/* failed to import " + url + " */\n"); });
            }
            collection_1.ListWrapper.push(promises, promise);
            partIndex += 2;
        }
        return async_1.PromiseWrapper.all(promises).then(function (cssParts) {
            var cssText = cssParts.join('');
            if (partIndex < parts.length) {
                // append then content located after the last @import rule
                cssText += parts[partIndex];
            }
            return cssText;
        });
    };
    StyleInliner.prototype._transformImportedCss = function (css, mediaQuery, url) {
        css = this._styleUrlResolver.resolveUrls(css, url);
        return _wrapInMediaRule(css, mediaQuery);
    };
    StyleInliner = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [xhr_1.XHR, style_url_resolver_1.StyleUrlResolver, url_resolver_1.UrlResolver])
    ], StyleInliner);
    return StyleInliner;
})();
exports.StyleInliner = StyleInliner;
// Extracts the url from an import rule, supported formats:
// - 'url' / "url",
// - url(url) / url('url') / url("url")
function _extractUrl(importRule) {
    var match = lang_1.RegExpWrapper.firstMatch(_urlRe, importRule);
    if (lang_1.isBlank(match))
        return null;
    return lang_1.isPresent(match[1]) ? match[1] : match[2];
}
// Extracts the media query from an import rule.
// Returns null when there is no media query.
function _extractMediaQuery(importRule) {
    var match = lang_1.RegExpWrapper.firstMatch(_mediaQueryRe, importRule);
    if (lang_1.isBlank(match))
        return null;
    var mediaQuery = match[1].trim();
    return (mediaQuery.length > 0) ? mediaQuery : null;
}
// Wraps the css in a media rule when the media query is not null
function _wrapInMediaRule(css, query) {
    return (lang_1.isBlank(query)) ? css : "@media " + query + " {\n" + css + "\n}";
}
var _importRe = lang_1.RegExpWrapper.create('@import\\s+([^;]+);');
var _urlRe = lang_1.RegExpWrapper.create('url\\(\\s*?[\'"]?([^\'")]+)[\'"]?|' +
    '[\'"]([^\'")]+)[\'"]' // "url" or 'url'
);
var _mediaQueryRe = lang_1.RegExpWrapper.create('[\'"][^\'"]+[\'"]\\s*\\)?\\s*(.*)');
exports.__esModule = true;
//# sourceMappingURL=style_inliner.js.map