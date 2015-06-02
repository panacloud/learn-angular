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
var async_1 = require('angular2/src/facade/async');
var xhr_1 = require('./xhr');
var XHRImpl = (function (_super) {
    __extends(XHRImpl, _super);
    function XHRImpl() {
        _super.apply(this, arguments);
    }
    XHRImpl.prototype.get = function (url) {
        var completer = async_1.PromiseWrapper.completer();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'text';
        xhr.onload = function () {
            var status = xhr.status;
            if (200 <= status && status <= 300) {
                completer.resolve(xhr.responseText);
            }
            else {
                completer.reject("Failed to load " + url, null);
            }
        };
        xhr.onerror = function () { completer.reject("Failed to load " + url, null); };
        xhr.send();
        return completer.promise;
    };
    XHRImpl = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], XHRImpl);
    return XHRImpl;
})(xhr_1.XHR);
exports.XHRImpl = XHRImpl;
exports.__esModule = true;
//# sourceMappingURL=xhr_impl.js.map