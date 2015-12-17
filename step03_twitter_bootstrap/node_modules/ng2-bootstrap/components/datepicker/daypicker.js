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
var ng2_bootstrap_config_1 = require('../ng2-bootstrap-config');
var TEMPLATE_OPTIONS = (_a = {},
    _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS4] = {
        DAY_BUTTON: "\n        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-sm\"\n                [ng-class]=\"{'btn-secondary': !dtz.selected && !datePicker.isActive(dtz), 'btn-info': dtz.selected || !dtz.selected && datePicker.isActive(dtz), disabled: dtz.disabled}\"\n                [disabled]=\"dtz.disabled\"\n                (click)=\"datePicker.select(dtz.date)\" tabindex=\"-1\">\n          <span [ng-class]=\"{'text-muted': dtz.secondary || dtz.current}\">{{dtz.label}}</span>\n        </button>\n    "
    },
    _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS3] = {
        DAY_BUTTON: "\n        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default btn-sm\"\n                [ng-class]=\"{'btn-info': dtz.selected, active: datePicker.isActive(dtz), disabled: dtz.disabled}\"\n                [disabled]=\"dtz.disabled\"\n                (click)=\"datePicker.select(dtz.date)\" tabindex=\"-1\">\n          <span [ng-class]=\"{'text-muted': dtz.secondary, 'text-info': dtz.current}\">{{dtz.label}}</span>\n        </button>\n    "
    },
    _a
);
var CURRENT_THEME_TEMPLATE = TEMPLATE_OPTIONS[ng2_bootstrap_config_1.Ng2BootstrapConfig.theme || ng2_bootstrap_config_1.Ng2BootstrapTheme.BS3];
var DayPicker = (function () {
    function DayPicker(datePicker) {
        this.datePicker = datePicker;
        this.labels = [];
        this.rows = [];
        this.weekNumbers = [];
    }
    /*private getDaysInMonth(year:number, month:number) {
     return ((month === 1) && (year % 4 === 0) &&
     ((year % 100 !== 0) || (year % 400 === 0))) ? 29 : DAYS_IN_MONTH[month];
     }*/
    DayPicker.prototype.getDates = function (startDate, n) {
        var dates = new Array(n);
        var current = new Date(startDate.getTime());
        var i = 0;
        var date;
        while (i < n) {
            date = new Date(current.getTime());
            this.datePicker.fixTimeZone(date);
            dates[i++] = date;
            current.setDate(current.getDate() + 1);
        }
        return dates;
    };
    DayPicker.prototype.getISO8601WeekNumber = function (date) {
        var checkDate = new Date(date.getTime());
        // Thursday
        checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
        var time = checkDate.getTime();
        // Compare with Jan 1
        checkDate.setMonth(0);
        checkDate.setDate(1);
        return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
    };
    DayPicker.prototype.onInit = function () {
        var self = this;
        this.datePicker.stepDay = { months: 1 };
        this.datePicker.setRefreshViewHandler(function () {
            var year = this.activeDate.getFullYear();
            var month = this.activeDate.getMonth();
            var firstDayOfMonth = new Date(year, month, 1);
            var difference = this.startingDay - firstDayOfMonth.getDay();
            var numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference;
            var firstDate = new Date(firstDayOfMonth.getTime());
            if (numDisplayedFromPreviousMonth > 0) {
                firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
            }
            // 42 is the number of days on a six-month calendar
            var _days = self.getDates(firstDate, 42);
            var days = [];
            for (var i = 0; i < 42; i++) {
                var _dateObject = this.createDateObject(_days[i], this.formatDay);
                _dateObject.secondary = _days[i].getMonth() !== month;
                _dateObject.uid = this.uniqueId + '-' + i;
                days[i] = _dateObject;
            }
            self.labels = [];
            for (var j = 0; j < 7; j++) {
                self.labels[j] = {};
                self.labels[j].abbr = this.dateFilter(days[j].date, this.formatDayHeader);
                self.labels[j].full = this.dateFilter(days[j].date, 'EEEE');
            }
            self.title = this.dateFilter(this.activeDate, this.formatDayTitle);
            self.rows = this.split(days, 7);
            if (this.showWeeks) {
                self.weekNumbers = [];
                var thursdayIndex = (4 + 7 - this.startingDay) % 7, numWeeks = self.rows.length;
                for (var curWeek = 0; curWeek < numWeeks; curWeek++) {
                    self.weekNumbers.push(self.getISO8601WeekNumber(self.rows[curWeek][thursdayIndex].date));
                }
            }
        }, 'day');
        this.datePicker.setCompareHandler(function (date1, date2) {
            var d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
            var d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
            return d1.getTime() - d2.getTime();
        }, 'day');
        this.datePicker.refreshView();
    };
    DayPicker = __decorate([
        angular2_1.Component({
            selector: 'daypicker, [daypicker]'
        }),
        angular2_1.View({
            template: "\n<table [hidden]=\"datePicker.datepickerMode!=='day'\" role=\"grid\" aria-labelledby=\"uniqueId+'-title'\" aria-activedescendant=\"activeDateId\">\n  <thead>\n    <tr>\n      <th>\n        <button type=\"button\" class=\"btn btn-default btn-secondary btn-sm pull-left\" (click)=\"datePicker.move(-1)\" tabindex=\"-1\">\n          <i class=\"glyphicon glyphicon-chevron-left\"></i>\n        </button>\n      </th>\n      <th colspan=\"5\" [hidden]=\"datePicker.showWeeks\">\n        <button [id]=\"datePicker.uniqueId + '-title'\"\n                type=\"button\" class=\"btn btn-default btn-secondary btn-sm\"\n                (click)=\"datePicker.toggleMode()\"\n                [disabled]=\"datePicker.datepickerMode === maxMode\"\n                [ng-class]=\"{disabled: datePicker.datepickerMode === maxMode}\" tabindex=\"-1\" style=\"width:100%;\">\n          <strong>{{title}}</strong>\n        </button>\n      </th>\n      <th colspan=\"6\" [hidden]=\"!datePicker.showWeeks\">\n        <button [id]=\"datePicker.uniqueId + '-title'\"\n                type=\"button\" class=\"btn btn-default btn-secondary btn-sm\"\n                (click)=\"datePicker.toggleMode()\"\n                [disabled]=\"datePicker.datepickerMode === maxMode\"\n                [ng-class]=\"{disabled: datePicker.datepickerMode === maxMode}\" tabindex=\"-1\" style=\"width:100%;\">\n          <strong>{{title}}</strong>\n        </button>\n      </th>\n      <th>\n        <button type=\"button\" class=\"btn btn-default btn-secondary btn-sm pull-right\" (click)=\"datePicker.move(1)\" tabindex=\"-1\">\n          <i class=\"glyphicon glyphicon-chevron-right\"></i>\n        </button>\n      </th>\n    </tr>\n    <tr>\n      <th [hidden]=\"!datePicker.showWeeks\" class=\"text-center\"></th>\n      <th *ng-for=\"#labelz of labels\" class=\"text-center\"><small aria-label=\"labelz.full\"><b>{{labelz.abbr}}</b></small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ng-for=\"#rowz of rows;#index=index\">\n      <td [hidden]=\"!datePicker.showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[index] }}</em></td>\n      <!--  [ng-class]=\"dtz.customClass\" -->\n      <td *ng-for=\"#dtz of rowz\" class=\"text-center\" role=\"gridcell\" [id]=\"dtz.uid\">\n        " + CURRENT_THEME_TEMPLATE.DAY_BUTTON + "\n      </td>\n    </tr>\n  </tbody>\n</table>\n  ",
            directives: [angular2_1.FORM_DIRECTIVES, angular2_1.CORE_DIRECTIVES, angular2_1.NgClass]
        })
    ], DayPicker);
    return DayPicker;
})();
exports.DayPicker = DayPicker;
var _a;
