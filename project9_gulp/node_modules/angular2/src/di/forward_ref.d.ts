import { Type } from 'angular2/src/facade/lang';
export interface ForwardRefFn {
    (): Type;
}
/**
 * Allows to refer to references which are not yet defined.
 *
 * This situation arises when the key which we need te refer to for the purposes of DI is declared,
 * but not yet defined.
 *
 * ## Example:
 *
 * ```
 * class Door {
 *   // Incorrect way to refer to a reference which is defined later.
 *   // This fails because `Lock` is undefined at this point.
 *   constructor(lock:Lock) { }
 *
 *   // Correct way to refer to a reference which is defined later.
 *   // The reference needs to be captured in a closure.
 *   constructor(@Inject(forwardRef(() => Lock)) lock:Lock) { }
 * }
 *
 * // Only at this point the lock is defined.
 * class Lock {
 * }
 * ```
 *
 * @exportedAs angular2/di
 */
export declare function forwardRef(forwardRefFn: ForwardRefFn): Type;
/**
 * Lazily retrieve the reference value.
 *
 * See: {@link forwardRef}
 *
 * @exportedAs angular2/di
 */
export declare function resolveForwardRef(type: any): any;
export declare var __esModule: boolean;
