import { PipeTransform } from 'angular2/src/core/change_detection';
/**
 * Implements lowercase transforms to text.
 *
 * # Example
 *
 * In this example we transform the user text lowercase.
 *
 *  ```
 * @Component({
 *   selector: "username-cmp",
 *   template: "Username: {{ user | lowercase }}"
 * })
 * class Username {
 *   user:string;
 * }
 *
 * ```
 */
export declare class LowerCasePipe implements PipeTransform {
    transform(value: string, args?: any[]): string;
}
