import { Observable } from 'angular2/src/facade/async';
import { Pipe, PipeFactory } from './pipe';
import { ChangeDetectorRef } from '../change_detector_ref';
/**
 * Implements async bindings to Observable.
 *
 * # Example
 *
 * In this example we bind the description observable to the DOM. The async pipe will convert an
 *observable to the
 * latest value it emitted. It will also request a change detection check when a new value is
 *emitted.
 *
 *  ```
 * @Component({
 *   selector: "task-cmp",
 *   changeDetection: ON_PUSH
 * })
 * @View({
 *   template: "Task Description {{ description | async }}"
 * })
 * class Task {
 *  description:Observable<string>;
 * }
 *
 * ```
 *
 * @exportedAs angular2/pipes
 */
export declare class ObservablePipe extends Pipe {
    _ref: ChangeDetectorRef;
    _latestValue: Object;
    _latestReturnedValue: Object;
    _subscription: Object;
    _observable: Observable;
    constructor(ref: ChangeDetectorRef);
    supports(obs: any): boolean;
    onDestroy(): void;
    transform(obs: Observable): any;
    _subscribe(obs: Observable): void;
    _dispose(): void;
    _updateLatestValue(value: Object): void;
}
/**
 * Provides a factory for [ObervablePipe].
 *
 * @exportedAs angular2/pipes
 */
export declare class ObservablePipeFactory extends PipeFactory {
    constructor();
    supports(obs: any): boolean;
    create(cdRef: any): Pipe;
}
export declare var __esModule: boolean;
