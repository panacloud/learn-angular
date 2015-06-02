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
var change_detection_1 = require('angular2/change_detection');
var exception_handler_1 = require('angular2/src/core/exception_handler');
var lang_1 = require('angular2/src/facade/lang');
/**
 * Provides access to explicitly trigger change detection in an application.
 *
 * By default, `Zone` triggers change detection in Angular on each virtual machine (VM) turn. When
 * testing, or in some
 * limited application use cases, a developer can also trigger change detection with the
 * `lifecycle.tick()` method.
 *
 * Each Angular application has a single `LifeCycle` instance.
 *
 * # Example
 *
 * This is a contrived example, since the bootstrap automatically runs inside of the `Zone`, which
 * invokes
 * `lifecycle.tick()` on your behalf.
 *
 * ```javascript
 * bootstrap(MyApp).then((ref:ComponentRef) => {
 *   var lifeCycle = ref.injector.get(LifeCycle);
 *   var myApp = ref.instance;
 *
 *   ref.doSomething();
 *   lifecycle.tick();
 * });
 * ```
 * @exportedAs angular2/change_detection
 */
var LifeCycle = (function () {
    function LifeCycle(exceptionHandler, changeDetector, enforceNoNewChanges) {
        if (changeDetector === void 0) { changeDetector = null; }
        if (enforceNoNewChanges === void 0) { enforceNoNewChanges = false; }
        this._errorHandler = function (exception, stackTrace) {
            exceptionHandler.call(exception, stackTrace);
            throw exception;
        };
        this._changeDetector =
            changeDetector; // may be null when instantiated from application bootstrap
        this._enforceNoNewChanges = enforceNoNewChanges;
    }
    /**
     * @private
     */
    LifeCycle.prototype.registerWith = function (zone, changeDetector) {
        var _this = this;
        if (changeDetector === void 0) { changeDetector = null; }
        if (lang_1.isPresent(changeDetector)) {
            this._changeDetector = changeDetector;
        }
        zone.initCallbacks({ onErrorHandler: this._errorHandler, onTurnDone: function () { return _this.tick(); } });
    };
    /**
     *  Invoke this method to explicitly process change detection and its side-effects.
     *
     *  In development mode, `tick()` also performs a second change detection cycle to ensure that no
     * further
     *  changes are detected. If additional changes are picked up during this second cycle, bindings in
     * the app have
     *  side-effects that cannot be resolved in a single change detection pass. In this case, Angular
     * throws an error,
     *  since an Angular application can only have one change detection pass during which all change
     * detection must
     *  complete.
     *
     */
    LifeCycle.prototype.tick = function () {
        this._changeDetector.detectChanges();
        if (this._enforceNoNewChanges) {
            this._changeDetector.checkNoChanges();
        }
    };
    LifeCycle = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [exception_handler_1.ExceptionHandler, change_detection_1.ChangeDetector, Boolean])
    ], LifeCycle);
    return LifeCycle;
})();
exports.LifeCycle = LifeCycle;
exports.__esModule = true;
//# sourceMappingURL=life_cycle.js.map