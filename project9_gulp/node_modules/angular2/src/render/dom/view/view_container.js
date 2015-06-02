var collection_1 = require('angular2/src/facade/collection');
var DomViewContainer = (function () {
    function DomViewContainer() {
        // The order in this list matches the DOM order.
        this.views = [];
    }
    DomViewContainer.prototype.contentTagContainers = function () { return this.views; };
    DomViewContainer.prototype.nodes = function () {
        var r = [];
        for (var i = 0; i < this.views.length; ++i) {
            r = collection_1.ListWrapper.concat(r, this.views[i].rootNodes);
        }
        return r;
    };
    return DomViewContainer;
})();
exports.DomViewContainer = DomViewContainer;
exports.__esModule = true;
//# sourceMappingURL=view_container.js.map