var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var lang_1 = require('angular2/src/facade/lang');
var view_1 = require('angular2/src/render/dom/view/view');
/**
 * @exportedAs angular2/view
 */
var ElementRef = (function () {
    function ElementRef(parentView, boundElementIndex) {
        this.parentView = parentView;
        this.boundElementIndex = boundElementIndex;
    }
    Object.defineProperty(ElementRef.prototype, "domElement", {
        /**
         * Exposes the underlying DOM element.
         * (DEPRECATED way of accessing the DOM, replacement coming)
         */
        // TODO(tbosch): Here we expose the real DOM element.
        // We need a more general way to read/write to the DOM element
        // via a proper abstraction in the render layer
        get: function () {
            return view_1.resolveInternalDomView(this.parentView.render).boundElements[this.boundElementIndex];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets an attribute from the underlying DOM element.
     * (DEPRECATED way of accessing the DOM, replacement coming)
     */
    // TODO(tbosch): Here we expose the real DOM element.
    // We need a more general way to read/write to the DOM element
    // via a proper abstraction in the render layer
    ElementRef.prototype.getAttribute = function (name) {
        return lang_1.normalizeBlank(dom_adapter_1.DOM.getAttribute(this.domElement, name));
    };
    return ElementRef;
})();
exports.ElementRef = ElementRef;
exports.__esModule = true;
//# sourceMappingURL=element_ref.js.map