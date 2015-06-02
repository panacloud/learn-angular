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
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var getTestabilityModule = require('./get_testability');
/**
 * The Testability service provides testing hooks that can be accessed from
 * the browser and by services such as Protractor. Each bootstrapped Angular
 * application on the page will have an instance of Testability.
 */
var Testability = (function () {
    function Testability() {
        this._pendingCount = 0;
        this._callbacks = collection_1.ListWrapper.create();
    }
    Testability.prototype.increaseCount = function (delta) {
        if (delta === void 0) { delta = 1; }
        this._pendingCount += delta;
        if (this._pendingCount < 0) {
            throw new lang_1.BaseException('pending async requests below zero');
        }
        else if (this._pendingCount == 0) {
            this._runCallbacks();
        }
        return this._pendingCount;
    };
    Testability.prototype._runCallbacks = function () {
        while (this._callbacks.length !== 0) {
            collection_1.ListWrapper.removeLast(this._callbacks)();
        }
    };
    Testability.prototype.whenStable = function (callback) {
        collection_1.ListWrapper.push(this._callbacks, callback);
        if (this._pendingCount === 0) {
            this._runCallbacks();
        }
        // TODO(juliemr) - hook into the zone api.
    };
    Testability.prototype.getPendingCount = function () { return this._pendingCount; };
    Testability.prototype.findBindings = function (using, binding, exactMatch) {
        // TODO(juliemr): implement.
        return [];
    };
    Testability = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Testability);
    return Testability;
})();
exports.Testability = Testability;
var TestabilityRegistry = (function () {
    function TestabilityRegistry() {
        this._applications = collection_1.MapWrapper.create();
        getTestabilityModule.GetTestability.addToWindow(this);
    }
    TestabilityRegistry.prototype.registerApplication = function (token, testability) {
        collection_1.MapWrapper.set(this._applications, token, testability);
    };
    TestabilityRegistry.prototype.findTestabilityInTree = function (elem) {
        if (elem == null) {
            return null;
        }
        if (collection_1.MapWrapper.contains(this._applications, elem)) {
            return collection_1.MapWrapper.get(this._applications, elem);
        }
        if (dom_adapter_1.DOM.isShadowRoot(elem)) {
            return this.findTestabilityInTree(dom_adapter_1.DOM.getHost(elem));
        }
        return this.findTestabilityInTree(dom_adapter_1.DOM.parentElement(elem));
    };
    TestabilityRegistry = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TestabilityRegistry);
    return TestabilityRegistry;
})();
exports.TestabilityRegistry = TestabilityRegistry;
exports.__esModule = true;
//# sourceMappingURL=testability.js.map