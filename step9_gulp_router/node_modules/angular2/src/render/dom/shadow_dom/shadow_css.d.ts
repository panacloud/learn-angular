/**
 * This file is a port of shadowCSS from webcomponents.js to AtScript.
 *
 * Please make sure to keep to edits in sync with the source file.
 *
 * Source:
 * https://github.com/webcomponents/webcomponentsjs/blob/4efecd7e0e/src/ShadowCSS/ShadowCSS.js
 *
 * The original file level comment is reproduced below
 */
export declare class ShadowCss {
    strictStyling: boolean;
    constructor();
    shimStyle(style: any, selector: string, hostSelector?: string): string;
    shimCssText(cssText: string, selector: string, hostSelector?: string): string;
    _insertDirectives(cssText: string): string;
    _insertPolyfillDirectivesInCssText(cssText: string): string;
    _insertPolyfillRulesInCssText(cssText: string): string;
    _scopeCssText(cssText: string, scopeSelector: string, hostSelector: string): string;
    _extractUnscopedRulesFromCssText(cssText: string): string;
    _convertColonHost(cssText: string): string;
    _convertColonHostContext(cssText: string): string;
    _convertColonRule(cssText: string, regExp: RegExp, partReplacer: Function): string;
    _colonHostContextPartReplacer(host: string, part: string, suffix: string): string;
    _colonHostPartReplacer(host: string, part: string, suffix: string): string;
    _convertShadowDOMSelectors(cssText: string): string;
    _scopeRules(cssRules: any, scopeSelector: string, hostSelector: string): string;
    _ieSafeCssTextFromKeyFrameRule(rule: any): string;
    _scopeSelector(selector: string, scopeSelector: string, hostSelector: string, strict: boolean): string;
    _selectorNeedsScoping(selector: string, scopeSelector: string): boolean;
    _makeScopeMatcher(scopeSelector: string): RegExp;
    _applySelectorScope(selector: string, scopeSelector: string, hostSelector: string): string;
    _applySimpleSelectorScope(selector: string, scopeSelector: string, hostSelector: string): string;
    _applyStrictSelectorScope(selector: string, scopeSelector: string): string;
    _insertPolyfillHostInCssText(selector: string): string;
    _propertiesFromRule(rule: any): string;
}
export declare var __esModule: boolean;
