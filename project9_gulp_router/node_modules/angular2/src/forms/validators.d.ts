import * as modelModule from './model';
/**
 * Provides a set of validators used by form controls.
 *
 * # Example
 *
 * ```
 * var loginControl = new Control("", Validators.required)
 * ```
 *
 * @exportedAs angular2/forms
 */
export declare class Validators {
    static required(c: modelModule.Control): StringMap<string, boolean>;
    static nullValidator(c: any): StringMap<string, boolean>;
    static compose(validators: List<Function>): Function;
    static group(c: modelModule.ControlGroup): StringMap<string, boolean>;
    static array(c: modelModule.ControlArray): StringMap<string, boolean>;
    static _mergeErrors(control: modelModule.AbstractControl, res: StringMap<string, any>): void;
}
export declare var __esModule: boolean;
