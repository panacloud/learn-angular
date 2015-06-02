var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var change_detection_1 = require('angular2/change_detection');
var proto_view_1 = require('./proto_view');
var element_binder_1 = require('./element_binder');
var property_setter_factory_1 = require('./property_setter_factory');
var api = require('../../api');
var util_1 = require('../util');
var ProtoViewBuilder = (function () {
    function ProtoViewBuilder(rootElement, type) {
        this.rootElement = rootElement;
        this.elements = [];
        this.variableBindings = collection_1.MapWrapper.create();
        this.type = type;
    }
    ProtoViewBuilder.prototype.bindElement = function (element, description) {
        if (description === void 0) { description = null; }
        var builder = new ElementBinderBuilder(this.elements.length, element, description);
        collection_1.ListWrapper.push(this.elements, builder);
        dom_adapter_1.DOM.addClass(element, util_1.NG_BINDING_CLASS);
        return builder;
    };
    ProtoViewBuilder.prototype.bindVariable = function (name, value) {
        // Store the variable map from value to variable, reflecting how it will be used later by
        // DomView. When a local is set to the view, a lookup for the variable name will take place
        // keyed
        // by the "value", or exported identifier. For example, ng-for sets a view local of "index".
        // When this occurs, a lookup keyed by "index" must occur to find if there is a var referencing
        // it.
        collection_1.MapWrapper.set(this.variableBindings, value, name);
    };
    ProtoViewBuilder.prototype.build = function () {
        var renderElementBinders = [];
        var apiElementBinders = [];
        collection_1.ListWrapper.forEach(this.elements, function (ebb) {
            var propertySetters = collection_1.MapWrapper.create();
            var hostActions = collection_1.MapWrapper.create();
            var apiDirectiveBinders = collection_1.ListWrapper.map(ebb.directives, function (dbb) {
                ebb.eventBuilder.merge(dbb.eventBuilder);
                collection_1.MapWrapper.forEach(dbb.hostPropertyBindings, function (_, hostPropertyName) {
                    collection_1.MapWrapper.set(propertySetters, hostPropertyName, property_setter_factory_1.setterFactory(hostPropertyName));
                });
                collection_1.ListWrapper.forEach(dbb.hostActions, function (hostAction) {
                    collection_1.MapWrapper.set(hostActions, hostAction.actionExpression, hostAction.expression);
                });
                return new api.DirectiveBinder({
                    directiveIndex: dbb.directiveIndex,
                    propertyBindings: dbb.propertyBindings,
                    eventBindings: dbb.eventBindings,
                    hostPropertyBindings: dbb.hostPropertyBindings
                });
            });
            collection_1.MapWrapper.forEach(ebb.propertyBindings, function (_, propertyName) {
                collection_1.MapWrapper.set(propertySetters, propertyName, property_setter_factory_1.setterFactory(propertyName));
            });
            var nestedProtoView = lang_1.isPresent(ebb.nestedProtoView) ? ebb.nestedProtoView.build() : null;
            var parentIndex = lang_1.isPresent(ebb.parent) ? ebb.parent.index : -1;
            collection_1.ListWrapper.push(apiElementBinders, new api.ElementBinder({
                index: ebb.index,
                parentIndex: parentIndex,
                distanceToParent: ebb.distanceToParent,
                directives: apiDirectiveBinders,
                nestedProtoView: nestedProtoView,
                propertyBindings: ebb.propertyBindings,
                variableBindings: ebb.variableBindings,
                eventBindings: ebb.eventBindings,
                textBindings: ebb.textBindings,
                readAttributes: ebb.readAttributes
            }));
            collection_1.ListWrapper.push(renderElementBinders, new element_binder_1.ElementBinder({
                textNodeIndices: ebb.textBindingIndices,
                contentTagSelector: ebb.contentTagSelector,
                parentIndex: parentIndex,
                distanceToParent: ebb.distanceToParent,
                nestedProtoView: lang_1.isPresent(nestedProtoView) ?
                    proto_view_1.resolveInternalDomProtoView(nestedProtoView.render) :
                    null,
                componentId: ebb.componentId,
                eventLocals: new change_detection_1.LiteralArray(ebb.eventBuilder.buildEventLocals()),
                localEvents: ebb.eventBuilder.buildLocalEvents(),
                globalEvents: ebb.eventBuilder.buildGlobalEvents(),
                hostActions: hostActions,
                propertySetters: propertySetters
            }));
        });
        return new api.ProtoViewDto({
            render: new proto_view_1.DomProtoViewRef(new proto_view_1.DomProtoView({ element: this.rootElement, elementBinders: renderElementBinders })),
            type: this.type,
            elementBinders: apiElementBinders,
            variableBindings: this.variableBindings
        });
    };
    return ProtoViewBuilder;
})();
exports.ProtoViewBuilder = ProtoViewBuilder;
var ElementBinderBuilder = (function () {
    function ElementBinderBuilder(index, element, description) {
        this.element = element;
        this.index = index;
        this.parent = null;
        this.distanceToParent = 0;
        this.directives = [];
        this.nestedProtoView = null;
        this.propertyBindings = collection_1.MapWrapper.create();
        this.variableBindings = collection_1.MapWrapper.create();
        this.eventBindings = collection_1.ListWrapper.create();
        this.eventBuilder = new EventBuilder();
        this.textBindings = [];
        this.textBindingIndices = [];
        this.contentTagSelector = null;
        this.componentId = null;
        this.readAttributes = collection_1.MapWrapper.create();
    }
    ElementBinderBuilder.prototype.setParent = function (parent, distanceToParent) {
        this.parent = parent;
        if (lang_1.isPresent(parent)) {
            this.distanceToParent = distanceToParent;
        }
        return this;
    };
    ElementBinderBuilder.prototype.readAttribute = function (attrName) {
        if (lang_1.isBlank(collection_1.MapWrapper.get(this.readAttributes, attrName))) {
            collection_1.MapWrapper.set(this.readAttributes, attrName, dom_adapter_1.DOM.getAttribute(this.element, attrName));
        }
    };
    ElementBinderBuilder.prototype.bindDirective = function (directiveIndex) {
        var directive = new DirectiveBuilder(directiveIndex);
        collection_1.ListWrapper.push(this.directives, directive);
        return directive;
    };
    ElementBinderBuilder.prototype.bindNestedProtoView = function (rootElement) {
        if (lang_1.isPresent(this.nestedProtoView)) {
            throw new lang_1.BaseException('Only one nested view per element is allowed');
        }
        this.nestedProtoView = new ProtoViewBuilder(rootElement, api.ProtoViewDto.EMBEDDED_VIEW_TYPE);
        return this.nestedProtoView;
    };
    ElementBinderBuilder.prototype.bindProperty = function (name, expression) { collection_1.MapWrapper.set(this.propertyBindings, name, expression); };
    ElementBinderBuilder.prototype.bindVariable = function (name, value) {
        // When current is a view root, the variable bindings are set to the *nested* proto view.
        // The root view conceptually signifies a new "block scope" (the nested view), to which
        // the variables are bound.
        if (lang_1.isPresent(this.nestedProtoView)) {
            this.nestedProtoView.bindVariable(name, value);
        }
        else {
            // Store the variable map from value to variable, reflecting how it will be used later by
            // DomView. When a local is set to the view, a lookup for the variable name will take place
            // keyed
            // by the "value", or exported identifier. For example, ng-for sets a view local of "index".
            // When this occurs, a lookup keyed by "index" must occur to find if there is a var
            // referencing
            // it.
            collection_1.MapWrapper.set(this.variableBindings, value, name);
        }
    };
    ElementBinderBuilder.prototype.bindEvent = function (name, expression, target) {
        if (target === void 0) { target = null; }
        collection_1.ListWrapper.push(this.eventBindings, this.eventBuilder.add(name, expression, target));
    };
    ElementBinderBuilder.prototype.bindText = function (index, expression) {
        collection_1.ListWrapper.push(this.textBindingIndices, index);
        collection_1.ListWrapper.push(this.textBindings, expression);
    };
    ElementBinderBuilder.prototype.setContentTagSelector = function (value) { this.contentTagSelector = value; };
    ElementBinderBuilder.prototype.setComponentId = function (componentId) { this.componentId = componentId; };
    return ElementBinderBuilder;
})();
exports.ElementBinderBuilder = ElementBinderBuilder;
var DirectiveBuilder = (function () {
    function DirectiveBuilder(directiveIndex) {
        this.directiveIndex = directiveIndex;
        this.propertyBindings = collection_1.MapWrapper.create();
        this.hostPropertyBindings = collection_1.MapWrapper.create();
        this.hostActions = collection_1.ListWrapper.create();
        this.eventBindings = collection_1.ListWrapper.create();
        this.eventBuilder = new EventBuilder();
    }
    DirectiveBuilder.prototype.bindProperty = function (name, expression) { collection_1.MapWrapper.set(this.propertyBindings, name, expression); };
    DirectiveBuilder.prototype.bindHostProperty = function (name, expression) {
        collection_1.MapWrapper.set(this.hostPropertyBindings, name, expression);
    };
    DirectiveBuilder.prototype.bindHostAction = function (actionName, actionExpression, expression) {
        collection_1.ListWrapper.push(this.hostActions, new element_binder_1.HostAction(actionName, actionExpression, expression));
    };
    DirectiveBuilder.prototype.bindEvent = function (name, expression, target) {
        if (target === void 0) { target = null; }
        collection_1.ListWrapper.push(this.eventBindings, this.eventBuilder.add(name, expression, target));
    };
    return DirectiveBuilder;
})();
exports.DirectiveBuilder = DirectiveBuilder;
var EventBuilder = (function (_super) {
    __extends(EventBuilder, _super);
    function EventBuilder() {
        _super.call(this);
        this.locals = [];
        this.localEvents = [];
        this.globalEvents = [];
        this._implicitReceiver = new change_detection_1.ImplicitReceiver();
    }
    EventBuilder.prototype.add = function (name, source, target) {
        // TODO(tbosch): reenable this when we are parsing element properties
        // out of action expressions
        // var adjustedAst = astWithSource.ast.visit(this);
        var adjustedAst = source.ast;
        var fullName = lang_1.isPresent(target) ? target + util_1.EVENT_TARGET_SEPARATOR + name : name;
        var result = new api.EventBinding(fullName, new change_detection_1.ASTWithSource(adjustedAst, source.source, source.location));
        var event = new element_binder_1.Event(name, target, fullName);
        if (lang_1.isBlank(target)) {
            collection_1.ListWrapper.push(this.localEvents, event);
        }
        else {
            collection_1.ListWrapper.push(this.globalEvents, event);
        }
        return result;
    };
    EventBuilder.prototype.visitAccessMember = function (ast) {
        var isEventAccess = false;
        var current = ast;
        while (!isEventAccess && (current instanceof change_detection_1.AccessMember)) {
            var am = current;
            if (am.name == '$event') {
                isEventAccess = true;
            }
            current = am.receiver;
        }
        if (isEventAccess) {
            collection_1.ListWrapper.push(this.locals, ast);
            var index = this.locals.length - 1;
            return new change_detection_1.AccessMember(this._implicitReceiver, "" + index, function (arr) { return arr[index]; }, null);
        }
        else {
            return ast;
        }
    };
    EventBuilder.prototype.buildEventLocals = function () { return this.locals; };
    EventBuilder.prototype.buildLocalEvents = function () { return this.localEvents; };
    EventBuilder.prototype.buildGlobalEvents = function () { return this.globalEvents; };
    EventBuilder.prototype.merge = function (eventBuilder) {
        this._merge(this.localEvents, eventBuilder.localEvents);
        this._merge(this.globalEvents, eventBuilder.globalEvents);
        collection_1.ListWrapper.concat(this.locals, eventBuilder.locals);
    };
    EventBuilder.prototype._merge = function (host, tobeAdded) {
        var names = collection_1.ListWrapper.create();
        for (var i = 0; i < host.length; i++) {
            collection_1.ListWrapper.push(names, host[i].fullName);
        }
        for (var j = 0; j < tobeAdded.length; j++) {
            if (!collection_1.ListWrapper.contains(names, tobeAdded[j].fullName)) {
                collection_1.ListWrapper.push(host, tobeAdded[j]);
            }
        }
    };
    return EventBuilder;
})(change_detection_1.AstTransformer);
exports.EventBuilder = EventBuilder;
exports.__esModule = true;
//# sourceMappingURL=proto_view_builder.js.map