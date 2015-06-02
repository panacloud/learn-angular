import { Pipe } from './pipe';
/**
 * Implements lowercase transforms to text.
 *
 * # Example
 *
 * In this example we transform the user text lowercase.
 *
 *  ```
 * @Component({
 *   selector: "username-cmp"
 * })
 * @View({
 *   template: "Username: {{ user | lowercase }}"
 * })
 * class Username {
 *   user:string;
 * }
 *
 * ```
 *
 * @exportedAs angular2/pipes
 */
export declare class LowerCasePipe extends Pipe {
    _latestValue: string;
    constructor();
    supports(str: any): boolean;
    onDestroy(): void;
    transform(value: string): string;
}
/**
 * @exportedAs angular2/pipes
 */
export declare class LowerCaseFactory {
    supports(str: any): boolean;
    create(): Pipe;
}
export declare var __esModule: boolean;
