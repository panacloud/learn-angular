/// <reference path="../../tsd.d.ts" />
import { OnInit } from 'angular2/angular2';
import { DatePickerInner } from './datepicker-inner';
export declare class YearPicker implements OnInit {
    datePicker: DatePickerInner;
    private title;
    private rows;
    constructor(datePicker: DatePickerInner);
    private getStartingYear(year);
    onInit(): void;
}
