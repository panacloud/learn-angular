import { OpaqueToken } from 'angular2/src/core/di';
/**
 * A bridge between a control and a native element.
 *
 * Please see {@link DefaultValueAccessor} for more information.
 */
export interface ControlValueAccessor {
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
export declare const NG_VALUE_ACCESSOR: OpaqueToken;
