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
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var di_1 = require('angular2/di');
var BrowserLocation = (function () {
    function BrowserLocation() {
        this._location = dom_adapter_1.DOM.getLocation();
        this._history = dom_adapter_1.DOM.getHistory();
        this._baseHref = dom_adapter_1.DOM.getBaseHref();
    }
    BrowserLocation.prototype.onPopState = function (fn) {
        dom_adapter_1.DOM.getGlobalEventTarget('window').addEventListener('popstate', fn, false);
    };
    BrowserLocation.prototype.getBaseHref = function () { return this._baseHref; };
    BrowserLocation.prototype.path = function () { return this._location.pathname; };
    BrowserLocation.prototype.pushState = function (state, title, url) { this._history.pushState(state, title, url); };
    BrowserLocation.prototype.forward = function () { this._history.forward(); };
    BrowserLocation.prototype.back = function () { this._history.back(); };
    BrowserLocation = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BrowserLocation);
    return BrowserLocation;
})();
exports.BrowserLocation = BrowserLocation;
exports.__esModule = true;
//# sourceMappingURL=browser_location.js.map