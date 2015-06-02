var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var view_ref_1 = require('./view_ref');
/**
 * @exportedAs angular2/core
 */
var ViewContainerRef = (function () {
    function ViewContainerRef(viewManager, element) {
        this.viewManager = viewManager;
        this.element = element;
    }
    ViewContainerRef.prototype._getViews = function () {
        var vc = view_ref_1.internalView(this.element.parentView).viewContainers[this.element.boundElementIndex];
        return lang_1.isPresent(vc) ? vc.views : [];
    };
    ViewContainerRef.prototype.clear = function () {
        for (var i = this.length - 1; i >= 0; i--) {
            this.remove(i);
        }
    };
    ViewContainerRef.prototype.get = function (index) { return new view_ref_1.ViewRef(this._getViews()[index]); };
    Object.defineProperty(ViewContainerRef.prototype, "length", {
        get: function () { return this._getViews().length; },
        enumerable: true,
        configurable: true
    });
    // TODO(rado): profile and decide whether bounds checks should be added
    // to the methods below.
    ViewContainerRef.prototype.create = function (protoViewRef, atIndex, context, injector) {
        if (protoViewRef === void 0) { protoViewRef = null; }
        if (atIndex === void 0) { atIndex = -1; }
        if (context === void 0) { context = null; }
        if (injector === void 0) { injector = null; }
        if (atIndex == -1)
            atIndex = this.length;
        return this.viewManager.createViewInContainer(this.element, atIndex, protoViewRef, context, injector);
    };
    ViewContainerRef.prototype.insert = function (viewRef, atIndex) {
        if (atIndex === void 0) { atIndex = -1; }
        if (atIndex == -1)
            atIndex = this.length;
        return this.viewManager.attachViewInContainer(this.element, atIndex, viewRef);
    };
    ViewContainerRef.prototype.indexOf = function (viewRef) { return collection_1.ListWrapper.indexOf(this._getViews(), view_ref_1.internalView(viewRef)); };
    ViewContainerRef.prototype.remove = function (atIndex) {
        if (atIndex === void 0) { atIndex = -1; }
        if (atIndex == -1)
            atIndex = this.length - 1;
        this.viewManager.destroyViewInContainer(this.element, atIndex);
        // view is intentionally not returned to the client.
    };
    /**
     * The method can be used together with insert to implement a view move, i.e.
     * moving the dom nodes while the directives in the view stay intact.
     */
    ViewContainerRef.prototype.detach = function (atIndex) {
        if (atIndex === void 0) { atIndex = -1; }
        if (atIndex == -1)
            atIndex = this.length - 1;
        return this.viewManager.detachViewInContainer(this.element, atIndex);
    };
    return ViewContainerRef;
})();
exports.ViewContainerRef = ViewContainerRef;
exports.__esModule = true;
//# sourceMappingURL=view_container_ref.js.map