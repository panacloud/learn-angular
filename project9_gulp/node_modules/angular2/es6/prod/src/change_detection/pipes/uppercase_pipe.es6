import { isString, StringWrapper } from 'angular2/src/facade/lang';
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
export class UpperCasePipe extends Pipe {
    constructor() {
        super();
        this._latestValue = null;
    }
    supports(str) { return isString(str); }
    onDestroy() { this._latestValue = null; }
    transform(value) {
        if (this._latestValue !== value) {
            this._latestValue = value;
            return StringWrapper.toUpperCase(value);
        }
        else {
            return this._latestValue;
        }
    }
}
/**
 * @exportedAs angular2/pipes
 */
export class UpperCaseFactory {
    supports(str) { return isString(str); }
    create() { return new UpperCasePipe(); }
}
//# sourceMappingURL=uppercase_pipe.js.map