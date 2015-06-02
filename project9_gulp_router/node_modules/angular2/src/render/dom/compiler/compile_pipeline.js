var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var compile_element_1 = require('./compile_element');
var compile_control_1 = require('./compile_control');
var proto_view_builder_1 = require('../view/proto_view_builder');
var api_1 = require('../../api');
/**
 * CompilePipeline for executing CompileSteps recursively for
 * all elements in a template.
 */
var CompilePipeline = (function () {
    function CompilePipeline(steps) {
        this._control = new compile_control_1.CompileControl(steps);
    }
    CompilePipeline.prototype.process = function (rootElement, protoViewType, compilationCtxtDescription) {
        if (protoViewType === void 0) { protoViewType = null; }
        if (compilationCtxtDescription === void 0) { compilationCtxtDescription = ''; }
        if (lang_1.isBlank(protoViewType)) {
            protoViewType = api_1.ProtoViewDto.COMPONENT_VIEW_TYPE;
        }
        var results = collection_1.ListWrapper.create();
        var rootCompileElement = new compile_element_1.CompileElement(rootElement, compilationCtxtDescription);
        rootCompileElement.inheritedProtoView = new proto_view_builder_1.ProtoViewBuilder(rootElement, protoViewType);
        rootCompileElement.isViewRoot = true;
        this._process(results, null, rootCompileElement, compilationCtxtDescription);
        return results;
    };
    CompilePipeline.prototype._process = function (results, parent, current, compilationCtxtDescription) {
        if (compilationCtxtDescription === void 0) { compilationCtxtDescription = ''; }
        var additionalChildren = this._control.internalProcess(results, 0, parent, current);
        if (current.compileChildren) {
            var node = dom_adapter_1.DOM.firstChild(dom_adapter_1.DOM.templateAwareRoot(current.element));
            while (lang_1.isPresent(node)) {
                // compiliation can potentially move the node, so we need to store the
                // next sibling before recursing.
                var nextNode = dom_adapter_1.DOM.nextSibling(node);
                if (dom_adapter_1.DOM.isElementNode(node)) {
                    var childCompileElement = new compile_element_1.CompileElement(node, compilationCtxtDescription);
                    childCompileElement.inheritedProtoView = current.inheritedProtoView;
                    childCompileElement.inheritedElementBinder = current.inheritedElementBinder;
                    childCompileElement.distanceToInheritedBinder = current.distanceToInheritedBinder + 1;
                    this._process(results, current, childCompileElement);
                }
                node = nextNode;
            }
        }
        if (lang_1.isPresent(additionalChildren)) {
            for (var i = 0; i < additionalChildren.length; i++) {
                this._process(results, current, additionalChildren[i]);
            }
        }
    };
    return CompilePipeline;
})();
exports.CompilePipeline = CompilePipeline;
exports.__esModule = true;
//# sourceMappingURL=compile_pipeline.js.map