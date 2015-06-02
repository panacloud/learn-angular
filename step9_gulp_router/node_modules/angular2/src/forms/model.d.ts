import { Observable, EventEmitter } from 'angular2/src/facade/async';
/**
 * Indicates that a Control is valid, i.e. that no errors exist in the input value.
 *
 * @exportedAs angular2/forms
 */
export declare const VALID: string;
/**
 * Indicates that a Control is invalid, i.e. that an error exists in the input value.
 *
 * @exportedAs angular2/forms
 */
export declare const INVALID: string;
export declare function isControl(c: Object): boolean;
/**
 * Omitting from external API doc as this is really an abstract internal concept.
 */
export declare class AbstractControl {
    _value: any;
    _status: string;
    _errors: StringMap<string, any>;
    _pristine: boolean;
    _parent: any;
    validator: Function;
    _valueChanges: EventEmitter;
    constructor(validator: Function);
    value: any;
    status: string;
    valid: boolean;
    errors: StringMap<string, any>;
    pristine: boolean;
    dirty: boolean;
    valueChanges: Observable;
    setParent(parent: any): void;
    _updateParent(): void;
}
/**
 * Defines a part of a form that cannot be divided into other controls.
 *
 * `Control` is one of the three fundamental building blocks used to define forms in Angular, along
 * with
 * {@link ControlGroup} and {@link ControlArray}.
 *
 * @exportedAs angular2/forms
 */
export declare class Control extends AbstractControl {
    constructor(value: any, validator?: Function);
    updateValue(value: any): void;
    _setValueErrorsStatus(value: any): void;
}
/**
 * Defines a part of a form, of fixed length, that can contain other controls.
 *
 * A ControlGroup aggregates the values and errors of each {@link Control} in the group. Thus, if
 * one of the controls
 * in a group is invalid, the entire group is invalid. Similarly, if a control changes its value,
 * the entire group
 * changes as well.
 *
 * `ControlGroup` is one of the three fundamental building blocks used to define forms in Angular,
 * along with
 * {@link Control} and {@link ControlArray}. {@link ControlArray} can also contain other controls,
 * but is of variable
 * length.
 *
 * @exportedAs angular2/forms
 */
export declare class ControlGroup extends AbstractControl {
    controls: StringMap<string, AbstractControl>;
    _optionals: StringMap<string, boolean>;
    constructor(controls: StringMap<String, AbstractControl>, optionals?: StringMap<String, boolean>, validator?: Function);
    include(controlName: string): void;
    exclude(controlName: string): void;
    contains(controlName: string): boolean;
    _setParentForControls(): void;
    _updateValue(): void;
    _setValueErrorsStatus(): void;
    _reduceValue(): any;
    _reduceChildren(initValue: any, fn: Function): any;
    _included(controlName: string): boolean;
}
/**
 * Defines a part of a form, of variable length, that can contain other controls.
 *
 * A `ControlArray` aggregates the values and errors of each {@link Control} in the group. Thus, if
 * one of the controls
 * in a group is invalid, the entire group is invalid. Similarly, if a control changes its value,
 * the entire group
 * changes as well.
 *
 * `ControlArray` is one of the three fundamental building blocks used to define forms in Angular,
 * along with
 * {@link Control} and {@link ControlGroup}. {@link ControlGroup} can also contain other controls,
 * but is of fixed
 * length.
 *
 * @exportedAs angular2/forms
 */
export declare class ControlArray extends AbstractControl {
    controls: List<AbstractControl>;
    constructor(controls: List<AbstractControl>, validator?: Function);
    at(index: number): AbstractControl;
    push(control: AbstractControl): void;
    insert(index: number, control: AbstractControl): void;
    removeAt(index: number): void;
    length: number;
    _updateValue(): void;
    _setParentForControls(): void;
    _setValueErrorsStatus(): void;
}
export declare var __esModule: boolean;
