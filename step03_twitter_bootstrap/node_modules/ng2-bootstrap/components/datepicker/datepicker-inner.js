/// <reference path="../../tsd.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var angular2_1 = require('angular2/angular2');
var date_formatter_1 = require('./date-formatter');
var FORMAT_DAY = 'DD';
var FORMAT_MONTH = 'MMMM';
var FORMAT_YEAR = 'YYYY';
var FORMAT_DAY_HEADER = 'dd';
var FORMAT_DAY_TITLE = 'MMMM YYYY';
var FORMAT_MONTH_TITLE = 'YYYY';
var DATEPICKER_MODE = 'day';
var MIN_MODE = 'day';
var MAX_MODE = 'year';
var SHOW_WEEKS = true;
var STARTING_DAY = 0;
var YEAR_RANGE = 20;
var MIN_DATE = null;
var MAX_DATE = null;
var SHORTCUT_PROPAGATION = false;
var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var KEYS = {
    13: 'enter',
    32: 'space',
    33: 'pageup',
    34: 'pagedown',
    35: 'end',
    36: 'home',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};
var DatePickerInner = (function () {
    function DatePickerInner() {
        this.stepDay = {};
        this.stepMonth = {};
        this.stepYear = {};
        this.modes = ['day', 'month', 'year'];
        this.dateFormatter = new date_formatter_1.DateFormatter();
        this.update = new angular2_1.EventEmitter();
    }
    Object.defineProperty(DatePickerInner.prototype, "initDate", {
        get: function () {
            return this._initDate;
        },
        set: function (value) {
            this._initDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerInner.prototype, "activeDate", {
        get: function () {
            return this._activeDate;
        },
        set: function (value) {
            this._activeDate = value;
            this.refreshView();
        },
        enumerable: true,
        configurable: true
    });
    // todo: add formatter value to Date object
    DatePickerInner.prototype.onInit = function () {
        this.formatDay = this.formatDay || FORMAT_DAY;
        this.formatMonth = this.formatMonth || FORMAT_MONTH;
        this.formatYear = this.formatYear || FORMAT_YEAR;
        this.formatDayHeader = this.formatDayHeader || FORMAT_DAY_HEADER;
        this.formatDayTitle = this.formatDayTitle || FORMAT_DAY_TITLE;
        this.formatMonthTitle = this.formatMonthTitle || FORMAT_MONTH_TITLE;
        this.showWeeks = this.showWeeks || SHOW_WEEKS;
        this.startingDay = this.startingDay || STARTING_DAY;
        this.yearRange = this.yearRange || YEAR_RANGE;
        this.shortcutPropagation = this.shortcutPropagation || SHORTCUT_PROPAGATION;
        this.datepickerMode = this.datepickerMode || DATEPICKER_MODE;
        this.minMode = this.minMode || MIN_MODE;
        this.maxMode = this.maxMode || MAX_MODE;
        // todo: use date for unique value
        this.uniqueId = 'datepicker-' + '-' + Math.floor(Math.random() * 10000);
        if (this.initDate) {
            this.activeDate = this.initDate;
        }
        else {
            this.activeDate = new Date();
        }
        this.update.next(this.activeDate);
        this.refreshView();
    };
    DatePickerInner.prototype.setCompareHandler = function (handler, type) {
        if (type === 'day') {
            this.compareHandlerDay = handler;
        }
        if (type === 'month') {
            this.compareHandlerMonth = handler;
        }
        if (type === 'year') {
            this.compareHandlerYear = handler;
        }
    };
    DatePickerInner.prototype.compare = function (date1, date2) {
        if (this.datepickerMode === 'day' && this.compareHandlerDay) {
            return this.compareHandlerDay(date1, date2);
        }
        if (this.datepickerMode === 'month' && this.compareHandlerMonth) {
            return this.compareHandlerMonth(date1, date2);
        }
        if (this.datepickerMode === 'year' && this.compareHandlerMonth) {
            return this.compareHandlerYear(date1, date2);
        }
        return null;
    };
    DatePickerInner.prototype.setRefreshViewHandler = function (handler, type) {
        if (type === 'day') {
            this.refreshViewHandlerDay = handler;
        }
        if (type === 'month') {
            this.refreshViewHandlerMonth = handler;
        }
        if (type === 'year') {
            this.refreshViewHandlerYear = handler;
        }
    };
    DatePickerInner.prototype.refreshView = function () {
        if (this.datepickerMode === 'day' && this.refreshViewHandlerDay) {
            this.refreshViewHandlerDay();
        }
        if (this.datepickerMode === 'month' && this.refreshViewHandlerMonth) {
            this.refreshViewHandlerMonth();
        }
        if (this.datepickerMode === 'year' && this.refreshViewHandlerYear) {
            this.refreshViewHandlerYear();
        }
    };
    DatePickerInner.prototype.dateFilter = function (date, format) {
        return this.dateFormatter.format(date, format);
    };
    DatePickerInner.prototype.isActive = function (dateObject) {
        if (this.compare(dateObject.date, this.activeDate) === 0) {
            this.activeDateId = dateObject.uid;
            return true;
        }
        return false;
    };
    DatePickerInner.prototype.createDateObject = function (date, format) {
        var dateObject = {};
        dateObject.date = date;
        dateObject.label = this.dateFilter(date, format);
        dateObject.selected = this.compare(date, this.activeDate) === 0;
        dateObject.disabled = this.isDisabled(date);
        dateObject.current = this.compare(date, new Date()) === 0;
        // todo: do it
        // dateObject.customClass = this.customClass({date: date, mode: this.datepickerMode}) || {};
        return dateObject;
    };
    DatePickerInner.prototype.isDisabled = function (date) {
        // todo: implement dateDisabled attribute
        return ((this.minDate && this.compare(date, this.minDate) < 0) ||
            (this.maxDate && this.compare(date, this.maxDate) > 0));
    };
    ;
    DatePickerInner.prototype.split = function (arr, size) {
        var arrays = [];
        while (arr.length > 0) {
            arrays.push(arr.splice(0, size));
        }
        return arrays;
    };
    // Fix a hard-reprodusible bug with timezones
    // The bug depends on OS, browser, current timezone and current date
    // i.e.
    // var date = new Date(2014, 0, 1);
    // console.log(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
    // can result in "2013 11 31 23" because of the bug.
    DatePickerInner.prototype.fixTimeZone = function (date) {
        var hours = date.getHours();
        date.setHours(hours === 23 ? hours + 2 : 0);
    };
    DatePickerInner.prototype.select = function (date) {
        if (this.datepickerMode === this.minMode) {
            if (!this.activeDate) {
                this.activeDate = new Date(0, 0, 0, 0, 0, 0, 0);
            }
            this.activeDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        }
        else {
            this.activeDate = date;
            this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) - 1];
        }
        this.update.next(this.activeDate);
        this.refreshView();
    };
    DatePickerInner.prototype.move = function (direction) {
        var expectedStep;
        if (this.datepickerMode === 'day') {
            expectedStep = this.stepDay;
        }
        if (this.datepickerMode === 'month') {
            expectedStep = this.stepMonth;
        }
        if (this.datepickerMode === 'year') {
            expectedStep = this.stepYear;
        }
        if (expectedStep) {
            var year = this.activeDate.getFullYear() + direction * (expectedStep.years || 0);
            var month = this.activeDate.getMonth() + direction * (expectedStep.months || 0);
            this.activeDate.setFullYear(year, month, 1);
            this.update.next(this.activeDate);
            this.refreshView();
        }
    };
    DatePickerInner.prototype.toggleMode = function (direction) {
        direction = direction || 1;
        if ((this.datepickerMode === this.maxMode && direction === 1) ||
            (this.datepickerMode === this.minMode && direction === -1)) {
            return;
        }
        this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) + direction];
        this.refreshView();
    };
    DatePickerInner = __decorate([
        angular2_1.Component({
            selector: 'datepicker-inner',
            events: ['update'],
            properties: [
                'activeDate',
                'datepickerMode',
                'initDate',
                'minDate',
                'maxDate',
                'minMode',
                'maxMode',
                'showWeeks',
                'formatDay',
                'formatMonth',
                'formatYear',
                'formatDayHeader',
                'formatDayTitle',
                'formatMonthTitle',
                'startingDay',
                'yearRange',
                'shortcutPropagation',
                'customClass',
                'dateDisabled',
                'templateUrl'
            ]
        }),
        angular2_1.View({
            template: "\n<div [hidden]=\"!datepickerMode\" class=\"well well-sm bg-faded p-a card\" role=\"application\" ><!--&lt;!&ndash;ng-keydown=\"keydown($event)\"&ndash;&gt;-->\n  <ng-content></ng-content>\n</div>\n  ",
            directives: [angular2_1.FORM_DIRECTIVES, angular2_1.CORE_DIRECTIVES, angular2_1.NgClass, angular2_1.NgModel]
        })
    ], DatePickerInner);
    return DatePickerInner;
})();
exports.DatePickerInner = DatePickerInner;
