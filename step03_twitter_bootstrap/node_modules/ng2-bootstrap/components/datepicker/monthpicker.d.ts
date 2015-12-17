/// <reference path="../../tsd.d.ts" />
import { OnInit } from 'angular2/angular2';
import { DatePickerInner } from './datepicker-inner';
export declare class MonthPicker implements OnInit {
    datePicker: DatePickerInner;
    title: string;
    rows: Array<any>;
    constructor(datePicker: DatePickerInner);
    onInit(): void;
}
