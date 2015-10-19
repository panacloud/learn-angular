import { OpaqueToken } from 'angular2/src/core/di';
import * as modelModule from './model';
export declare const NG_VALIDATORS: OpaqueToken;
/**
 * Provides a set of validators used by form controls.
 *
 * # Example
 *
 * ```
 * var loginControl = new Control("", Validators.required)
 * ```
 */
export declare class Validators {
    static required(control: modelModule.Control): {
        [key: string]: boolean;
    };
    static minLength(minLength: number): Function;
    static maxLength(maxLength: number): Function;
    static nullValidator(c: any): {
        [key: string]: boolean;
    };
    static compose(validators: Function[]): Function;
    static group(group: modelModule.ControlGroup): {
        [key: string]: any[];
    };
    static array(array: modelModule.ControlArray): {
        [key: string]: any[];
    };
    static _mergeErrors(control: modelModule.AbstractControl, res: {
        [key: string]: any[];
    }): void;
}
