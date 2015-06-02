export interface NgZoneZone extends Zone {
    _innerZone: boolean;
}
/**
 * A wrapper around zones that lets you schedule tasks after it has executed a task.
 *
 * The wrapper maintains an "inner" and an "mount" `Zone`. The application code will executes
 * in the "inner" zone unless `runOutsideAngular` is explicitely called.
 *
 * A typical application will create a singleton `NgZone`. The outer `Zone` is a fork of the root
 * `Zone`. The default `onTurnDone` runs the Angular change detection.
 *
 * @exportedAs angular2/core
 */
export declare class NgZone {
    _mountZone: any;
    _innerZone: any;
    _onTurnStart: () => void;
    _onTurnDone: () => void;
    _onErrorHandler: (error, stack) => void;
    _pendingMicrotasks: number;
    _hasExecutedCodeInInnerZone: boolean;
    _nestedRun: number;
    _disabled: boolean;
    /**
     * Associates with this
     *
     * - a "root" zone, which the one that instantiated this.
     * - an "inner" zone, which is a child of the root zone.
     *
     * @param {bool} enableLongStackTrace whether to enable long stack trace. They should only be
     *               enabled in development mode as they significantly impact perf.
     */
    constructor({enableLongStackTrace}: {
        enableLongStackTrace: any;
    });
    /**
     * Initializes the zone hooks.
     *
     * @param {() => void} onTurnStart called before code executes in the inner zone for each VM turn
     * @param {() => void} onTurnDone called at the end of a VM turn if code has executed in the inner
     * zone
     * @param {(error, stack) => void} onErrorHandler called when an exception is thrown by a macro or
     * micro task
     */
    initCallbacks({onTurnStart, onTurnDone, onErrorHandler}?: {
        onTurnStart?: Function;
        onTurnDone?: Function;
        onErrorHandler?: Function;
    }): void;
    /**
     * Runs `fn` in the inner zone and returns whatever it returns.
     *
     * In a typical app where the inner zone is the Angular zone, this allows one to make use of the
     * Angular's auto digest mechanism.
     *
     * ```
     * var zone: NgZone = [ref to the application zone];
     *
     * zone.run(() => {
     *   // the change detection will run after this function and the microtasks it enqueues have
     * executed.
     * });
     * ```
     */
    run(fn: any): any;
    /**
     * Runs `fn` in the outer zone and returns whatever it returns.
     *
     * In a typical app where the inner zone is the Angular zone, this allows one to escape Angular's
     * auto-digest mechanism.
     *
     * ```
     * var zone: NgZone = [ref to the application zone];
     *
     * zone.runOusideAngular(() => {
     *   element.onClick(() => {
     *     // Clicking on the element would not trigger the change detection
     *   });
     * });
     * ```
     */
    runOutsideAngular(fn: any): any;
    _createInnerZone(zone: any, enableLongStackTrace: any): any;
    _onError(zone: any, e: any): void;
}
export declare var __esModule: boolean;
