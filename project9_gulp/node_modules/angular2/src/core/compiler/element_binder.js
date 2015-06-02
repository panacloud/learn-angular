var lang_1 = require('angular2/src/facade/lang');
var ElementBinder = (function () {
    function ElementBinder(index, parent, distanceToParent, protoElementInjector, componentDirective) {
        this.index = index;
        this.parent = parent;
        this.distanceToParent = distanceToParent;
        this.protoElementInjector = protoElementInjector;
        this.componentDirective = componentDirective;
        if (lang_1.isBlank(index)) {
            throw new lang_1.BaseException('null index not allowed.');
        }
        // updated later when events are bound
        this.hostListeners = null;
        // updated later, so we are able to resolve cycles
        this.nestedProtoView = null;
    }
    ElementBinder.prototype.hasStaticComponent = function () {
        return lang_1.isPresent(this.componentDirective) && lang_1.isPresent(this.nestedProtoView);
    };
    ElementBinder.prototype.hasDynamicComponent = function () {
        return lang_1.isPresent(this.componentDirective) && lang_1.isBlank(this.nestedProtoView);
    };
    ElementBinder.prototype.hasEmbeddedProtoView = function () {
        return !lang_1.isPresent(this.componentDirective) && lang_1.isPresent(this.nestedProtoView);
    };
    return ElementBinder;
})();
exports.ElementBinder = ElementBinder;
exports.__esModule = true;
//# sourceMappingURL=element_binder.js.map