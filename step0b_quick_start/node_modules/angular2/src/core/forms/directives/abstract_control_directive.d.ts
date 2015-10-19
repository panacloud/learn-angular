import { AbstractControl } from '../model';
export declare class AbstractControlDirective {
    control: AbstractControl;
    value: any;
    valid: boolean;
    errors: {
        [key: string]: any;
    };
    pristine: boolean;
    dirty: boolean;
    touched: boolean;
    untouched: boolean;
}
