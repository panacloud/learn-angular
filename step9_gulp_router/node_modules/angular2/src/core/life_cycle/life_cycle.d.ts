import { ChangeDetector } from 'angular2/change_detection';
import { NgZone } from 'angular2/src/core/zone/ng_zone';
import { ExceptionHandler } from 'angular2/src/core/exception_handler';
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
export declare class LifeCycle {
    _errorHandler: any;
    _changeDetector: ChangeDetector;
    _enforceNoNewChanges: boolean;
    constructor(exceptionHandler: ExceptionHandler, changeDetector?: ChangeDetector, enforceNoNewChanges?: boolean);
    /**
     * @private
     */
    registerWith(zone: NgZone, changeDetector?: ChangeDetector): void;
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
    tick(): void;
}
export declare var __esModule: boolean;
