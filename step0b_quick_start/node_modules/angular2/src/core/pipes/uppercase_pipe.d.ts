import { PipeTransform } from 'angular2/src/core/change_detection';
/**
 * Implements uppercase transforms to text.
 *
 * # Example
 *
 * In this example we transform the user text uppercase.
 *
 *  ```
 * @Component({
 *   selector: "username-cmp",
 *   template: "Username: {{ user | uppercase }}"
 * })
 * class Username {
 *   user:string;
 * }
 *
 * ```
 */
export declare class UpperCasePipe implements PipeTransform {
    transform(value: string, args?: any[]): string;
}
