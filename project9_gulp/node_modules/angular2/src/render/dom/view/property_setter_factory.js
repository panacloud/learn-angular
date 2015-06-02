var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var util_1 = require('../util');
var reflection_1 = require('angular2/src/reflection/reflection');
var STYLE_SEPARATOR = '.';
var propertySettersCache = collection_1.StringMapWrapper.create();
var innerHTMLSetterCache;
var ATTRIBUTE_PREFIX = 'attr.';
var attributeSettersCache = collection_1.StringMapWrapper.create();
var CLASS_PREFIX = 'class.';
var classSettersCache = collection_1.StringMapWrapper.create();
var STYLE_PREFIX = 'style.';
var styleSettersCache = collection_1.StringMapWrapper.create();
function setterFactory(property) {
    var setterFn, styleParts, styleSuffix;
    if (lang_1.StringWrapper.startsWith(property, ATTRIBUTE_PREFIX)) {
        setterFn = attributeSetterFactory(lang_1.StringWrapper.substring(property, ATTRIBUTE_PREFIX.length));
    }
    else if (lang_1.StringWrapper.startsWith(property, CLASS_PREFIX)) {
        setterFn = classSetterFactory(lang_1.StringWrapper.substring(property, CLASS_PREFIX.length));
    }
    else if (lang_1.StringWrapper.startsWith(property, STYLE_PREFIX)) {
        styleParts = property.split(STYLE_SEPARATOR);
        styleSuffix = styleParts.length > 2 ? collection_1.ListWrapper.get(styleParts, 2) : '';
        setterFn = styleSetterFactory(collection_1.ListWrapper.get(styleParts, 1), styleSuffix);
    }
    else if (lang_1.StringWrapper.equals(property, 'innerHtml')) {
        if (lang_1.isBlank(innerHTMLSetterCache)) {
            innerHTMLSetterCache = function (el, value) { return dom_adapter_1.DOM.setInnerHTML(el, value); };
        }
        setterFn = innerHTMLSetterCache;
    }
    else {
        property = resolvePropertyName(property);
        setterFn = collection_1.StringMapWrapper.get(propertySettersCache, property);
        if (lang_1.isBlank(setterFn)) {
            var propertySetterFn = reflection_1.reflector.setter(property);
            setterFn = function (receiver, value) {
                if (dom_adapter_1.DOM.hasProperty(receiver, property)) {
                    return propertySetterFn(receiver, value);
                }
            };
            collection_1.StringMapWrapper.set(propertySettersCache, property, setterFn);
        }
    }
    return setterFn;
}
exports.setterFactory = setterFactory;
function _isValidAttributeValue(attrName, value) {
    if (attrName == "role") {
        return lang_1.isString(value);
    }
    else {
        return lang_1.isPresent(value);
    }
}
function attributeSetterFactory(attrName) {
    var setterFn = collection_1.StringMapWrapper.get(attributeSettersCache, attrName);
    var dashCasedAttributeName;
    if (lang_1.isBlank(setterFn)) {
        dashCasedAttributeName = util_1.camelCaseToDashCase(attrName);
        setterFn = function (element, value) {
            if (_isValidAttributeValue(dashCasedAttributeName, value)) {
                dom_adapter_1.DOM.setAttribute(element, dashCasedAttributeName, lang_1.stringify(value));
            }
            else {
                if (lang_1.isPresent(value)) {
                    throw new lang_1.BaseException("Invalid " + dashCasedAttributeName +
                        " attribute, only string values are allowed, got '" +
                        lang_1.stringify(value) + "'");
                }
                dom_adapter_1.DOM.removeAttribute(element, dashCasedAttributeName);
            }
        };
        collection_1.StringMapWrapper.set(attributeSettersCache, attrName, setterFn);
    }
    return setterFn;
}
function classSetterFactory(className) {
    var setterFn = collection_1.StringMapWrapper.get(classSettersCache, className);
    var dashCasedClassName;
    if (lang_1.isBlank(setterFn)) {
        dashCasedClassName = util_1.camelCaseToDashCase(className);
        setterFn = function (element, value) {
            if (value) {
                dom_adapter_1.DOM.addClass(element, dashCasedClassName);
            }
            else {
                dom_adapter_1.DOM.removeClass(element, dashCasedClassName);
            }
        };
        collection_1.StringMapWrapper.set(classSettersCache, className, setterFn);
    }
    return setterFn;
}
function styleSetterFactory(styleName, styleSuffix) {
    var cacheKey = styleName + styleSuffix;
    var setterFn = collection_1.StringMapWrapper.get(styleSettersCache, cacheKey);
    var dashCasedStyleName;
    if (lang_1.isBlank(setterFn)) {
        dashCasedStyleName = util_1.camelCaseToDashCase(styleName);
        setterFn = function (element, value) {
            var valAsStr;
            if (lang_1.isPresent(value)) {
                valAsStr = lang_1.stringify(value);
                dom_adapter_1.DOM.setStyle(element, dashCasedStyleName, valAsStr + styleSuffix);
            }
            else {
                dom_adapter_1.DOM.removeStyle(element, dashCasedStyleName);
            }
        };
        collection_1.StringMapWrapper.set(styleSettersCache, cacheKey, setterFn);
    }
    return setterFn;
}
function resolvePropertyName(attrName) {
    var mappedPropName = collection_1.StringMapWrapper.get(dom_adapter_1.DOM.attrToPropMap, attrName);
    return lang_1.isPresent(mappedPropName) ? mappedPropName : attrName;
}
exports.__esModule = true;
//# sourceMappingURL=property_setter_factory.js.map