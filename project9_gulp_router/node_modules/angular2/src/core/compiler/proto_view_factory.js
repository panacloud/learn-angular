var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var di_1 = require('angular2/di');
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var reflection_1 = require('angular2/src/reflection/reflection');
var change_detection_1 = require('angular2/change_detection');
var renderApi = require('angular2/src/render/api');
var view_1 = require('./view');
var element_injector_1 = require('./element_injector');
var BindingRecordsCreator = (function () {
    function BindingRecordsCreator() {
        this._directiveRecordsMap = collection_1.MapWrapper.create();
        this._textNodeIndex = 0;
    }
    BindingRecordsCreator.prototype.getBindingRecords = function (elementBinders, allDirectiveMetadatas) {
        var bindings = [];
        for (var boundElementIndex = 0; boundElementIndex < elementBinders.length; boundElementIndex++) {
            var renderElementBinder = elementBinders[boundElementIndex];
            this._createTextNodeRecords(bindings, renderElementBinder);
            this._createElementPropertyRecords(bindings, boundElementIndex, renderElementBinder);
            this._createDirectiveRecords(bindings, boundElementIndex, renderElementBinder.directives, allDirectiveMetadatas);
        }
        return bindings;
    };
    BindingRecordsCreator.prototype.getDirectiveRecords = function (elementBinders, allDirectiveMetadatas) {
        var directiveRecords = [];
        for (var elementIndex = 0; elementIndex < elementBinders.length; ++elementIndex) {
            var dirs = elementBinders[elementIndex].directives;
            for (var dirIndex = 0; dirIndex < dirs.length; ++dirIndex) {
                collection_1.ListWrapper.push(directiveRecords, this._getDirectiveRecord(elementIndex, dirIndex, allDirectiveMetadatas[dirs[dirIndex].directiveIndex]));
            }
        }
        return directiveRecords;
    };
    BindingRecordsCreator.prototype._createTextNodeRecords = function (bindings, renderElementBinder) {
        var _this = this;
        if (lang_1.isBlank(renderElementBinder.textBindings))
            return;
        collection_1.ListWrapper.forEach(renderElementBinder.textBindings, function (b) {
            collection_1.ListWrapper.push(bindings, change_detection_1.BindingRecord.createForTextNode(b, _this._textNodeIndex++));
        });
    };
    BindingRecordsCreator.prototype._createElementPropertyRecords = function (bindings, boundElementIndex, renderElementBinder) {
        collection_1.MapWrapper.forEach(renderElementBinder.propertyBindings, function (astWithSource, propertyName) {
            collection_1.ListWrapper.push(bindings, change_detection_1.BindingRecord.createForElement(astWithSource, boundElementIndex, propertyName));
        });
    };
    BindingRecordsCreator.prototype._createDirectiveRecords = function (bindings, boundElementIndex, directiveBinders, allDirectiveMetadatas) {
        var _this = this;
        for (var i = 0; i < directiveBinders.length; i++) {
            var directiveBinder = directiveBinders[i];
            var directiveMetadata = allDirectiveMetadatas[directiveBinder.directiveIndex];
            // directive properties
            collection_1.MapWrapper.forEach(directiveBinder.propertyBindings, function (astWithSource, propertyName) {
                // TODO: these setters should eventually be created by change detection, to make
                // it monomorphic!
                var setter = reflection_1.reflector.setter(propertyName);
                var directiveRecord = _this._getDirectiveRecord(boundElementIndex, i, directiveMetadata);
                collection_1.ListWrapper.push(bindings, change_detection_1.BindingRecord.createForDirective(astWithSource, propertyName, setter, directiveRecord));
            });
            // host properties
            collection_1.MapWrapper.forEach(directiveBinder.hostPropertyBindings, function (astWithSource, propertyName) {
                var dirIndex = new change_detection_1.DirectiveIndex(boundElementIndex, i);
                collection_1.ListWrapper.push(bindings, change_detection_1.BindingRecord.createForHostProperty(dirIndex, astWithSource, propertyName));
            });
        }
    };
    BindingRecordsCreator.prototype._getDirectiveRecord = function (boundElementIndex, directiveIndex, directiveMetadata) {
        var id = boundElementIndex * 100 + directiveIndex;
        if (!collection_1.MapWrapper.contains(this._directiveRecordsMap, id)) {
            var changeDetection = directiveMetadata.changeDetection;
            collection_1.MapWrapper.set(this._directiveRecordsMap, id, new change_detection_1.DirectiveRecord(new change_detection_1.DirectiveIndex(boundElementIndex, directiveIndex), directiveMetadata.callOnAllChangesDone, directiveMetadata.callOnChange, changeDetection));
        }
        return collection_1.MapWrapper.get(this._directiveRecordsMap, id);
    };
    return BindingRecordsCreator;
})();
var ProtoViewFactory = (function () {
    function ProtoViewFactory(changeDetection) {
        this._changeDetection = changeDetection;
    }
    ProtoViewFactory.prototype.createAppProtoViews = function (hostComponentBinding, rootRenderProtoView, allDirectives) {
        var _this = this;
        var allRenderDirectiveMetadata = collection_1.ListWrapper.map(allDirectives, function (directiveBinding) { return directiveBinding.metadata; });
        var nestedPvsWithIndex = _collectNestedProtoViews(rootRenderProtoView);
        var nestedPvVariableBindings = _collectNestedProtoViewsVariableBindings(nestedPvsWithIndex);
        var nestedPvVariableNames = _collectNestedProtoViewsVariableNames(nestedPvsWithIndex, nestedPvVariableBindings);
        var changeDetectorDefs = _getChangeDetectorDefinitions(hostComponentBinding.metadata, nestedPvsWithIndex, nestedPvVariableNames, allRenderDirectiveMetadata);
        var protoChangeDetectors = collection_1.ListWrapper.map(changeDetectorDefs, function (changeDetectorDef) { return _this._changeDetection.createProtoChangeDetector(changeDetectorDef); });
        var appProtoViews = collection_1.ListWrapper.createFixedSize(nestedPvsWithIndex.length);
        collection_1.ListWrapper.forEach(nestedPvsWithIndex, function (pvWithIndex) {
            var appProtoView = _createAppProtoView(pvWithIndex.renderProtoView, protoChangeDetectors[pvWithIndex.index], nestedPvVariableBindings[pvWithIndex.index], allDirectives);
            if (lang_1.isPresent(pvWithIndex.parentIndex)) {
                var parentView = appProtoViews[pvWithIndex.parentIndex];
                parentView.elementBinders[pvWithIndex.boundElementIndex].nestedProtoView = appProtoView;
            }
            appProtoViews[pvWithIndex.index] = appProtoView;
        });
        return appProtoViews;
    };
    ProtoViewFactory = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [change_detection_1.ChangeDetection])
    ], ProtoViewFactory);
    return ProtoViewFactory;
})();
exports.ProtoViewFactory = ProtoViewFactory;
/**
 * Returns the data needed to create ChangeDetectors
 * for the given ProtoView and all nested ProtoViews.
 */
