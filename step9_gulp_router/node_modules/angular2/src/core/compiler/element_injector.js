var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
var collection_1 = require('angular2/src/facade/collection');
var di_1 = require('angular2/di');
var visibility_1 = require('angular2/src/core/annotations_impl/visibility');
var di_2 = require('angular2/src/core/annotations_impl/di');
var avmModule = require('./view_manager');
var view_container_ref_1 = require('./view_container_ref');
var element_ref_1 = require('./element_ref');
var view_ref_1 = require('./view_ref');
var annotations_1 = require('angular2/src/core/annotations_impl/annotations');
var change_detection_1 = require('angular2/change_detection');
var query_list_1 = require('./query_list');
var reflection_1 = require('angular2/src/reflection/reflection');
var api_1 = require('angular2/src/render/api');
var _MAX_DIRECTIVE_CONSTRUCTION_COUNTER = 10;
var _undefined = new Object();
var _staticKeys;
var StaticKeys = (function () {
    function StaticKeys() {
        // TODO: vsavkin Key.annotate(Key.get(AppView), 'static')
        this.viewManagerId = di_1.Key.get(avmModule.AppViewManager).id;
        this.protoViewId = di_1.Key.get(view_ref_1.ProtoViewRef).id;
        this.viewContainerId = di_1.Key.get(view_container_ref_1.ViewContainerRef).id;
        this.changeDetectorRefId = di_1.Key.get(change_detection_1.ChangeDetectorRef).id;
        this.elementRefId = di_1.Key.get(element_ref_1.ElementRef).id;
    }
    StaticKeys.instance = function () {
        if (lang_1.isBlank(_staticKeys))
            _staticKeys = new StaticKeys();
        return _staticKeys;
    };
    return StaticKeys;
})();
var TreeNode = (function () {
    function TreeNode(parent) {
        this._head = null;
        this._tail = null;
        this._next = null;
        if (lang_1.isPresent(parent))
            parent.addChild(this);
    }
    TreeNode.prototype._assertConsistency = function () {
        this._assertHeadBeforeTail();
        this._assertTailReachable();
        this._assertPresentInParentList();
    };
    TreeNode.prototype._assertHeadBeforeTail = function () {
        if (lang_1.isBlank(this._tail) && lang_1.isPresent(this._head))
            throw new lang_1.BaseException('null tail but non-null head');
    };
    TreeNode.prototype._assertTailReachable = function () {
        if (lang_1.isBlank(this._tail))
            return;
        if (lang_1.isPresent(this._tail._next))
            throw new lang_1.BaseException('node after tail');
        var p = this._head;
        while (lang_1.isPresent(p) && p != this._tail)
            p = p._next;
        if (lang_1.isBlank(p) && lang_1.isPresent(this._tail))
            throw new lang_1.BaseException('tail not reachable.');
    };
    TreeNode.prototype._assertPresentInParentList = function () {
        var p = this._parent;
        if (lang_1.isBlank(p)) {
            return;
        }
        var cur = p._head;
        while (lang_1.isPresent(cur) && cur != this)
            cur = cur._next;
        if (lang_1.isBlank(cur))
            throw new lang_1.BaseException('node not reachable through parent.');
    };
    /**
     * Adds a child to the parent node. The child MUST NOT be a part of a tree.
     */
    TreeNode.prototype.addChild = function (child) {
        if (lang_1.isPresent(this._tail)) {
            this._tail._next = child;
            this._tail = child;
        }
        else {
            this._tail = this._head = child;
        }
        child._next = null;
        child._parent = this;
        this._assertConsistency();
    };
    /**
     * Adds a child to the parent node after a given sibling.
     * The child MUST NOT be a part of a tree and the sibling must be present.
     */
    TreeNode.prototype.addChildAfter = function (child, prevSibling) {
        this._assertConsistency();
        if (lang_1.isBlank(prevSibling)) {
            var prevHead = this._head;
            this._head = child;
            child._next = prevHead;
            if (lang_1.isBlank(this._tail))
                this._tail = child;
        }
        else if (lang_1.isBlank(prevSibling._next)) {
            this.addChild(child);
            return;
        }
        else {
            prevSibling._assertPresentInParentList();
            child._next = prevSibling._next;
            prevSibling._next = child;
        }
        child._parent = this;
        this._assertConsistency();
    };
    /**
     * Detaches a node from the parent's tree.
     */
    TreeNode.prototype.remove = function () {
        this._assertConsistency();
        if (lang_1.isBlank(this.parent))
            return;
        var nextSibling = this._next;
        var prevSibling = this._findPrev();
        if (lang_1.isBlank(prevSibling)) {
            this.parent._head = this._next;
        }
        else {
            prevSibling._next = this._next;
        }
        if (lang_1.isBlank(nextSibling)) {
            this._parent._tail = prevSibling;
        }
        this._parent._assertConsistency();
        this._parent = null;
        this._next = null;
        this._assertConsistency();
    };
    /**
     * Finds a previous sibling or returns null if first child.
     * Assumes the node has a parent.
     * TODO(rado): replace with DoublyLinkedList to avoid O(n) here.
     */
    TreeNode.prototype._findPrev = function () {
        var node = this.parent._head;
        if (node == this)
            return null;
        while (node._next !== this)
            node = node._next;
        return node;
    };
    Object.defineProperty(TreeNode.prototype, "parent", {
        get: function () { return this._parent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "children", {
        // TODO(rado): replace with a function call, does too much work for a getter.
        get: function () {
            var res = [];
            var child = this._head;
            while (child != null) {
                collection_1.ListWrapper.push(res, child);
                child = child._next;
            }
            return res;
        },
        enumerable: true,
        configurable: true
    });
    return TreeNode;
})();
exports.TreeNode = TreeNode;
var DependencyWithVisibility = (function (_super) {
    __extends(DependencyWithVisibility, _super);
    function DependencyWithVisibility(key, asPromise, lazy, optional, properties, visibility) {
        _super.call(this, key, asPromise, lazy, optional, properties);
        this.visibility = visibility;
    }
    DependencyWithVisibility.createFrom = function (d) {
        return new DependencyWithVisibility(d.key, d.asPromise, d.lazy, d.optional, d.properties, DependencyWithVisibility._visibility(d.properties));
    };
    DependencyWithVisibility._visibility = function (properties) {
        if (properties.length == 0)
            return visibility_1.self;
        var p = collection_1.ListWrapper.find(properties, function (p) { return p instanceof visibility_1.Visibility; });
        return lang_1.isPresent(p) ? p : visibility_1.self;
    };
    return DependencyWithVisibility;
})(di_1.Dependency);
exports.DependencyWithVisibility = DependencyWithVisibility;
var DirectiveDependency = (function (_super) {
    __extends(DirectiveDependency, _super);
    function DirectiveDependency(key, asPromise, lazy, optional, properties, visibility, attributeName, queryDirective) {
        _super.call(this, key, asPromise, lazy, optional, properties, visibility);
        this.attributeName = attributeName;
        this.queryDirective = queryDirective;
        this._verify();
    }
    DirectiveDependency.prototype._verify = function () {
        var count = 0;
        if (lang_1.isPresent(this.queryDirective))
            count++;
        if (lang_1.isPresent(this.attributeName))
            count++;
        if (count > 1)
            throw new lang_1.BaseException('A directive injectable can contain only one of the following @Attribute or @Query.');
    };
    DirectiveDependency.createFrom = function (d) {
        return new DirectiveDependency(d.key, d.asPromise, d.lazy, d.optional, d.properties, DependencyWithVisibility._visibility(d.properties), DirectiveDependency._attributeName(d.properties), DirectiveDependency._query(d.properties));
    };
    DirectiveDependency._attributeName = function (properties) {
        var p = collection_1.ListWrapper.find(properties, function (p) { return p instanceof di_2.Attribute; });
        return lang_1.isPresent(p) ? p.attributeName : null;
    };
    DirectiveDependency._query = function (properties) {
        var p = collection_1.ListWrapper.find(properties, function (p) { return p instanceof di_2.Query; });
        return lang_1.isPresent(p) ? di_1.resolveForwardRef(p.directive) : null;
    };
    return DirectiveDependency;
})(DependencyWithVisibility);
exports.DirectiveDependency = DirectiveDependency;
var DirectiveBinding = (function (_super) {
    __extends(DirectiveBinding, _super);
    function DirectiveBinding(key, factory, dependencies, providedAsPromise, resolvedAppInjectables, resolvedHostInjectables, resolvedViewInjectables, metadata) {
        _super.call(this, key, factory, dependencies, providedAsPromise);
        this.resolvedAppInjectables = resolvedAppInjectables;
        this.resolvedHostInjectables = resolvedHostInjectables;
        this.resolvedViewInjectables = resolvedViewInjectables;
        this.metadata = metadata;
    }
    Object.defineProperty(DirectiveBinding.prototype, "callOnDestroy", {
        get: function () { return this.metadata.callOnDestroy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectiveBinding.prototype, "callOnChange", {
        get: function () { return this.metadata.callOnChange; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectiveBinding.prototype, "callOnAllChangesDone", {
        get: function () { return this.metadata.callOnAllChangesDone; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectiveBinding.prototype, "displayName", {
        get: function () { return this.key.displayName; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectiveBinding.prototype, "eventEmitters", {
        get: function () {
            return lang_1.isPresent(this.metadata) && lang_1.isPresent(this.metadata.events) ? this.metadata.events : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectiveBinding.prototype, "hostActions", {
        get: function () {
            return lang_1.isPresent(this.metadata) && lang_1.isPresent(this.metadata.hostActions) ?
                this.metadata.hostActions :
                collection_1.MapWrapper.create();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectiveBinding.prototype, "changeDetection", {
        get: function () { return this.metadata.changeDetection; },
        enumerable: true,
        configurable: true
    });
    DirectiveBinding.createFromBinding = function (binding, ann) {
        if (lang_1.isBlank(ann)) {
            ann = new annotations_1.Directive();
        }
        var rb = binding.resolve();
        var deps = collection_1.ListWrapper.map(rb.dependencies, DirectiveDependency.createFrom);
        var resolvedAppInjectables = ann instanceof annotations_1.Component && lang_1.isPresent(ann.appInjector) ?
            di_1.Injector.resolve(ann.appInjector) :
            [];
        var resolvedHostInjectables = lang_1.isPresent(ann.hostInjector) ? di_1.resolveBindings(ann.hostInjector) : [];
        var resolvedViewInjectables = ann instanceof annotations_1.Component && lang_1.isPresent(ann.viewInjector) ?
            di_1.resolveBindings(ann.viewInjector) :
            [];
        var metadata = new api_1.DirectiveMetadata({
            id: lang_1.stringify(rb.key.token),
            type: ann instanceof
                annotations_1.Component ? api_1.DirectiveMetadata.COMPONENT_TYPE : api_1.DirectiveMetadata.DIRECTIVE_TYPE,
            selector: ann.selector,
            compileChildren: ann.compileChildren,
            events: ann.events,
            hostListeners: lang_1.isPresent(ann.hostListeners) ? collection_1.MapWrapper.createFromStringMap(ann.hostListeners) : null,
            hostProperties: lang_1.isPresent(ann.hostProperties) ? collection_1.MapWrapper.createFromStringMap(ann.hostProperties) : null,
            hostAttributes: lang_1.isPresent(ann.hostAttributes) ? collection_1.MapWrapper.createFromStringMap(ann.hostAttributes) : null,
            hostActions: lang_1.isPresent(ann.hostActions) ? collection_1.MapWrapper.createFromStringMap(ann.hostActions) :
                null,
            properties: lang_1.isPresent(ann.properties) ? collection_1.MapWrapper.createFromStringMap(ann.properties) : null,
            readAttributes: DirectiveBinding._readAttributes(deps),
            callOnDestroy: ann.hasLifecycleHook(annotations_1.onDestroy),
            callOnChange: ann.hasLifecycleHook(annotations_1.onChange),
            callOnAllChangesDone: ann.hasLifecycleHook(annotations_1.onAllChangesDone),
            changeDetection: ann instanceof
                annotations_1.Component ? ann.changeDetection : null
        });
        return new DirectiveBinding(rb.key, rb.factory, deps, rb.providedAsPromise, resolvedAppInjectables, resolvedHostInjectables, resolvedViewInjectables, metadata);
    };
    DirectiveBinding._readAttributes = function (deps) {
        var readAttributes = [];
        collection_1.ListWrapper.forEach(deps, function (dep) {
            if (lang_1.isPresent(dep.attributeName)) {
                collection_1.ListWrapper.push(readAttributes, dep.attributeName);
            }
        });
        return readAttributes;
    };
    DirectiveBinding.createFromType = function (type, annotation) {
        var binding = new di_1.Binding(type, { toClass: type });
        return DirectiveBinding.createFromBinding(binding, annotation);
    };
    return DirectiveBinding;
})(di_1.ResolvedBinding);
exports.DirectiveBinding = DirectiveBinding;
// TODO(rado): benchmark and consider rolling in as ElementInjector fields.
var PreBuiltObjects = (function () {
    function PreBuiltObjects(viewManager, view, protoView) {
        this.viewManager = viewManager;
        this.view = view;
        this.protoView = protoView;
    }
    return PreBuiltObjects;
})();
exports.PreBuiltObjects = PreBuiltObjects;
var EventEmitterAccessor = (function () {
    function EventEmitterAccessor(eventName, getter) {
        this.eventName = eventName;
        this.getter = getter;
    }
    EventEmitterAccessor.prototype.subscribe = function (view, boundElementIndex, directive) {
        var _this = this;
        var eventEmitter = this.getter(directive);
        return async_1.ObservableWrapper.subscribe(eventEmitter, function (eventObj) { return view.triggerEventHandlers(_this.eventName, eventObj, boundElementIndex); });
    };
    return EventEmitterAccessor;
})();
exports.EventEmitterAccessor = EventEmitterAccessor;
var HostActionAccessor = (function () {
    function HostActionAccessor(actionExpression, getter) {
        this.actionExpression = actionExpression;
        this.getter = getter;
    }
    HostActionAccessor.prototype.subscribe = function (view, boundElementIndex, directive) {
        var _this = this;
        var eventEmitter = this.getter(directive);
        return async_1.ObservableWrapper.subscribe(eventEmitter, function (actionObj) { return view.callAction(boundElementIndex, _this.actionExpression, actionObj); });
    };
    return HostActionAccessor;
})();
exports.HostActionAccessor = HostActionAccessor;
var LIGHT_DOM = 1;
var SHADOW_DOM = 2;
var LIGHT_DOM_AND_SHADOW_DOM = 3;
var BindingData = (function () {
    function BindingData(binding, visibility) {
        this.binding = binding;
        this.visibility = visibility;
    }
    BindingData.prototype.getKeyId = function () { return this.binding.key.id; };
    BindingData.prototype.createEventEmitterAccessors = function () {
        if (!(this.binding instanceof DirectiveBinding))
            return [];
        var db = this.binding;
        return collection_1.ListWrapper.map(db.eventEmitters, function (eventName) { return new EventEmitterAccessor(eventName, reflection_1.reflector.getter(eventName)); });
    };
    BindingData.prototype.createHostActionAccessors = function () {
        if (!(this.binding instanceof DirectiveBinding))
            return [];
        var res = [];
        var db = this.binding;
        collection_1.MapWrapper.forEach(db.hostActions, function (actionExpression, actionName) {
            collection_1.ListWrapper.push(res, new HostActionAccessor(actionExpression, reflection_1.reflector.getter(actionName)));
        });
        return res;
    };
    return BindingData;
})();
exports.BindingData = BindingData;
/**

Difference between di.Injector and ElementInjector

di.Injector:
 - imperative based (can create child injectors imperativly)
 - Lazy loading of code
 - Component/App Level services which are usually not DOM Related.


ElementInjector:
  - ProtoBased (Injector structure fixed at compile time)
  - understands @Ancestor, @Parent, @Child, @Descendent
  - Fast
  - Query mechanism for children
  - 1:1 to DOM structure.

 PERF BENCHMARK:
http://www.williambrownstreet.net/blog/2014/04/faster-angularjs-rendering-angularjs-and-reactjs/
 */
var ProtoElementInjector = (function () {
    function ProtoElementInjector(parent, index, bd, distanceToParent, firstBindingIsComponent) {
        this.parent = parent;
        this.index = index;
        this.distanceToParent = distanceToParent;
        this.exportComponent = false;
        this.exportElement = false;
        this._firstBindingIsComponent = firstBindingIsComponent;
        this._binding0 = null;
        this._keyId0 = null;
        this._visibility0 = null;
        this._binding1 = null;
        this._keyId1 = null;
        this._visibility1 = null;
        this._binding2 = null;
        this._keyId2 = null;
        this._visibility2 = null;
        this._binding3 = null;
        this._keyId3 = null;
        this._visibility3 = null;
        this._binding4 = null;
        this._keyId4 = null;
        this._visibility4 = null;
        this._binding5 = null;
        this._keyId5 = null;
        this._visibility5 = null;
        this._binding6 = null;
        this._keyId6 = null;
        this._visibility6 = null;
        this._binding7 = null;
        this._keyId7 = null;
        this._visibility7 = null;
        this._binding8 = null;
        this._keyId8 = null;
        this._visibility8 = null;
        this._binding9 = null;
        this._keyId9 = null;
        this._visibility9 = null;
        var length = bd.length;
        this.eventEmitterAccessors = collection_1.ListWrapper.createFixedSize(length);
        this.hostActionAccessors = collection_1.ListWrapper.createFixedSize(length);
        if (length > 0) {
            this._binding0 = bd[0].binding;
            this._keyId0 = bd[0].getKeyId();
            this._visibility0 = bd[0].visibility;
            this.eventEmitterAccessors[0] = bd[0].createEventEmitterAccessors();
            this.hostActionAccessors[0] = bd[0].createHostActionAccessors();
        }
        if (length > 1) {
            this._binding1 = bd[1].binding;
            this._keyId1 = bd[1].getKeyId();
            this._visibility1 = bd[1].visibility;
            this.eventEmitterAccessors[1] = bd[1].createEventEmitterAccessors();
            this.hostActionAccessors[1] = bd[1].createHostActionAccessors();
        }
        if (length > 2) {
            this._binding2 = bd[2].binding;
            this._keyId2 = bd[2].getKeyId();
            this._visibility2 = bd[2].visibility;
            this.eventEmitterAccessors[2] = bd[2].createEventEmitterAccessors();
            this.hostActionAccessors[2] = bd[2].createHostActionAccessors();
        }
        if (length > 3) {
            this._binding3 = bd[3].binding;
            this._keyId3 = bd[3].getKeyId();
            this._visibility3 = bd[3].visibility;
            this.eventEmitterAccessors[3] = bd[3].createEventEmitterAccessors();
            this.hostActionAccessors[3] = bd[3].createHostActionAccessors();
        }
        if (length > 4) {
            this._binding4 = bd[4].binding;
            this._keyId4 = bd[4].getKeyId();
            this._visibility4 = bd[4].visibility;
            this.eventEmitterAccessors[4] = bd[4].createEventEmitterAccessors();
            this.hostActionAccessors[4] = bd[4].createHostActionAccessors();
        }
        if (length > 5) {
            this._binding5 = bd[5].binding;
            this._keyId5 = bd[5].getKeyId();
            this._visibility5 = bd[5].visibility;
            this.eventEmitterAccessors[5] = bd[5].createEventEmitterAccessors();
            this.hostActionAccessors[5] = bd[5].createHostActionAccessors();
        }
        if (length > 6) {
            this._binding6 = bd[6].binding;
            this._keyId6 = bd[6].getKeyId();
            this._visibility6 = bd[6].visibility;
            this.eventEmitterAccessors[6] = bd[6].createEventEmitterAccessors();
            this.hostActionAccessors[6] = bd[6].createHostActionAccessors();
        }
        if (length > 7) {
            this._binding7 = bd[7].binding;
            this._keyId7 = bd[7].getKeyId();
            this._visibility7 = bd[7].visibility;
            this.eventEmitterAccessors[7] = bd[7].createEventEmitterAccessors();
            this.hostActionAccessors[7] = bd[7].createHostActionAccessors();
        }
        if (length > 8) {
            this._binding8 = bd[8].binding;
            this._keyId8 = bd[8].getKeyId();
            this._visibility8 = bd[8].visibility;
            this.eventEmitterAccessors[8] = bd[8].createEventEmitterAccessors();
            this.hostActionAccessors[8] = bd[8].createHostActionAccessors();
        }
        if (length > 9) {
            this._binding9 = bd[9].binding;
            this._keyId9 = bd[9].getKeyId();
            this._visibility9 = bd[9].visibility;
            this.eventEmitterAccessors[9] = bd[9].createEventEmitterAccessors();
            this.hostActionAccessors[9] = bd[9].createHostActionAccessors();
        }
        if (length > 10) {
            throw 'Maximum number of directives per element has been reached.';
        }
    }
    ProtoElementInjector.create = function (parent, index, bindings, firstBindingIsComponent, distanceToParent) {
        var bd = [];
        ProtoElementInjector._createDirectiveBindingData(bindings, bd, firstBindingIsComponent);
        ProtoElementInjector._createHostInjectorBindingData(bindings, bd);
        if (firstBindingIsComponent) {
            ProtoElementInjector._createViewInjectorBindingData(bindings, bd);
        }
        return new ProtoElementInjector(parent, index, bd, distanceToParent, firstBindingIsComponent);
    };
    ProtoElementInjector._createDirectiveBindingData = function (bindings, bd, firstBindingIsComponent) {
        if (firstBindingIsComponent) {
            collection_1.ListWrapper.push(bd, new BindingData(bindings[0], LIGHT_DOM_AND_SHADOW_DOM));
            for (var i = 1; i < bindings.length; ++i) {
                collection_1.ListWrapper.push(bd, new BindingData(bindings[i], LIGHT_DOM));
            }
        }
        else {
            collection_1.ListWrapper.forEach(bindings, function (b) { collection_1.ListWrapper.push(bd, new BindingData(b, LIGHT_DOM)); });
        }
    };
    ProtoElementInjector._createHostInjectorBindingData = function (bindings, bd) {
        collection_1.ListWrapper.forEach(bindings, function (b) {
            collection_1.ListWrapper.forEach(b.resolvedHostInjectables, function (b) {
                collection_1.ListWrapper.push(bd, new BindingData(ProtoElementInjector._createBinding(b), LIGHT_DOM));
            });
        });
    };
    ProtoElementInjector._createViewInjectorBindingData = function (bindings, bd) {
        var db = bindings[0];
        collection_1.ListWrapper.forEach(db.resolvedViewInjectables, function (b) { return collection_1.ListWrapper.push(bd, new BindingData(ProtoElementInjector._createBinding(b), SHADOW_DOM)); });
    };
    ProtoElementInjector._createBinding = function (b) {
        var deps = collection_1.ListWrapper.map(b.dependencies, function (d) { return DependencyWithVisibility.createFrom(d); });
        return new di_1.ResolvedBinding(b.key, b.factory, deps, b.providedAsPromise);
    };
    ProtoElementInjector.prototype.instantiate = function (parent) {
        return new ElementInjector(this, parent);
    };
    ProtoElementInjector.prototype.directParent = function () { return this.distanceToParent < 2 ? this.parent : null; };
    Object.defineProperty(ProtoElementInjector.prototype, "hasBindings", {
        get: function () { return lang_1.isPresent(this._binding0); },
        enumerable: true,
        configurable: true
    });
    ProtoElementInjector.prototype.getBindingAtIndex = function (index) {
        if (index == 0)
            return this._binding0;
        if (index == 1)
            return this._binding1;
        if (index == 2)
            return this._binding2;
        if (index == 3)
            return this._binding3;
        if (index == 4)
            return this._binding4;
        if (index == 5)
            return this._binding5;
        if (index == 6)
            return this._binding6;
        if (index == 7)
            return this._binding7;
        if (index == 8)
            return this._binding8;
        if (index == 9)
            return this._binding9;
        throw new OutOfBoundsAccess(index);
    };
    return ProtoElementInjector;
})();
exports.ProtoElementInjector = ProtoElementInjector;
var ElementInjector = (function (_super) {
    __extends(ElementInjector, _super);
    function ElementInjector(proto, parent) {
        _super.call(this, parent);
        this._proto = proto;
        // we cannot call dehydrate because fields won't be detected
        this._preBuiltObjects = null;
        this._lightDomAppInjector = null;
        this._shadowDomAppInjector = null;
        this._obj0 = null;
        this._obj1 = null;
        this._obj2 = null;
        this._obj3 = null;
        this._obj4 = null;
        this._obj5 = null;
        this._obj6 = null;
        this._obj7 = null;
        this._obj8 = null;
        this._obj9 = null;
        this._constructionCounter = 0;
        this._inheritQueries(parent);
        this._buildQueries();
    }
    ElementInjector.prototype.dehydrate = function () {
        this._host = null;
        this._preBuiltObjects = null;
        this._lightDomAppInjector = null;
        this._shadowDomAppInjector = null;
        var p = this._proto;
        if (p._binding0 instanceof DirectiveBinding && p._binding0.callOnDestroy) {
            this._obj0.onDestroy();
        }
        if (p._binding1 instanceof DirectiveBinding && p._binding1.callOnDestroy) {
            this._obj1.onDestroy();
        }
        if (p._binding2 instanceof DirectiveBinding && p._binding2.callOnDestroy) {
            this._obj2.onDestroy();
        }
        if (p._binding3 instanceof DirectiveBinding && p._binding3.callOnDestroy) {
            this._obj3.onDestroy();
        }
        if (p._binding4 instanceof DirectiveBinding && p._binding4.callOnDestroy) {
            this._obj4.onDestroy();
        }
        if (p._binding5 instanceof DirectiveBinding && p._binding5.callOnDestroy) {
            this._obj5.onDestroy();
        }
        if (p._binding6 instanceof DirectiveBinding && p._binding6.callOnDestroy) {
            this._obj6.onDestroy();
        }
        if (p._binding7 instanceof DirectiveBinding && p._binding7.callOnDestroy) {
            this._obj7.onDestroy();
        }
        if (p._binding8 instanceof DirectiveBinding && p._binding8.callOnDestroy) {
            this._obj8.onDestroy();
        }
        if (p._binding9 instanceof DirectiveBinding && p._binding9.callOnDestroy) {
            this._obj9.onDestroy();
        }
        if (lang_1.isPresent(this._dynamicallyCreatedComponentBinding) &&
            this._dynamicallyCreatedComponentBinding.callOnDestroy) {
            this._dynamicallyCreatedComponent.onDestroy();
        }
        this._obj0 = null;
        this._obj1 = null;
        this._obj2 = null;
        this._obj3 = null;
        this._obj4 = null;
        this._obj5 = null;
        this._obj6 = null;
        this._obj7 = null;
        this._obj8 = null;
        this._obj9 = null;
        this._dynamicallyCreatedComponent = null;
        this._dynamicallyCreatedComponentBinding = null;
        this._constructionCounter = 0;
    };
    ElementInjector.prototype.hydrate = function (injector, host, preBuiltObjects) {
        var p = this._proto;
        this._host = host;
        this._lightDomAppInjector = injector;
        this._preBuiltObjects = preBuiltObjects;
        if (p._firstBindingIsComponent) {
            this._shadowDomAppInjector =
                this._createShadowDomAppInjector(p._binding0, injector);
        }
        this._checkShadowDomAppInjector(this._shadowDomAppInjector);
        if (lang_1.isPresent(p._keyId0))
            this._getObjByKeyId(p._keyId0, LIGHT_DOM_AND_SHADOW_DOM);
        if (lang_1.isPresent(p._keyId1))
            this._getObjByKeyId(p._keyId1, LIGHT_DOM_AND_SHADOW_DOM);
        if (lang_1.isPresent(p._keyId2))
            this._getObjByKeyId(p._keyId2, LIGHT_DOM_AND_SHADOW_DOM);
        if (lang_1.isPresent(p._keyId3))
            this._getObjByKeyId(p._keyId3, LIGHT_DOM_AND_SHADOW_DOM);
        if (lang_1.isPresent(p._keyId4))
            this._getObjByKeyId(p._keyId4, LIGHT_DOM_AND_SHADOW_DOM);
        if (lang_1.isPresent(p._keyId5))
            this._getObjByKeyId(p._keyId5, LIGHT_DOM_AND_SHADOW_DOM);
        if (lang_1.isPresent(p._keyId6))
            this._getObjByKeyId(p._keyId6, LIGHT_DOM_AND_SHADOW_DOM);
        if (lang_1.isPresent(p._keyId7))
            this._getObjByKeyId(p._keyId7, LIGHT_DOM_AND_SHADOW_DOM);
        if (lang_1.isPresent(p._keyId8))
            this._getObjByKeyId(p._keyId8, LIGHT_DOM_AND_SHADOW_DOM);
        if (lang_1.isPresent(p._keyId9))
            this._getObjByKeyId(p._keyId9, LIGHT_DOM_AND_SHADOW_DOM);
    };
    ElementInjector.prototype._createShadowDomAppInjector = function (componentDirective, appInjector) {
        if (!collection_1.ListWrapper.isEmpty(componentDirective.resolvedAppInjectables)) {
            return appInjector.createChildFromResolved(componentDirective.resolvedAppInjectables);
        }
        else {
            return appInjector;
        }
    };
    ElementInjector.prototype.dynamicallyCreateComponent = function (componentDirective, parentInjector) {
        this._shadowDomAppInjector =
            this._createShadowDomAppInjector(componentDirective, parentInjector);
        this._dynamicallyCreatedComponentBinding = componentDirective;
        this._dynamicallyCreatedComponent = this._new(this._dynamicallyCreatedComponentBinding);
        return this._dynamicallyCreatedComponent;
    };
    ElementInjector.prototype._checkShadowDomAppInjector = function (shadowDomAppInjector) {
        if (this._proto._firstBindingIsComponent && lang_1.isBlank(shadowDomAppInjector)) {
            throw new lang_1.BaseException('A shadowDomAppInjector is required as this ElementInjector contains a component');
        }
        else if (!this._proto._firstBindingIsComponent && lang_1.isPresent(shadowDomAppInjector)) {
            throw new lang_1.BaseException('No shadowDomAppInjector allowed as there is not component stored in this ElementInjector');
        }
    };
    ElementInjector.prototype.get = function (token) {
        if (this._isDynamicallyLoadedComponent(token)) {
            return this._dynamicallyCreatedComponent;
        }
        return this._getByKey(di_1.Key.get(token), visibility_1.self, false, null);
    };
    ElementInjector.prototype._isDynamicallyLoadedComponent = function (token) {
        return lang_1.isPresent(this._dynamicallyCreatedComponentBinding) &&
            di_1.Key.get(token) === this._dynamicallyCreatedComponentBinding.key;
    };
    ElementInjector.prototype.hasDirective = function (type) {
        return this._getObjByKeyId(di_1.Key.get(type).id, LIGHT_DOM_AND_SHADOW_DOM) !== _undefined;
    };
    ElementInjector.prototype.getEventEmitterAccessors = function () { return this._proto.eventEmitterAccessors; };
    ElementInjector.prototype.getHostActionAccessors = function () { return this._proto.hostActionAccessors; };
    ElementInjector.prototype.getComponent = function () { return this._obj0; };
    ElementInjector.prototype.getElementRef = function () {
        return new element_ref_1.ElementRef(new view_ref_1.ViewRef(this._preBuiltObjects.view), this._proto.index);
    };
    ElementInjector.prototype.getViewContainerRef = function () {
        return new view_container_ref_1.ViewContainerRef(this._preBuiltObjects.viewManager, this.getElementRef());
    };
    ElementInjector.prototype.getDynamicallyLoadedComponent = function () { return this._dynamicallyCreatedComponent; };
    ElementInjector.prototype.directParent = function () { return this._proto.distanceToParent < 2 ? this.parent : null; };
    ElementInjector.prototype._isComponentKey = function (key) {
        return this._proto._firstBindingIsComponent && lang_1.isPresent(key) && key.id === this._proto._keyId0;
    };
    ElementInjector.prototype._isDynamicallyLoadedComponentKey = function (key) {
        return lang_1.isPresent(this._dynamicallyCreatedComponentBinding) &&
            key.id === this._dynamicallyCreatedComponentBinding.key.id;
    };
    ElementInjector.prototype._new = function (binding) {
        if (this._constructionCounter++ > _MAX_DIRECTIVE_CONSTRUCTION_COUNTER) {
            throw new di_1.CyclicDependencyError(binding.key);
        }
        var factory = binding.factory;
        var deps = binding.dependencies;
        var length = deps.length;
        var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;
        try {
            d0 = length > 0 ? this._getByDependency(deps[0], binding.key) : null;
            d1 = length > 1 ? this._getByDependency(deps[1], binding.key) : null;
            d2 = length > 2 ? this._getByDependency(deps[2], binding.key) : null;
            d3 = length > 3 ? this._getByDependency(deps[3], binding.key) : null;
            d4 = length > 4 ? this._getByDependency(deps[4], binding.key) : null;
            d5 = length > 5 ? this._getByDependency(deps[5], binding.key) : null;
            d6 = length > 6 ? this._getByDependency(deps[6], binding.key) : null;
            d7 = length > 7 ? this._getByDependency(deps[7], binding.key) : null;
            d8 = length > 8 ? this._getByDependency(deps[8], binding.key) : null;
            d9 = length > 9 ? this._getByDependency(deps[9], binding.key) : null;
        }
        catch (e) {
            if (e instanceof di_1.AbstractBindingError)
                e.addKey(binding.key);
            throw e;
        }
        var obj;
        switch (length) {
            case 0:
                obj = factory();
                break;
            case 1:
                obj = factory(d0);
                break;
            case 2:
                obj = factory(d0, d1);
                break;
            case 3:
                obj = factory(d0, d1, d2);
                break;
            case 4:
                obj = factory(d0, d1, d2, d3);
                break;
            case 5:
                obj = factory(d0, d1, d2, d3, d4);
                break;
            case 6:
                obj = factory(d0, d1, d2, d3, d4, d5);
                break;
            case 7:
                obj = factory(d0, d1, d2, d3, d4, d5, d6);
                break;
            case 8:
                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7);
                break;
            case 9:
                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8);
                break;
            case 10:
                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9);
                break;
            default:
                throw "Directive " + binding.key.token + " can only have up to 10 dependencies.";
        }
        this._addToQueries(obj, binding.key.token);
        return obj;
    };
    ElementInjector.prototype._getByDependency = function (dep, requestor) {
        if (!(dep instanceof DirectiveDependency)) {
            return this._getByKey(dep.key, dep.visibility, dep.optional, requestor);
        }
        var dirDep = dep;
        if (lang_1.isPresent(dirDep.attributeName))
            return this._buildAttribute(dirDep);
        if (lang_1.isPresent(dirDep.queryDirective))
            return this._findQuery(dirDep.queryDirective).list;
        if (dirDep.key.id === StaticKeys.instance().changeDetectorRefId) {
            var componentView = this._preBuiltObjects.view.componentChildViews[this._proto.index];
            return componentView.changeDetector.ref;
        }
        if (dirDep.key.id === StaticKeys.instance().elementRefId) {
            return this.getElementRef();
        }
        if (dirDep.key.id === StaticKeys.instance().viewContainerId) {
            return this.getViewContainerRef();
        }
        if (dirDep.key.id === StaticKeys.instance().protoViewId) {
            if (lang_1.isBlank(this._preBuiltObjects.protoView)) {
                if (dirDep.optional) {
                    return null;
                }
                throw new di_1.NoBindingError(dirDep.key);
            }
            return new view_ref_1.ProtoViewRef(this._preBuiltObjects.protoView);
        }
        return this._getByKey(dirDep.key, dirDep.visibility, dirDep.optional, requestor);
    };
    ElementInjector.prototype._buildAttribute = function (dep) {
        var attributes = this._proto.attributes;
        if (lang_1.isPresent(attributes) && collection_1.MapWrapper.contains(attributes, dep.attributeName)) {
            return collection_1.MapWrapper.get(attributes, dep.attributeName);
        }
        else {
            return null;
        }
    };
    ElementInjector.prototype._buildQueriesForDeps = function (deps) {
        for (var i = 0; i < deps.length; i++) {
            var dep = deps[i];
            if (lang_1.isPresent(dep.queryDirective)) {
                this._createQueryRef(dep.queryDirective);
            }
        }
    };
    ElementInjector.prototype._createQueryRef = function (directive) {
        var queryList = new query_list_1.QueryList();
        if (lang_1.isBlank(this._query0)) {
            this._query0 = new QueryRef(directive, queryList, this);
        }
        else if (lang_1.isBlank(this._query1)) {
            this._query1 = new QueryRef(directive, queryList, this);
        }
        else if (lang_1.isBlank(this._query2)) {
            this._query2 = new QueryRef(directive, queryList, this);
        }
        else
            throw new QueryError();
    };
    ElementInjector.prototype._addToQueries = function (obj, token) {
        if (lang_1.isPresent(this._query0) && (this._query0.directive === token)) {
            this._query0.list.add(obj);
        }
        if (lang_1.isPresent(this._query1) && (this._query1.directive === token)) {
            this._query1.list.add(obj);
        }
        if (lang_1.isPresent(this._query2) && (this._query2.directive === token)) {
            this._query2.list.add(obj);
        }
    };
    // TODO(rado): unify with _addParentQueries.
    ElementInjector.prototype._inheritQueries = function (parent) {
        if (lang_1.isBlank(parent))
            return;
        if (lang_1.isPresent(parent._query0)) {
            this._query0 = parent._query0;
        }
        if (lang_1.isPresent(parent._query1)) {
            this._query1 = parent._query1;
        }
        if (lang_1.isPresent(parent._query2)) {
            this._query2 = parent._query2;
        }
    };
    ElementInjector.prototype._buildQueries = function () {
        if (lang_1.isBlank(this._proto))
            return;
        var p = this._proto;
        if (p._binding0 instanceof DirectiveBinding) {
            this._buildQueriesForDeps(p._binding0.dependencies);
        }
        if (p._binding1 instanceof DirectiveBinding) {
            this._buildQueriesForDeps(p._binding1.dependencies);
        }
        if (p._binding2 instanceof DirectiveBinding) {
            this._buildQueriesForDeps(p._binding2.dependencies);
        }
        if (p._binding3 instanceof DirectiveBinding) {
            this._buildQueriesForDeps(p._binding3.dependencies);
        }
        if (p._binding4 instanceof DirectiveBinding) {
            this._buildQueriesForDeps(p._binding4.dependencies);
        }
        if (p._binding5 instanceof DirectiveBinding) {
            this._buildQueriesForDeps(p._binding5.dependencies);
        }
        if (p._binding6 instanceof DirectiveBinding) {
            this._buildQueriesForDeps(p._binding6.dependencies);
        }
        if (p._binding7 instanceof DirectiveBinding) {
            this._buildQueriesForDeps(p._binding7.dependencies);
        }
        if (p._binding8 instanceof DirectiveBinding) {
            this._buildQueriesForDeps(p._binding8.dependencies);
        }
        if (p._binding9 instanceof DirectiveBinding) {
            this._buildQueriesForDeps(p._binding9.dependencies);
        }
    };
    ElementInjector.prototype._findQuery = function (token) {
        if (lang_1.isPresent(this._query0) && this._query0.directive === token) {
            return this._query0;
        }
        if (lang_1.isPresent(this._query1) && this._query1.directive === token) {
            return this._query1;
        }
        if (lang_1.isPresent(this._query2) && this._query2.directive === token) {
            return this._query2;
        }
        throw new lang_1.BaseException("Cannot find query for directive " + token + ".");
    };
    ElementInjector.prototype.link = function (parent) {
        parent.addChild(this);
        this._addParentQueries();
    };
    ElementInjector.prototype.linkAfter = function (parent, prevSibling) {
        parent.addChildAfter(this, prevSibling);
        this._addParentQueries();
    };
    ElementInjector.prototype._addParentQueries = function () {
        if (lang_1.isPresent(this.parent._query0)) {
            this._addQueryToTree(this.parent._query0);
            this.parent._query0.update();
        }
        if (lang_1.isPresent(this.parent._query1)) {
            this._addQueryToTree(this.parent._query1);
            this.parent._query1.update();
        }
        if (lang_1.isPresent(this.parent._query2)) {
            this._addQueryToTree(this.parent._query2);
            this.parent._query2.update();
        }
    };
    ElementInjector.prototype.unlink = function () {
        var queriesToUpDate = [];
        if (lang_1.isPresent(this.parent._query0)) {
            this._pruneQueryFromTree(this.parent._query0);
            collection_1.ListWrapper.push(queriesToUpDate, this.parent._query0);
        }
        if (lang_1.isPresent(this.parent._query1)) {
            this._pruneQueryFromTree(this.parent._query1);
            collection_1.ListWrapper.push(queriesToUpDate, this.parent._query1);
        }
        if (lang_1.isPresent(this.parent._query2)) {
            this._pruneQueryFromTree(this.parent._query2);
            collection_1.ListWrapper.push(queriesToUpDate, this.parent._query2);
        }
        this.remove();
        collection_1.ListWrapper.forEach(queriesToUpDate, function (q) { return q.update(); });
    };
    ElementInjector.prototype._pruneQueryFromTree = function (query) {
        this._removeQueryRef(query);
        var child = this._head;
        while (lang_1.isPresent(child)) {
            child._pruneQueryFromTree(query);
            child = child._next;
        }
    };
    ElementInjector.prototype._addQueryToTree = function (query) {
        this._assignQueryRef(query);
        var child = this._head;
        while (lang_1.isPresent(child)) {
            child._addQueryToTree(query);
            child = child._next;
        }
    };
    ElementInjector.prototype._assignQueryRef = function (query) {
        if (lang_1.isBlank(this._query0)) {
            this._query0 = query;
            return;
        }
        else if (lang_1.isBlank(this._query1)) {
            this._query1 = query;
            return;
        }
        else if (lang_1.isBlank(this._query2)) {
            this._query2 = query;
            return;
        }
        throw new QueryError();
    };
    ElementInjector.prototype._removeQueryRef = function (query) {
        if (this._query0 == query)
            this._query0 = null;
        if (this._query1 == query)
            this._query1 = null;
        if (this._query2 == query)
            this._query2 = null;
    };
    ElementInjector.prototype._getByKey = function (key, visibility, optional, requestor) {
        var ei = this;
        var currentVisibility = this._isComponentKey(requestor) ?
            LIGHT_DOM_AND_SHADOW_DOM :
            // and light dom dependencies
            LIGHT_DOM;
        var depth = visibility.depth;
        if (!visibility.shouldIncludeSelf()) {
            depth -= ei._proto.distanceToParent;
            if (lang_1.isPresent(ei._parent)) {
                ei = ei._parent;
            }
            else {
                ei = ei._host;
                currentVisibility = visibility.crossComponentBoundaries ? LIGHT_DOM : SHADOW_DOM;
            }
        }
        while (ei != null && depth >= 0) {
            var preBuiltObj = ei._getPreBuiltObjectByKeyId(key.id);
            if (preBuiltObj !== _undefined)
                return preBuiltObj;
            var dir = ei._getObjByKeyId(key.id, currentVisibility);
            if (dir !== _undefined)
                return dir;
            depth -= ei._proto.distanceToParent;
            // we check only one mode with the SHADOW_DOM visibility
            if (currentVisibility === SHADOW_DOM)
                break;
            if (lang_1.isPresent(ei._parent)) {
                ei = ei._parent;
            }
            else {
                ei = ei._host;
                currentVisibility = visibility.crossComponentBoundaries ? LIGHT_DOM : SHADOW_DOM;
            }
        }
        if (lang_1.isPresent(this._host) && this._host._isComponentKey(key)) {
            return this._host.getComponent();
        }
        else if (lang_1.isPresent(this._host) && this._host._isDynamicallyLoadedComponentKey(key)) {
            return this._host.getDynamicallyLoadedComponent();
        }
        else if (optional) {
            return this._appInjector(requestor).getOptional(key);
        }
        else {
            return this._appInjector(requestor).get(key);
        }
    };
    ElementInjector.prototype._appInjector = function (requestor) {
        if (lang_1.isPresent(requestor) &&
            (this._isComponentKey(requestor) || this._isDynamicallyLoadedComponentKey(requestor))) {
            return this._shadowDomAppInjector;
        }
        else {
            return this._lightDomAppInjector;
        }
    };
    ElementInjector.prototype._getPreBuiltObjectByKeyId = function (keyId) {
        var staticKeys = StaticKeys.instance();
        if (keyId === staticKeys.viewManagerId)
            return this._preBuiltObjects.viewManager;
        // TODO add other objects as needed
        return _undefined;
    };
    ElementInjector.prototype._getObjByKeyId = function (keyId, visibility) {
        var p = this._proto;
        if (p._keyId0 === keyId && (p._visibility0 & visibility) > 0) {
            if (lang_1.isBlank(this._obj0)) {
                this._obj0 = this._new(p._binding0);
            }
            return this._obj0;
        }
        if (p._keyId1 === keyId && (p._visibility1 & visibility) > 0) {
            if (lang_1.isBlank(this._obj1)) {
                this._obj1 = this._new(p._binding1);
            }
            return this._obj1;
        }
        if (p._keyId2 === keyId && (p._visibility2 & visibility) > 0) {
            if (lang_1.isBlank(this._obj2)) {
                this._obj2 = this._new(p._binding2);
            }
            return this._obj2;
        }
        if (p._keyId3 === keyId && (p._visibility3 & visibility) > 0) {
            if (lang_1.isBlank(this._obj3)) {
                this._obj3 = this._new(p._binding3);
            }
            return this._obj3;
        }
        if (p._keyId4 === keyId && (p._visibility4 & visibility) > 0) {
            if (lang_1.isBlank(this._obj4)) {
                this._obj4 = this._new(p._binding4);
            }
            return this._obj4;
        }
        if (p._keyId5 === keyId && (p._visibility5 & visibility) > 0) {
            if (lang_1.isBlank(this._obj5)) {
                this._obj5 = this._new(p._binding5);
            }
            return this._obj5;
        }
        if (p._keyId6 === keyId && (p._visibility6 & visibility) > 0) {
            if (lang_1.isBlank(this._obj6)) {
                this._obj6 = this._new(p._binding6);
            }
            return this._obj6;
        }
        if (p._keyId7 === keyId && (p._visibility7 & visibility) > 0) {
            if (lang_1.isBlank(this._obj7)) {
                this._obj7 = this._new(p._binding7);
            }
            return this._obj7;
        }
        if (p._keyId8 === keyId && (p._visibility8 & visibility) > 0) {
            if (lang_1.isBlank(this._obj8)) {
                this._obj8 = this._new(p._binding8);
            }
            return this._obj8;
        }
        if (p._keyId9 === keyId && (p._visibility9 & visibility) > 0) {
            if (lang_1.isBlank(this._obj9)) {
                this._obj9 = this._new(p._binding9);
            }
            return this._obj9;
        }
        return _undefined;
    };
    ElementInjector.prototype.getDirectiveAtIndex = function (index) {
        if (index == 0)
            return this._obj0;
        if (index == 1)
            return this._obj1;
        if (index == 2)
            return this._obj2;
        if (index == 3)
            return this._obj3;
        if (index == 4)
            return this._obj4;
        if (index == 5)
            return this._obj5;
        if (index == 6)
            return this._obj6;
        if (index == 7)
            return this._obj7;
        if (index == 8)
            return this._obj8;
        if (index == 9)
            return this._obj9;
        throw new OutOfBoundsAccess(index);
    };
    ElementInjector.prototype.hasInstances = function () { return this._constructionCounter > 0; };
    /** Gets whether this element is exporting a component instance as $implicit. */
    ElementInjector.prototype.isExportingComponent = function () { return this._proto.exportComponent; };
    /** Gets whether this element is exporting its element as $implicit. */
    ElementInjector.prototype.isExportingElement = function () { return this._proto.exportElement; };
    /** Get the name to which this element's $implicit is to be assigned. */
    ElementInjector.prototype.getExportImplicitName = function () { return this._proto.exportImplicitName; };
    ElementInjector.prototype.getLightDomAppInjector = function () { return this._lightDomAppInjector; };
    ElementInjector.prototype.getShadowDomAppInjector = function () { return this._shadowDomAppInjector; };
    ElementInjector.prototype.getHost = function () { return this._host; };
    ElementInjector.prototype.getBoundElementIndex = function () { return this._proto.index; };
    return ElementInjector;
})(TreeNode);
exports.ElementInjector = ElementInjector;
var OutOfBoundsAccess = (function (_super) {
    __extends(OutOfBoundsAccess, _super);
    function OutOfBoundsAccess(index) {
        _super.call(this);
        this.message = "Index " + index + " is out-of-bounds.";
    }
    OutOfBoundsAccess.prototype.toString = function () { return this.message; };
    return OutOfBoundsAccess;
})(lang_1.BaseException);
var QueryError = (function (_super) {
    __extends(QueryError, _super);
    // TODO(rado): pass the names of the active directives.
    function QueryError() {
        _super.call(this);
        this.message = 'Only 3 queries can be concurrently active in a template.';
    }
    QueryError.prototype.toString = function () { return this.message; };
    return QueryError;
})(lang_1.BaseException);
var QueryRef = (function () {
    function QueryRef(directive, list, originator) {
        this.directive = directive;
        this.list = list;
        this.originator = originator;
    }
    QueryRef.prototype.update = function () {
        var aggregator = [];
        this.visit(this.originator, aggregator);
        this.list.reset(aggregator);
    };
    QueryRef.prototype.visit = function (inj, aggregator) {
        if (lang_1.isBlank(inj))
            return;
        if (inj.hasDirective(this.directive)) {
            collection_1.ListWrapper.push(aggregator, inj.get(this.directive));
        }
        var child = inj._head;
        while (lang_1.isPresent(child)) {
            this.visit(child, aggregator);
            child = child._next;
        }
    };
    return QueryRef;
})();
exports.__esModule = true;
//# sourceMappingURL=element_injector.js.map