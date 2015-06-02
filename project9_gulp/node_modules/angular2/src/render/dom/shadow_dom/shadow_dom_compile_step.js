var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var async_1 = require('angular2/src/facade/async');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var ShadowDomCompileStep = (function () {
    function ShadowDomCompileStep(shadowDomStrategy, template, subTaskPromises) {
        this._shadowDomStrategy = shadowDomStrategy;
        this._template = template;
        this._subTaskPromises = subTaskPromises;
    }
    ShadowDomCompileStep.prototype.process = function (parent, current, control) {
        var tagName = dom_adapter_1.DOM.tagName(current.element).toUpperCase();
        if (tagName == 'STYLE') {
            this._processStyleElement(current, control);
        }
        else if (tagName == 'CONTENT') {
            this._processContentElement(current);
        }
        else {
            var componentId = current.isBound() ? current.inheritedElementBinder.componentId : null;
            this._shadowDomStrategy.processElement(this._template.componentId, componentId, current.element);
        }
    };
    ShadowDomCompileStep.prototype._processStyleElement = function (current, control) {
        var stylePromise = this._shadowDomStrategy.processStyleElement(this._template.componentId, this._template.absUrl, current.element);
        if (lang_1.isPresent(stylePromise) && async_1.PromiseWrapper.isPromise(stylePromise)) {
            collection_1.ListWrapper.push(this._subTaskPromises, stylePromise);
        }
        // Style elements should not be further processed by the compiler, as they can not contain
        // bindings. Skipping further compiler steps allow speeding up the compilation process.
        control.ignoreCurrentElement();
    };
    ShadowDomCompileStep.prototype._processContentElement = function (current) {
        if (this._shadowDomStrategy.hasNativeContentElement()) {
            return;
        }
        var attrs = current.attrs();
        var selector = collection_1.MapWrapper.get(attrs, 'select');
        selector = lang_1.isPresent(selector) ? selector : '';
        var contentStart = dom_adapter_1.DOM.createScriptTag('type', 'ng/contentStart');
        if (lang_1.assertionsEnabled()) {
            dom_adapter_1.DOM.setAttribute(contentStart, 'select', selector);
        }
        var contentEnd = dom_adapter_1.DOM.createScriptTag('type', 'ng/contentEnd');
        dom_adapter_1.DOM.insertBefore(current.element, contentStart);
        dom_adapter_1.DOM.insertBefore(current.element, contentEnd);
        dom_adapter_1.DOM.remove(current.element);
        current.element = contentStart;
        current.bindElement().setContentTagSelector(selector);
    };
    return ShadowDomCompileStep;
})();
exports.ShadowDomCompileStep = ShadowDomCompileStep;
exports.__esModule = true;
//# sourceMappingURL=shadow_dom_compile_step.js.map