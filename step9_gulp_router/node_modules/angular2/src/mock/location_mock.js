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
var test_lib_1 = require('angular2/test_lib');
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
var collection_1 = require('angular2/src/facade/collection');
var location_1 = require('angular2/src/router/location');
var SpyLocation = (function (_super) {
    __extends(SpyLocation, _super);
    function SpyLocation() {
        _super.call(this);
        this._path = '/';
        this.urlChanges = collection_1.ListWrapper.create();
        this._subject = new async_1.EventEmitter();
        this._baseHref = '';
    }
    SpyLocation.prototype.setInitialPath = function (url) { this._path = url; };
    SpyLocation.prototype.setBaseHref = function (url) { this._baseHref = url; };
    SpyLocation.prototype.path = function () { return this._path; };
    SpyLocation.prototype.simulateUrlPop = function (pathname) { async_1.ObservableWrapper.callNext(this._subject, { 'url': pathname }); };
    SpyLocation.prototype.normalizeAbsolutely = function (url) { return this._baseHref + url; };
    SpyLocation.prototype.go = function (url) {
        url = this.normalizeAbsolutely(url);
        if (this._path == url) {
            return;
        }
        this._path = url;
        collection_1.ListWrapper.push(this.urlChanges, url);
    };
    SpyLocation.prototype.forward = function () {
        // TODO
    };
    SpyLocation.prototype.back = function () {
        // TODO
    };
    SpyLocation.prototype.subscribe = function (onNext, onThrow, onReturn) {
        if (onThrow === void 0) { onThrow = null; }
        if (onReturn === void 0) { onReturn = null; }
        async_1.ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
    };
    SpyLocation.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyLocation = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(location_1.Location), 
        __metadata('design:paramtypes', [])
    ], SpyLocation);
    return SpyLocation;
})(test_lib_1.SpyObject);
exports.SpyLocation = SpyLocation;
exports.__esModule = true;
//# sourceMappingURL=location_mock.js.map