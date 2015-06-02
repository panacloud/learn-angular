var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var ContentStrategy = (function () {
    function ContentStrategy() {
    }
    ContentStrategy.prototype.insert = function (nodes) { };
    return ContentStrategy;
})();
/**
 * An implementation of the content tag that is used by transcluding components.
 * It is used when the content tag is not a direct child of another component,
 * and thus does not affect redistribution.
 */
var RenderedContent = (function (_super) {
    __extends(RenderedContent, _super);
    function RenderedContent(contentEl) {
        _super.call(this);
        this.beginScript = contentEl;
        this.endScript = dom_adapter_1.DOM.nextSibling(this.beginScript);
        this.nodes = [];
    }
    // Inserts the nodes in between the start and end scripts.
    // Previous content is removed.
    RenderedContent.prototype.insert = function (nodes) {
        this.nodes = nodes;
        dom_adapter_1.DOM.insertAllBefore(this.endScript, nodes);
        this._removeNodesUntil(collection_1.ListWrapper.isEmpty(nodes) ? this.endScript : nodes[0]);
    };
    RenderedContent.prototype._removeNodesUntil = function (node) {
        var p = dom_adapter_1.DOM.parentElement(this.beginScript);
        for (var next = dom_adapter_1.DOM.nextSibling(this.beginScript); next !== node; next = dom_adapter_1.DOM.nextSibling(this.beginScript)) {
            dom_adapter_1.DOM.removeChild(p, next);
        }
    };
    return RenderedContent;
})(ContentStrategy);
/**
 * An implementation of the content tag that is used by transcluding components.
 * It is used when the content tag is a direct child of another component,
 * and thus does not get rendered but only affect the distribution of its parent component.
 */
var IntermediateContent = (function (_super) {
    __extends(IntermediateContent, _super);
    function IntermediateContent(destinationLightDom) {
        _super.call(this);
        this.nodes = [];
        this.destinationLightDom = destinationLightDom;
    }
    IntermediateContent.prototype.insert = function (nodes) {
        this.nodes = nodes;
        this.destinationLightDom.redistribute();
    };
    return IntermediateContent;
})(ContentStrategy);
var Content = (function () {
    function Content(contentStartEl, selector) {
        this.select = selector;
        this.contentStartElement = contentStartEl;
        this._strategy = null;
    }
    Content.prototype.init = function (destinationLightDom) {
        this._strategy = lang_1.isPresent(destinationLightDom) ? new IntermediateContent(destinationLightDom) :
            new RenderedContent(this.contentStartElement);
    };
    Content.prototype.nodes = function () { return this._strategy.nodes; };
    Content.prototype.insert = function (nodes) { this._strategy.insert(nodes); };
    return Content;
})();
exports.Content = Content;
exports.__esModule = true;
//# sourceMappingURL=content_tag.js.map