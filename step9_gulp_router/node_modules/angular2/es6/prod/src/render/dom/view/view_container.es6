import { ListWrapper } from 'angular2/src/facade/collection';
export class DomViewContainer {
    constructor() {
        // The order in this list matches the DOM order.
        this.views = [];
    }
    contentTagContainers() { return this.views; }
    nodes() {
        var r = [];
        for (var i = 0; i < this.views.length; ++i) {
            r = ListWrapper.concat(r, this.views[i].rootNodes);
        }
        return r;
    }
}
//# sourceMappingURL=view_container.js.map