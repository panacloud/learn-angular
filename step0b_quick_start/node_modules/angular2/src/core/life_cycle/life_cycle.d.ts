import { ChangeDetector } from 'angular2/src/core/change_detection/change_detection';
import { NgZone } from 'angular2/src/core/zone/ng_zone';
import { WtfScopeFn } from '../profile/profile';
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
 */
export declare abstract class LifeCycle {
    /**
     *  Invoke this method to explicitly process change detection and its side-effects.
     *
     *  In development mode, `tick()` also performs a second change detection cycle to ensure that no
     * further
     *  changes are detected. If additional changes are picked up during this second cycle, bindings
     * in
     * the app have
     *  side-effects that cannot be resolved in a single change detection pass. In this case, Angular
     * throws an error,
     *  since an Angular application can only have one change detection pass during which all change
     * detection must
     *  complete.
     *
     */
    abstract tick(): any;
}
export declare class LifeCycle_ extends LifeCycle {
    static _tickScope: WtfScopeFn;
    constructor(changeDetector?: ChangeDetector, enforceNoNewChanges?: boolean);
    registerWith(zone: NgZone, changeDetector?: ChangeDetector): void;
    tick(): void;
}
