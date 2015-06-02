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
export declare class ExceptionHandler {
    call(error: any, stackTrace?: any, reason?: any): void;
}
export declare var __esModule: boolean;
