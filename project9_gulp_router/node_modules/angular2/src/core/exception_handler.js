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
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
/**
 * Provides a hook for centralized exception handling.
 *
 * The default implementation of `ExceptionHandler` prints error messages to the `Console`. To
 * intercept error handling,
 * write a custom exception handler that replaces this default as appropriate for your app.
 *
 * # Example
 *
 * ```javascript
 * @Component({
 *   selector: 'my-app',
 *   appInjector: [
 *     bind(ExceptionHandler).toClass(MyExceptionHandler)
 *   ]
 * })
 * @View(...)
 * class MyApp { ... }
 *
 *
 * class MyExceptionHandler implements ExceptionHandler {
 *   call(error, stackTrace = null, reason = null) {
 *     // do something with the exception
 *   }
 * }
 *
 * ```
 *
 * @exportedAs angular2/core
 */
var ExceptionHandler = (function () {
    function ExceptionHandler() {
    }
    ExceptionHandler.prototype.call = function (error, stackTrace, reason) {
        if (stackTrace === void 0) { stackTrace = null; }
        if (reason === void 0) { reason = null; }
        var longStackTrace = collection_1.isListLikeIterable(stackTrace) ? collection_1.ListWrapper.join(stackTrace, "\n\n") : stackTrace;
        var reasonStr = lang_1.isPresent(reason) ? "\n" + reason : '';
        dom_adapter_1.DOM.logError("" + error + reasonStr + "\nSTACKTRACE:\n" + longStackTrace);
    };
    ExceptionHandler = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ExceptionHandler);
    return ExceptionHandler;
})();
exports.ExceptionHandler = ExceptionHandler;
exports.__esModule = true;
//# sourceMappingURL=exception_handler.js.map