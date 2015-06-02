/**
 * A css selector contains an element name,
 * css classes and attribute/value pairs with the purpose
 * of selecting subsets out of them.
 */
export declare class CssSelector {
    element: string;
    classNames: List<string>;
    attrs: List<string>;
    notSelector: CssSelector;
    static parse(selector: string): List<CssSelector>;
    constructor();
    isElementSelector(): boolean;
    setElement(element?: string): void;
    addAttribute(name: string, value?: string): void;
    addClassName(name: string): void;
    toString(): string;
}
/**
 * Reads a list of CssSelectors and allows to calculate which ones
 * are contained in a given CssSelector.
 */
export declare class SelectorMatcher {
    static createNotMatcher(notSelector: CssSelector): SelectorMatcher;
    private _elementMap;
    private _elementPartialMap;
    private _classMap;
    private _classPartialMap;
    private _attrValueMap;
    private _attrValuePartialMap;
    private _listContexts;
    constructor();
    addSelectables(cssSelectors: List<CssSelector>, callbackCtxt: any): void;
    /**
     * Add an object that can be found later on by calling `match`.
     * @param cssSelector A css selector
     * @param callbackCtxt An opaque object that will be given to the callback of the `match` function
     */
    private _addSelectable(cssSelector, callbackCtxt, listContext);
    private _addTerminal(map, name, selectable);
    private _addPartial(map, name);
    /**
     * Find the objects that have been added via `addSelectable`
     * whose css selector is contained in the given css selector.
     * @param cssSelector A css selector
     * @param matchedCallback This callback will be called with the object handed into `addSelectable`
     * @return boolean true if a match was found
    */
    match(cssSelector: CssSelector, matchedCallback: any): boolean;
    _matchTerminal(map: Map<string, List<string>>, name: any, cssSelector: CssSelector, matchedCallback: any): boolean;
    _matchPartial(map: Map<string, SelectorMatcher>, name: any, cssSelector: CssSelector, matchedCallback: any): boolean;
}
export declare var __esModule: boolean;
