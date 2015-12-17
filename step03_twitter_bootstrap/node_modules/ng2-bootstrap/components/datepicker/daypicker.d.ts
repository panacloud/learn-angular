/// <reference path="../../tsd.d.ts" />
import { OnInit } from 'angular2/angular2';
import { DatePickerInner } from './datepicker-inner';
export declare class DayPicker implements OnInit {
    datePicker: DatePickerInner;
    labels: Array<any>;
    title: string;
    rows: Array<any>;
    weekNumbers: Array<number>;
    constructor(datePicker: DatePickerInner);
    private getDates(startDate, n);
    private getISO8601WeekNumber(date);
    onInit(): void;
}
