import { Pipe } from './pipe';
/**
 * Implements uppercase transforms to text.
 *
 * # Example
 *
 * In this example we transform the user text uppercase.
 *
 *  ```
 * @Component({
 *   selector: "username-cmp"
 * })
 * @View({
 *   template: "Username: {{ user | uppercase }}"
 * })
 * class Username {
 *   user:string;
 * }
 *
 * ```
 *
 * @exportedAs angular2/pipes
 */
export declare class UpperCasePipe extends Pipe {
    _latestValue: string;
    constructor();
    supports(str: any): boolean;
    onDestroy(): void;
    transform(value: string): string;
}
/**
 * @exportedAs angular2/pipes
 */
export declare class UpperCaseFactory {
    supports(str: any): boolean;
    create(): Pipe;
}
export declare var __esModule: boolean;
