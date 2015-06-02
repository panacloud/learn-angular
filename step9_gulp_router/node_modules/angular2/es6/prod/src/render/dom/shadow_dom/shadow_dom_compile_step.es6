import { isPresent, assertionsEnabled } from 'angular2/src/facade/lang';
import { MapWrapper, ListWrapper } from 'angular2/src/facade/collection';
import { PromiseWrapper } from 'angular2/src/facade/async';
import { DOM } from 'angular2/src/dom/dom_adapter';
export class ShadowDomCompileStep {
    constructor(shadowDomStrategy, template, subTaskPromises) {
        this._shadowDomStrategy = shadowDomStrategy;
        this._template = template;
        this._subTaskPromises = subTaskPromises;
    }
    process(parent, current, control) {
        var tagName = DOM.tagName(current.element).toUpperCase();
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
    }
    _processStyleElement(current, control) {
        var stylePromise = this._shadowDomStrategy.processStyleElement(this._template.componentId, this._template.absUrl, current.element);
        if (isPresent(stylePromise) && PromiseWrapper.isPromise(stylePromise)) {
            ListWrapper.push(this._subTaskPromises, stylePromise);
        }
        // Style elements should not be further processed by the compiler, as they can not contain
        // bindings. Skipping further compiler steps allow speeding up the compilation process.
        control.ignoreCurrentElement();
    }
    _processContentElement(current) {
        if (this._shadowDomStrategy.hasNativeContentElement()) {
            return;
        }
        var attrs = current.attrs();
        var selector = MapWrapper.get(attrs, 'select');
        selector = isPresent(selector) ? selector : '';
        var contentStart = DOM.createScriptTag('type', 'ng/contentStart');
        if (assertionsEnabled()) {
            DOM.setAttribute(contentStart, 'select', selector);
        }
        var contentEnd = DOM.createScriptTag('type', 'ng/contentEnd');
        DOM.insertBefore(current.element, contentStart);
        DOM.insertBefore(current.element, contentEnd);
        DOM.remove(current.element);
        current.element = contentStart;
        current.bindElement().setContentTagSelector(selector);
    }
}
//# sourceMappingURL=shadow_dom_compile_step.js.map