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
__export(require('./src/core/compiler/compiler'));
__export(require('./src/core/compiler/interfaces'));
__export(require('./src/core/compiler/query_list'));
__export(require('./src/core/compiler/directive_resolver'));
__export(require('./src/core/compiler/dynamic_component_loader'));
var view_ref_1 = require('./src/core/compiler/view_ref');
exports.ViewRef = view_ref_1.ViewRef;
exports.ProtoViewRef = view_ref_1.ProtoViewRef;
var view_container_ref_1 = require('./src/core/compiler/view_container_ref');
exports.ViewContainerRef = view_container_ref_1.ViewContainerRef;
var element_ref_1 = require('./src/core/compiler/element_ref');
exports.ElementRef = element_ref_1.ElementRef;
var ng_zone_1 = require('./src/core/zone/ng_zone');
exports.NgZone = ng_zone_1.NgZone;
exports.__esModule = true;
//# sourceMappingURL=core.js.map