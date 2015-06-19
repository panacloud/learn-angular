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
/**
 * Removes or recreates a portion of the DOM tree based on an {expression}.
 *
 * If the expression assigned to `ng-if` evaluates to a false value then the element
 * is removed from the DOM, otherwise a clone of the element is reinserted into the DOM.
 *
 * # Example:
 *
 * ```
 * <div *ng-if="errorCount > 0" class="error">
 *   <!-- Error message displayed when the errorCount property on the current context is greater
 * than 0. -->
 *   {{errorCount}} errors detected
 * </div>
 * ```
 *
 * # Syntax
 *
 * - `<div *ng-if="condition">...</div>`
 * - `<div template="ng-if condition">...</div>`
 * - `<template [ng-if]="condition"><div>...</div></template>`
 *
 * @exportedAs angular2/directives
 */
var NgIf = (function () {
    function NgIf(viewContainer, protoViewRef) {
        this.viewContainer = viewContainer;
        this.prevCondition = null;
        this.protoViewRef = protoViewRef;
    }
    Object.defineProperty(NgIf.prototype, "ngIf", {
        set: function (newCondition /* boolean */) {
            if (newCondition && (lang_1.isBlank(this.prevCondition) || !this.prevCondition)) {
                this.prevCondition = true;
                this.viewContainer.create(this.protoViewRef);
            }
            else if (!newCondition && (lang_1.isBlank(this.prevCondition) || this.prevCondition)) {
                this.prevCondition = false;
                this.viewContainer.clear();
            }
        },
        enumerable: true,
        configurable: true
    });
    NgIf = __decorate([
        annotations_1.Directive({ selector: '[ng-if]', properties: ['ngIf'] }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.ProtoViewRef])
    ], NgIf);
    return NgIf;
})();
exports.NgIf = NgIf;
exports.__esModule = true;
//# sourceMappingURL=ng_if.js.map