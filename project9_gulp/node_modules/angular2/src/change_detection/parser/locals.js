var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var Locals = (function () {
    function Locals(parent, current) {
        this.parent = parent;
        this.current = current;
    }
    Locals.prototype.contains = function (name) {
        if (collection_1.MapWrapper.contains(this.current, name)) {
            return true;
        }
        if (lang_1.isPresent(this.parent)) {
            return this.parent.contains(name);
        }
        return false;
    };
    Locals.prototype.get = function (name) {
        if (collection_1.MapWrapper.contains(this.current, name)) {
            return collection_1.MapWrapper.get(this.current, name);
        }
        if (lang_1.isPresent(this.parent)) {
            return this.parent.get(name);
        }
        throw new lang_1.BaseException("Cannot find '" + name + "'");
    };
    Locals.prototype.set = function (name, value) {
        // TODO(rado): consider removing this check if we can guarantee this is not
        // exposed to the public API.
        // TODO: vsavkin maybe it should check only the local map
        if (collection_1.MapWrapper.contains(this.current, name)) {
            collection_1.MapWrapper.set(this.current, name, value);
        }
        else {
            throw new lang_1.BaseException('Setting of new keys post-construction is not supported.');
        }
    };
    Locals.prototype.clearValues = function () { collection_1.MapWrapper.clearValues(this.current); };
    return Locals;
})();
exports.Locals = Locals;
exports.__esModule = true;
//# sourceMappingURL=locals.js.map