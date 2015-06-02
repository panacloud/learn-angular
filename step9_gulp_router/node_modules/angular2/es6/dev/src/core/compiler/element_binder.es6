import { isBlank, isPresent, BaseException } from 'angular2/src/facade/lang';
export class ElementBinder {
    constructor(index, parent, distanceToParent, protoElementInjector, componentDirective) {
        this.index = index;
        this.parent = parent;
        this.distanceToParent = distanceToParent;
        this.protoElementInjector = protoElementInjector;
        this.componentDirective = componentDirective;
        if (isBlank(index)) {
            throw new BaseException('null index not allowed.');
        }
        // updated later when events are bound
        this.hostListeners = null;
        // updated later, so we are able to resolve cycles
        this.nestedProtoView = null;
    }
    hasStaticComponent() {
        return isPresent(this.componentDirective) && isPresent(this.nestedProtoView);
    }
    hasDynamicComponent() {
        return isPresent(this.componentDirective) && isBlank(this.nestedProtoView);
    }
    hasEmbeddedProtoView() {
        return !isPresent(this.componentDirective) && isPresent(this.nestedProtoView);
    }
}
//# sourceMappingURL=element_binder.js.map