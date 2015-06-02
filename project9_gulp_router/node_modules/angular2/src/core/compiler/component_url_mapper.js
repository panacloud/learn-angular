var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var di_1 = require('angular2/di');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var ComponentUrlMapper = (function () {
    function ComponentUrlMapper() {
    }
    // Returns the base URL to the component source file.
    // The returned URL could be:
    // - an absolute URL,
    // - a path relative to the application
    ComponentUrlMapper.prototype.getUrl = function (component) { return './'; };
    ComponentUrlMapper = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ComponentUrlMapper);
    return ComponentUrlMapper;
})();
exports.ComponentUrlMapper = ComponentUrlMapper;
var RuntimeComponentUrlMapper = (function (_super) {
    __extends(RuntimeComponentUrlMapper, _super);
    function RuntimeComponentUrlMapper() {
        _super.call(this);
        this._componentUrls = collection_1.MapWrapper.create();
    }
    RuntimeComponentUrlMapper.prototype.setComponentUrl = function (component, url) {
        collection_1.MapWrapper.set(this._componentUrls, component, url);
    };
    RuntimeComponentUrlMapper.prototype.getUrl = function (component) {
        var url = collection_1.MapWrapper.get(this._componentUrls, component);
        if (lang_1.isPresent(url))
            return url;
        return _super.prototype.getUrl.call(this, component);
    };
    return RuntimeComponentUrlMapper;
})(ComponentUrlMapper);
exports.RuntimeComponentUrlMapper = RuntimeComponentUrlMapper;
exports.__esModule = true;
//# sourceMappingURL=component_url_mapper.js.map