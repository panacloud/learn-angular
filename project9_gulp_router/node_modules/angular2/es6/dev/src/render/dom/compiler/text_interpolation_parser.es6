import { isPresent } from 'angular2/src/facade/lang';
import { DOM } from 'angular2/src/dom/dom_adapter';
/**
 * Parses interpolations in direct text child nodes of the current element.
 */
export class TextInterpolationParser {
    constructor(parser) {
        this._parser = parser;
    }
    process(parent, current, control) {
        if (!current.compileChildren) {
            return;
        }
        var element = current.element;
        var childNodes = DOM.childNodes(DOM.templateAwareRoot(element));
        for (var i = 0; i < childNodes.length; i++) {
            var node = childNodes[i];
            if (DOM.isTextNode(node)) {
                var text = DOM.nodeValue(node);
                var expr = this._parser.parseInterpolation(text, current.elementDescription);
                if (isPresent(expr)) {
                    DOM.setText(node, ' ');
                    current.bindElement().bindText(i, expr);
                }
            }
        }
    }
}
//# sourceMappingURL=text_interpolation_parser.js.map