import { Pipe, PipeFactory } from './pipe';
/**
 * Implements json transforms to any object.
 *
 * # Example
 *
 * In this example we transform the user object to json.
 *
 *  ```
 * @Component({
 *   selector: "user-cmp"
 * })
 * @View({
 *   template: "User: {{ user | json }}"
 * })
 * class Username {
 *  user:Object
 *  constructor() {
 *    this.user = { name: "PatrickJS" };
 *  }
 * }
 *
 * ```
 *
 * @exportedAs angular2/pipes
 */
export declare class JsonPipe extends Pipe {
    _latestRef: any;
    _latestValue: any;
    constructor();
    onDestroy(): void;
    supports(obj: any): boolean;
    transform(value: any): any;
    _prettyPrint(value: any): any;
}
/**
 * Provides a factory for [JsonPipeFactory].
 *
 * @exportedAs angular2/pipes
 */
export declare class JsonPipeFactory extends PipeFactory {
    constructor();
    supports(obj: any): boolean;
    create(cdRef: any): Pipe;
}
export declare var __esModule: boolean;
