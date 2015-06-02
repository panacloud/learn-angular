import { ListWrapper } from 'angular2/src/facade/collection';
import { isPresent } from 'angular2/src/facade/lang';
import { ViewRef, internalView } from './view_ref';
/**
 * @exportedAs angular2/core
 */
export class ViewContainerRef {
    constructor(viewManager, element) {
        this.viewManager = viewManager;
        this.element = element;
    }
    _getViews() {
        var vc = internalView(this.element.parentView).viewContainers[this.element.boundElementIndex];
        return isPresent(vc) ? vc.views : [];
    }
    clear() {
        for (var i = this.length - 1; i >= 0; i--) {
            this.remove(i);
        }
    }
    get(index) { return new ViewRef(this._getViews()[index]); }
    get length() { return this._getViews().length; }
    // TODO(rado): profile and decide whether bounds checks should be added
    // to the methods below.
    create(protoViewRef = null, atIndex = -1, context = null, injector = null) {
        if (atIndex == -1)
            atIndex = this.length;
        return this.viewManager.createViewInContainer(this.element, atIndex, protoViewRef, context, injector);
    }
    insert(viewRef, atIndex = -1) {
        if (atIndex == -1)
            atIndex = this.length;
        return this.viewManager.attachViewInContainer(this.element, atIndex, viewRef);
    }
    indexOf(viewRef) { return ListWrapper.indexOf(this._getViews(), internalView(viewRef)); }
    remove(atIndex = -1) {
        if (atIndex == -1)
            atIndex = this.length - 1;
        this.viewManager.destroyViewInContainer(this.element, atIndex);
        // view is intentionally not returned to the client.
    }
    /**
     * The method can be used together with insert to implement a view move, i.e.
     * moving the dom nodes while the directives in the view stay intact.
     */
    detach(atIndex = -1) {
        if (atIndex == -1)
            atIndex = this.length - 1;
        return this.viewManager.detachViewInContainer(this.element, atIndex);
    }
}
//# sourceMappingURL=view_container_ref.js.map