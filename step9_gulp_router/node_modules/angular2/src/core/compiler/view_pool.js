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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var di_1 = require('angular2/di');
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
// TODO(tbosch): Make this an OpaqueToken as soon as our transpiler supports this!
exports.APP_VIEW_POOL_CAPACITY = 'AppViewPool.viewPoolCapacity';
var AppViewPool = (function () {
    function AppViewPool(poolCapacityPerProtoView) {
        this._poolCapacityPerProtoView = poolCapacityPerProtoView;
        this._pooledViewsPerProtoView = collection_1.MapWrapper.create();
    }
    AppViewPool.prototype.getView = function (protoView) {
        var pooledViews = collection_1.MapWrapper.get(this._pooledViewsPerProtoView, protoView);
        if (lang_1.isPresent(pooledViews) && pooledViews.length > 0) {
            return collection_1.ListWrapper.removeLast(pooledViews);
        }
        return null;
    };
    AppViewPool.prototype.returnView = function (view) {
        var protoView = view.proto;
        var pooledViews = collection_1.MapWrapper.get(this._pooledViewsPerProtoView, protoView);
        if (lang_1.isBlank(pooledViews)) {
            pooledViews = [];
            collection_1.MapWrapper.set(this._pooledViewsPerProtoView, protoView, pooledViews);
        }
        if (pooledViews.length < this._poolCapacityPerProtoView) {
            collection_1.ListWrapper.push(pooledViews, view);
        }
    };
    AppViewPool = __decorate([
        __param(0, di_1.Inject(exports.APP_VIEW_POOL_CAPACITY)), 
        __metadata('design:paramtypes', [Object])
    ], AppViewPool);
    return AppViewPool;
})();
exports.AppViewPool = AppViewPool;
exports.__esModule = true;
//# sourceMappingURL=view_pool.js.map