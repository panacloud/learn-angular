var lang_1 = require('angular2/src/facade/lang');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
/**
 * Parses interpolations in direct text child nodes of the current element.
 */
var TextInterpolationParser = (function () {
    function TextInterpolationParser(parser) {
        this._parser = parser;
    }
    TextInterpolationParser.prototype.process = function (parent, current, control) {
        if (!current.compileChildren) {
            return;
        }
        var element = current.element;
        var childNodes = dom_adapter_1.DOM.childNodes(dom_adapter_1.DOM.templateAwareRoot(element));
        for (var i = 0; i < childNodes.length; i++) {
            var node = childNodes[i];
            if (dom_adapter_1.DOM.isTextNode(node)) {
                var text = dom_adapter_1.DOM.nodeValue(node);
                var expr = this._parser.parseInterpolation(text, current.elementDescription);
                if (lang_1.isPresent(expr)) {
                    dom_adapter_1.DOM.setText(node, ' ');
                    current.bindElement().bindText(i, expr);
                }
            }
        }
    };
    return TextInterpolationParser;
})();
exports.TextInterpolationParser = TextInterpolationParser;
exports.__esModule = true;
//# sourceMappingURL=text_interpolation_parser.js.map