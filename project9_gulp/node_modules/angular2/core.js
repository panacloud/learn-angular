function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
 * @module
 * @public
 * @description
 * Define angular core API here.
 */
__export(require('./src/core/annotations/visibility'));
__export(require('./src/core/annotations/view'));
__export(require('./src/core/application'));
__export(require('./src/core/application_tokens'));
__export(require('./src/core/annotations/di'));
__export(require('./src/core/compiler/query_list'));
__export(require('./src/core/compiler/compiler'));
// TODO(tbosch): remove this once render migration is complete
__export(require('./src/render/dom/compiler/template_loader'));
__export(require('./src/render/dom/shadow_dom/shadow_dom_strategy'));
__export(require('./src/render/dom/shadow_dom/native_shadow_dom_strategy'));
__export(require('./src/render/dom/shadow_dom/emulated_scoped_shadow_dom_strategy'));
__export(require('./src/render/dom/shadow_dom/emulated_unscoped_shadow_dom_strategy'));
__export(require('./src/core/compiler/dynamic_component_loader'));
var view_ref_1 = require('./src/core/compiler/view_ref');
exports.ViewRef = view_ref_1.ViewRef;
exports.ProtoViewRef = view_ref_1.ProtoViewRef;
var view_container_ref_1 = require('./src/core/compiler/view_container_ref');
exports.ViewContainerRef = view_container_ref_1.ViewContainerRef;
var element_ref_1 = require('./src/core/compiler/element_ref');
exports.ElementRef = element_ref_1.ElementRef;
exports.__esModule = true;
//# sourceMappingURL=core.js.map