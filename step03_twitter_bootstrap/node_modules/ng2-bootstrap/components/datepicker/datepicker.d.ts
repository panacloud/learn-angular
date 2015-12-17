/// <reference path="../../tsd.d.ts" />
import { ControlValueAccessor, NgModel } from 'angular2/angular2';
export declare class DatePicker implements ControlValueAccessor {
    cd: NgModel;
    private _activeDate;
    private datepickerMode;
    private initDate;
    private minDate;
    private maxDate;
    private minMode;
    private maxMode;
    private showWeeks;
    private formatDay;
    private formatMonth;
    private formatYear;
    private formatDayHeader;
    private formatDayTitle;
    private formatMonthTitle;
    private startingDay;
    private yearRange;
    private shortcutPropagation;
    private customClass;
    private dateDisabled;
    private templateUrl;
    constructor(cd: NgModel);
    activeDate: Date;
    private onUpdate(event);
    writeValue(value: any): void;
    onChange: (_: any) => void;
    onTouched: () => void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}
