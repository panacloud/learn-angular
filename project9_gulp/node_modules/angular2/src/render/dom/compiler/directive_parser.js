var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var selector_1 = require('angular2/src/render/dom/compiler/selector');
var api_1 = require('../../api');
var util_1 = require('../util');
/**
 * Parses the directives on a single element. Assumes ViewSplitter has already created
 * <template> elements for template directives.
 */
var DirectiveParser = (function () {
    function DirectiveParser(parser, directives) {
        this._parser = parser;
        this._selectorMatcher = new selector_1.SelectorMatcher();
        this._directives = directives;
        for (var i = 0; i < directives.length; i++) {
            var directive = directives[i];
            var selector = selector_1.CssSelector.parse(directive.selector);
            this._ensureComponentOnlyHasElementSelector(selector, directive);
            this._selectorMatcher.addSelectables(selector, i);
        }
    }
    DirectiveParser.prototype._ensureComponentOnlyHasElementSelector = function (selector, directive) {
        var isElementSelector = selector.length === 1 && selector[0].isElementSelector();
        if (!isElementSelector && directive.type === api_1.DirectiveMetadata.COMPONENT_TYPE) {
            throw new lang_1.BaseException("Component '" + directive.id + "' can only have an element selector, but had '" + directive.selector + "'");
        }
    };
    DirectiveParser.prototype.process = function (parent, current, control) {
        var _this = this;
        var attrs = current.attrs();
        var classList = current.classList();
        var cssSelector = new selector_1.CssSelector();
        var nodeName = dom_adapter_1.DOM.nodeName(current.element);
        cssSelector.setElement(nodeName);
        for (var i = 0; i < classList.length; i++) {
            cssSelector.addClassName(classList[i]);
        }
        collection_1.MapWrapper.forEach(attrs, function (attrValue, attrName) { cssSelector.addAttribute(attrName, attrValue); });
        var componentDirective;
        var foundDirectiveIndices = [];
        var elementBinder = null;
        this._selectorMatcher.match(cssSelector, function (selector, directiveIndex) {
            elementBinder = current.bindElement();
            var directive = _this._directives[directiveIndex];
            if (directive.type === api_1.DirectiveMetadata.COMPONENT_TYPE) {
                // components need to go first, so it is easier to locate them in the result.
                collection_1.ListWrapper.insert(foundDirectiveIndices, 0, directiveIndex);
                if (lang_1.isPresent(componentDirective)) {
                    throw new lang_1.BaseException("Only one component directive is allowed per element - check " + current.elementDescription);
                }
                componentDirective = directive;
                elementBinder.setComponentId(directive.id);
            }
            else {
                collection_1.ListWrapper.push(foundDirectiveIndices, directiveIndex);
            }
        });
        collection_1.ListWrapper.forEach(foundDirectiveIndices, function (directiveIndex) {
            var directive = _this._directives[directiveIndex];
            var directiveBinderBuilder = elementBinder.bindDirective(directiveIndex);
            current.compileChildren = current.compileChildren && directive.compileChildren;
            if (lang_1.isPresent(directive.properties)) {
                collection_1.MapWrapper.forEach(directive.properties, function (bindConfig, dirProperty) {
                    _this._bindDirectiveProperty(dirProperty, bindConfig, current, directiveBinderBuilder);
                });
            }
            if (lang_1.isPresent(directive.hostListeners)) {
                collection_1.MapWrapper.forEach(directive.hostListeners, function (action, eventName) {
                    _this._bindDirectiveEvent(eventName, action, current, directiveBinderBuilder);
                });
            }
            if (lang_1.isPresent(directive.hostActions)) {
                collection_1.MapWrapper.forEach(directive.hostActions, function (action, actionName) {
                    _this._bindHostAction(actionName, action, current, directiveBinderBuilder);
                });
            }
            if (lang_1.isPresent(directive.hostProperties)) {
                collection_1.MapWrapper.forEach(directive.hostProperties, function (hostPropertyName, directivePropertyName) {
                    _this._bindHostProperty(hostPropertyName, directivePropertyName, current, directiveBinderBuilder);
                });
            }
            if (lang_1.isPresent(directive.hostAttributes)) {
                collection_1.MapWrapper.forEach(directive.hostAttributes, function (hostAttrValue, hostAttrName) {
                    _this._addHostAttribute(hostAttrName, hostAttrValue, current);
                });
            }
            if (lang_1.isPresent(directive.readAttributes)) {
                collection_1.ListWrapper.forEach(directive.readAttributes, function (attrName) { elementBinder.readAttribute(attrName); });
            }
        });
    };
    DirectiveParser.prototype._bindDirectiveProperty = function (dirProperty, bindConfig, compileElement, directiveBinderBuilder) {
        var pipes = this._splitBindConfig(bindConfig);
        var elProp = collection_1.ListWrapper.removeAt(pipes, 0);
        var bindingAst = collection_1.MapWrapper.get(compileElement.bindElement().propertyBindings, util_1.dashCaseToCamelCase(elProp));
        if (lang_1.isBlank(bindingAst)) {
            var attributeValue = collection_1.MapWrapper.get(compileElement.attrs(), util_1.camelCaseToDashCase(elProp));
            if (lang_1.isPresent(attributeValue)) {
                bindingAst =
                    this._parser.wrapLiteralPrimitive(attributeValue, compileElement.elementDescription);
            }
        }
        // Bindings are optional, so this binding only needs to be set up if an expression is given.
        if (lang_1.isPresent(bindingAst)) {
            var fullExpAstWithBindPipes = this._parser.addPipes(bindingAst, pipes);
            directiveBinderBuilder.bindProperty(dirProperty, fullExpAstWithBindPipes);
        }
    };
    DirectiveParser.prototype._bindDirectiveEvent = function (eventName, action, compileElement, directiveBinderBuilder) {
        var ast = this._parser.parseAction(action, compileElement.elementDescription);
        if (lang_1.StringWrapper.contains(eventName, util_1.EVENT_TARGET_SEPARATOR)) {
            var parts = eventName.split(util_1.EVENT_TARGET_SEPARATOR);
            directiveBinderBuilder.bindEvent(parts[1], ast, parts[0]);
        }
        else {
            directiveBinderBuilder.bindEvent(eventName, ast);
        }
    };
    DirectiveParser.prototype._bindHostAction = function (actionName, actionExpression, compileElement, directiveBinderBuilder) {
        var ast = this._parser.parseAction(actionExpression, compileElement.elementDescription);
        directiveBinderBuilder.bindHostAction(actionName, actionExpression, ast);
    };
    DirectiveParser.prototype._bindHostProperty = function (hostPropertyName, directivePropertyName, compileElement, directiveBinderBuilder) {
        var ast = this._parser.parseBinding(directivePropertyName, "hostProperties of " + compileElement.elementDescription);
        directiveBinderBuilder.bindHostProperty(hostPropertyName, ast);
    };
    DirectiveParser.prototype._addHostAttribute = function (attrName, attrValue, compileElement) {
        if (lang_1.StringWrapper.equals(attrName, 'class')) {
            collection_1.ListWrapper.forEach(attrValue.split(' '), function (className) { dom_adapter_1.DOM.addClass(compileElement.element, className); });
        }
        else if (!dom_adapter_1.DOM.hasAttribute(compileElement.element, attrName)) {
            dom_adapter_1.DOM.setAttribute(compileElement.element, attrName, attrValue);
        }
    };
    DirectiveParser.prototype._splitBindConfig = function (bindConfig) {
        return collection_1.ListWrapper.map(bindConfig.split('|'), function (s) { return s.trim(); });
    };
    return DirectiveParser;
})();
exports.DirectiveParser = DirectiveParser;
exports.__esModule = true;
//# sourceMappingURL=directive_parser.js.map