/**
 * Indicates that the result of a {@link Pipe} transformation has changed even though the reference
 *has not changed.
 *
 * The wrapped value will be unwrapped by change detection, and the unwrapped value will be stored.
 *
 * @exportedAs angular2/pipes
 */
export declare class WrappedValue {
    wrapped: any;
    constructor(wrapped: any);
    static wrap(value: any): WrappedValue;
}
/**
 * An interface for extending the list of pipes known to Angular.
 *
 * If you are writing a custom {@link Pipe}, you must extend this interface.
 *
 * #Example
 *
 * ```
 * class DoublePipe extends Pipe {
 *  supports(obj) {
 *    return true;
 *  }
 *
 *  transform(value) {
 *    return `${value}${value}`;
 *  }
 * }
 * ```
 *
 * @exportedAs angular2/pipes
 */
export declare class Pipe {
    supports(obj: any): boolean;
    onDestroy(): void;
    transform(value: any): any;
}
export declare class PipeFactory {
    supports(obs: any): boolean;
    create(cdRef: any): Pipe;
}
export declare var __esModule: boolean;
