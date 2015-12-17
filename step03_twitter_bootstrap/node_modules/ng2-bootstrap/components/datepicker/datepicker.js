/// <reference path="../../tsd.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var angular2_1 = require('angular2/angular2');
var moment = require('moment');
var datepicker_inner_1 = require('./datepicker-inner');
var daypicker_1 = require('./daypicker');
var monthpicker_1 = require('./monthpicker');
var yearpicker_1 = require('./yearpicker');
var DatePicker = (function () {
    function DatePicker(cd) {
        this.cd = cd;
        this.onChange = function (_) { };
        this.onTouched = function () { };
        // hack
        cd.valueAccessor = this;
    }
    Object.defineProperty(DatePicker.prototype, "activeDate", {
        get: function () {
            return this._activeDate;
        },
        set: function (value) {
            this._activeDate = value;
            this.cd.viewToModelUpdate(moment(this.activeDate).toDate());
        },
        enumerable: true,
        configurable: true
    });
    DatePicker.prototype.onUpdate = function (event) {
        this.writeValue(event);
    };
    DatePicker.prototype.writeValue = function (value) {
        // todo: fix something sends here new date all the time
        console.log(value);
        // if (value) {
        //  if (typeof value !== 'Date') {
        //    value = new Date(value);
        //  }
        //
        //  this.activeDate = value;
        // }
        if (value === this.activeDate) {
            return;
        }
        if (value && value instanceof Date) {
            this.activeDate = value;
            return;
        }
        this.activeDate = value ? new Date(value) : null;
    };
    DatePicker.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    DatePicker.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    DatePicker = __decorate([
        angular2_1.Component({
            selector: 'datepicker[ng-model], [datepicker][ng-model]',
            properties: [
                'datepickerMode',
                'minDate', 'maxDate',
                'dateDisabled', 'activeDate',
                'showWeeks', 'startingDay',
                'initDate',
                'minMode', 'maxMode',
                'formatDay', 'formatMonth', 'formatYear',
                'formatDayHeader', 'formatDayTitle', 'formatMonthTitle',
                'yearRange',
                'shortcutPropagation'
            ]
        }),
        angular2_1.View({
            template: "\n    <datepicker-inner [active-date]=\"activeDate\"\n                      (update)=\"onUpdate($event)\"\n                      [datepicker-mode]=\"datepickerMode\"\n                      [init-date]=\"initDate\"\n                      [min-date]=\"minDate\"\n                      [max-date]=\"maxDate\"\n                      [min-mode]=\"minMode\"\n                      [max-mode]=\"maxMode\"\n                      [show-weeks]=\"showWeeks\"\n                      [format-day]=\"formatDay\"\n                      [format-month]=\"formatMonth\"\n                      [format-year]=\"formatYear\"\n                      [format-day-header]=\"formatDayHeader\"\n                      [format-day-title]=\"formatDayTitle\"\n                      [format-month-title]=\"formatMonthTitle\"\n                      [starting-day]=\"startingDay\"\n                      [year-range]=\"yearRange\"\n                      [custom-class]=\"customClass\"\n                      [date-disabled]=\"dateDisabled\"\n                      [template-url]=\"templateUrl\"\n                      [shortcut-propagation]=\"shortcutPropagation\">\n      <daypicker tabindex=\"0\"></daypicker>\n      <monthpicker tabindex=\"0\"></monthpicker>\n      <yearpicker tabindex=\"0\"></yearpicker>\n    </datepicker-inner>\n    ",
            directives: [datepicker_inner_1.DatePickerInner, daypicker_1.DayPicker, monthpicker_1.MonthPicker, yearpicker_1.YearPicker, angular2_1.FORM_DIRECTIVES, angular2_1.CORE_DIRECTIVES]
        }),
        __param(0, angular2_1.Self())
    ], DatePicker);
    return DatePicker;
})();
exports.DatePicker = DatePicker;
