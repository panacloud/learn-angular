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
var annotations_1 = require('angular2/annotations');
var core_1 = require('angular2/core');
var lang_1 = require('angular2/src/facade/lang');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var CSSClass = (function () {
    function CSSClass(ngEl) {
        this._domEl = ngEl.domElement;
    }
    CSSClass.prototype._toggleClass = function (className, enabled) {
        if (enabled) {
            dom_adapter_1.DOM.addClass(this._domEl, className);
        }
        else {
            dom_adapter_1.DOM.removeClass(this._domEl, className);
        }
    };
    Object.defineProperty(CSSClass.prototype, "iterableChanges", {
        set: function (changes) {
            var _this = this;
            if (lang_1.isPresent(changes)) {
                changes.forEachAddedItem(function (record) { _this._toggleClass(record.key, record.currentValue); });
                changes.forEachChangedItem(function (record) { _this._toggleClass(record.key, record.currentValue); });
                changes.forEachRemovedItem(function (record) {
                    if (record.previousValue) {
                        dom_adapter_1.DOM.removeClass(_this._domEl, record.key);
                    }
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    CSSClass = __decorate([
        annotations_1.Directive({ selector: '[class]', properties: ['iterableChanges: class | keyValDiff'] }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], CSSClass);
    return CSSClass;
})();
exports.CSSClass = CSSClass;
exports.__esModule = true;
//# sourceMappingURL=class.js.map