function getChangeDetectorDefinitions(hostComponentMetadata, rootRenderProtoView, allRenderDirectiveMetadata) {
    var nestedPvsWithIndex = _collectNestedProtoViews(rootRenderProtoView);
    var nestedPvVariableBindings = _collectNestedProtoViewsVariableBindings(nestedPvsWithIndex);
    var nestedPvVariableNames = _collectNestedProtoViewsVariableNames(nestedPvsWithIndex, nestedPvVariableBindings);
    return _getChangeDetectorDefinitions(hostComponentMetadata, nestedPvsWithIndex, nestedPvVariableNames, allRenderDirectiveMetadata);
}
exports.getChangeDetectorDefinitions = getChangeDetectorDefinitions;
function _collectNestedProtoViews(renderProtoView, parentIndex, boundElementIndex, result) {
    if (parentIndex === void 0) { parentIndex = null; }
    if (boundElementIndex === void 0) { boundElementIndex = null; }
    if (result === void 0) { result = null; }
    if (lang_1.isBlank(result)) {
        result = [];
    }
    collection_1.ListWrapper.push(result, new RenderProtoViewWithIndex(renderProtoView, result.length, parentIndex, boundElementIndex));
    var currentIndex = result.length - 1;
    var childBoundElementIndex = 0;
    collection_1.ListWrapper.forEach(renderProtoView.elementBinders, function (elementBinder) {
        if (lang_1.isPresent(elementBinder.nestedProtoView)) {
            _collectNestedProtoViews(elementBinder.nestedProtoView, currentIndex, childBoundElementIndex, result);
        }
        childBoundElementIndex++;
    });
    return result;
}
function _getChangeDetectorDefinitions(hostComponentMetadata, nestedPvsWithIndex, nestedPvVariableNames, allRenderDirectiveMetadata) {
    return collection_1.ListWrapper.map(nestedPvsWithIndex, function (pvWithIndex) {
        var elementBinders = pvWithIndex.renderProtoView.elementBinders;
        var bindingRecordsCreator = new BindingRecordsCreator();
        var bindingRecords = bindingRecordsCreator.getBindingRecords(elementBinders, allRenderDirectiveMetadata);
        var directiveRecords = bindingRecordsCreator.getDirectiveRecords(elementBinders, allRenderDirectiveMetadata);
        var strategyName = change_detection_1.DEFAULT;
        var typeString;
        if (pvWithIndex.renderProtoView.type === renderApi.ProtoViewDto.COMPONENT_VIEW_TYPE) {
            strategyName = hostComponentMetadata.changeDetection;
            typeString = 'comp';
        }
        else if (pvWithIndex.renderProtoView.type === renderApi.ProtoViewDto.HOST_VIEW_TYPE) {
            typeString = 'host';
        }
        else {
            typeString = 'embedded';
        }
        var id = hostComponentMetadata.id + "_" + typeString + "_" + pvWithIndex.index;
        var variableNames = nestedPvVariableNames[pvWithIndex.index];
        return new change_detection_1.ChangeDetectorDefinition(id, strategyName, variableNames, bindingRecords, directiveRecords);
    });
}
function _createAppProtoView(renderProtoView, protoChangeDetector, variableBindings, allDirectives) {
    var elementBinders = renderProtoView.elementBinders;
    var protoView = new view_1.AppProtoView(renderProtoView.render, protoChangeDetector, variableBindings);
    // TODO: vsavkin refactor to pass element binders into proto view
    _createElementBinders(protoView, elementBinders, allDirectives);
    _bindDirectiveEvents(protoView, elementBinders);
    return protoView;
}
function _collectNestedProtoViewsVariableBindings(nestedPvsWithIndex) {
    return collection_1.ListWrapper.map(nestedPvsWithIndex, function (pvWithIndex) {
        return _createVariableBindings(pvWithIndex.renderProtoView);
    });
}
function _createVariableBindings(renderProtoView) {
    var variableBindings = collection_1.MapWrapper.create();
    collection_1.MapWrapper.forEach(renderProtoView.variableBindings, function (mappedName, varName) {
        collection_1.MapWrapper.set(variableBindings, varName, mappedName);
    });
    collection_1.ListWrapper.forEach(renderProtoView.elementBinders, function (binder) {
        collection_1.MapWrapper.forEach(binder.variableBindings, function (mappedName, varName) {
            collection_1.MapWrapper.set(variableBindings, varName, mappedName);
        });
    });
    return variableBindings;
}
function _collectNestedProtoViewsVariableNames(nestedPvsWithIndex, nestedPvVariableBindings) {
    var nestedPvVariableNames = collection_1.ListWrapper.createFixedSize(nestedPvsWithIndex.length);
    collection_1.ListWrapper.forEach(nestedPvsWithIndex, function (pvWithIndex) {
        var parentVariableNames = lang_1.isPresent(pvWithIndex.parentIndex) ? nestedPvVariableNames[pvWithIndex.parentIndex] : null;
        nestedPvVariableNames[pvWithIndex.index] =
            _createVariableNames(parentVariableNames, nestedPvVariableBindings[pvWithIndex.index]);
    });
    return nestedPvVariableNames;
}
function _createVariableNames(parentVariableNames, variableBindings) {
    var variableNames = lang_1.isPresent(parentVariableNames) ? collection_1.ListWrapper.clone(parentVariableNames) : [];
    collection_1.MapWrapper.forEach(variableBindings, function (local, v) { collection_1.ListWrapper.push(variableNames, local); });
    return variableNames;
}
function _createElementBinders(protoView, elementBinders, allDirectiveBindings) {
    for (var i = 0; i < elementBinders.length; i++) {
        var renderElementBinder = elementBinders[i];
        var dirs = elementBinders[i].directives;
        var parentPeiWithDistance = _findParentProtoElementInjectorWithDistance(i, protoView.elementBinders, elementBinders);
        var directiveBindings = collection_1.ListWrapper.map(dirs, function (dir) { return allDirectiveBindings[dir.directiveIndex]; });
        var componentDirectiveBinding = null;
        if (directiveBindings.length > 0) {
            if (directiveBindings[0].metadata.type === renderApi.DirectiveMetadata.COMPONENT_TYPE) {
                componentDirectiveBinding = directiveBindings[0];
            }
        }
        var protoElementInjector = _createProtoElementInjector(i, parentPeiWithDistance, renderElementBinder, componentDirectiveBinding, directiveBindings);
        _createElementBinder(protoView, i, renderElementBinder, protoElementInjector, componentDirectiveBinding);
    }
}
function _findParentProtoElementInjectorWithDistance(binderIndex, elementBinders, renderElementBinders) {
    var distance = 0;
    do {
        var renderElementBinder = renderElementBinders[binderIndex];
        binderIndex = renderElementBinder.parentIndex;
        if (binderIndex !== -1) {
            distance += renderElementBinder.distanceToParent;
            var elementBinder = elementBinders[binderIndex];
            if (lang_1.isPresent(elementBinder.protoElementInjector)) {
                return new ParentProtoElementInjectorWithDistance(elementBinder.protoElementInjector, distance);
            }
        }
    } while (binderIndex !== -1);
    return new ParentProtoElementInjectorWithDistance(null, -1);
}
function _createProtoElementInjector(binderIndex, parentPeiWithDistance, renderElementBinder, componentDirectiveBinding, directiveBindings) {
    var protoElementInjector = null;
    // Create a protoElementInjector for any element that either has bindings *or* has one
    // or more var- defined. Elements with a var- defined need a their own element injector
    // so that, when hydrating, $implicit can be set to the element.
    var hasVariables = collection_1.MapWrapper.size(renderElementBinder.variableBindings) > 0;
    if (directiveBindings.length > 0 || hasVariables) {
        protoElementInjector = element_injector_1.ProtoElementInjector.create(parentPeiWithDistance.protoElementInjector, binderIndex, directiveBindings, lang_1.isPresent(componentDirectiveBinding), parentPeiWithDistance.distance);
        protoElementInjector.attributes = renderElementBinder.readAttributes;
        if (hasVariables) {
            protoElementInjector.exportComponent = lang_1.isPresent(componentDirectiveBinding);
            protoElementInjector.exportElement = lang_1.isBlank(componentDirectiveBinding);
            // experiment
            var exportImplicitName = collection_1.MapWrapper.get(renderElementBinder.variableBindings, '\$implicit');
            if (lang_1.isPresent(exportImplicitName)) {
                protoElementInjector.exportImplicitName = exportImplicitName;
            }
        }
    }
    return protoElementInjector;
}
function _createElementBinder(protoView, boundElementIndex, renderElementBinder, protoElementInjector, componentDirectiveBinding) {
    var parent = null;
    if (renderElementBinder.parentIndex !== -1) {
        parent = protoView.elementBinders[renderElementBinder.parentIndex];
    }
    var elBinder = protoView.bindElement(parent, renderElementBinder.distanceToParent, protoElementInjector, componentDirectiveBinding);
    protoView.bindEvent(renderElementBinder.eventBindings, boundElementIndex, -1);
    // variables
    // The view's locals needs to have a full set of variable names at construction time
    // in order to prevent new variables from being set later in the lifecycle. Since we don't want
    // to actually create variable bindings for the $implicit bindings, add to the
    // protoLocals manually.
    collection_1.MapWrapper.forEach(renderElementBinder.variableBindings, function (mappedName, varName) {
        collection_1.MapWrapper.set(protoView.protoLocals, mappedName, null);
    });
    return elBinder;
}
function _bindDirectiveEvents(protoView, elementBinders) {
    for (var boundElementIndex = 0; boundElementIndex < elementBinders.length; ++boundElementIndex) {
        var dirs = elementBinders[boundElementIndex].directives;
        for (var i = 0; i < dirs.length; i++) {
            var directiveBinder = dirs[i];
            // directive events
            protoView.bindEvent(directiveBinder.eventBindings, boundElementIndex, i);
        }
    }
}
var RenderProtoViewWithIndex = (function () {
    function RenderProtoViewWithIndex(renderProtoView, index, parentIndex, boundElementIndex) {
        this.renderProtoView = renderProtoView;
        this.index = index;
        this.parentIndex = parentIndex;
        this.boundElementIndex = boundElementIndex;
    }
    return RenderProtoViewWithIndex;
})();
var ParentProtoElementInjectorWithDistance = (function () {
    function ParentProtoElementInjectorWithDistance(protoElementInjector, distance) {
        this.protoElementInjector = protoElementInjector;
        this.distance = distance;
    }
    return ParentProtoElementInjectorWithDistance;
})();
exports.__esModule = true;
//# sourceMappingURL=proto_view_factory.js.map