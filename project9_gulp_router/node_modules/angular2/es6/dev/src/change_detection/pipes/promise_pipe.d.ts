import { Pipe } from './pipe';
import { ChangeDetectorRef } from '../change_detector_ref';
/**
 * Implements async bindings to Promise.
 *
 * # Example
 *
 * In this example we bind the description promise to the DOM.
 * The async pipe will convert a promise to the value with which it is resolved. It will also
 * request a change detection check when the promise is resolved.
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
 *   description:Promise<string>;
 * }
 *
 * ```
 *
 * @exportedAs angular2/pipes
 */
export declare class PromisePipe extends Pipe {
    _ref: ChangeDetectorRef;
    _latestValue: Object;
    _latestReturnedValue: Object;
    _sourcePromise: Promise<any>;
    constructor(ref: ChangeDetectorRef);
    supports(promise: any): boolean;
    onDestroy(): void;
    transform(promise: Promise<any>): any;
    _updateLatestValue(value: Object): void;
}
/**
 * Provides a factory for [PromisePipe].
 *
 * @exportedAs angular2/pipes
 */
export declare class PromisePipeFactory {
    supports(promise: any): boolean;
    create(cdRef: any): Pipe;
}
