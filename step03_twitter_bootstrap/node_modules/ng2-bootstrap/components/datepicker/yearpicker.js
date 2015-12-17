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
var TEMPLATE_OPTIONS = {
    bs4: {
        YEAR_BUTTON: "\n        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default\"\n                [ng-class]=\"{'btn-info': dtz.selected, 'btn-link': !dtz.selected && !datePicker.isActive(dtz), 'btn-info': !dtz.selected && datePicker.isActive(dtz), disabled: dtz.disabled}\"\n                [disabled]=\"dtz.disabled\"\n                (click)=\"datePicker.select(dtz.date)\" tabindex=\"-1\">\n          <span [ng-class]=\"{'text-success': dtz.current}\">{{dtz.label}}</span>\n        </button>\n    "
    },
    bs3: {
        YEAR_BUTTON: "\n        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default\"\n                [ng-class]=\"{'btn-info': dtz.selected, active: datePicker.isActive(dtz), disabled: dtz.disabled}\"\n                [disabled]=\"dtz.disabled\"\n                (click)=\"datePicker.select(dtz.date)\" tabindex=\"-1\">\n          <span [ng-class]=\"{'text-info': dtz.current}\">{{dtz.label}}</span>\n        </button>\n    "
    }
};
var CURRENT_THEME_TEMPLATE = TEMPLATE_OPTIONS[ng2_bootstrap_config_1.Ng2BootstrapConfig.theme] || TEMPLATE_OPTIONS.bs3;
var YearPicker = (function () {
    function YearPicker(datePicker) {
        this.datePicker = datePicker;
        this.rows = [];
    }
    YearPicker.prototype.getStartingYear = function (year) {
        // todo: parseInt
        return ((year - 1) / this.datePicker.yearRange) * this.datePicker.yearRange + 1;
    };
    YearPicker.prototype.onInit = function () {
        var self = this;
        this.datePicker.stepYear = { years: this.datePicker.yearRange };
        this.datePicker.setRefreshViewHandler(function () {
            var years = new Array(this.yearRange);
            var date;
            for (var i = 0, start = self.getStartingYear(this.activeDate.getFullYear()); i < this.yearRange; i++) {
                date = new Date(start + i, 0, 1);
                this.fixTimeZone(date);
                years[i] = this.createDateObject(date, this.formatYear);
                years[i].uid = this.uniqueId + '-' + i;
            }
            self.title = [years[0].label, years[this.yearRange - 1].label].join(' - ');
            self.rows = this.split(years, 5);
        }, 'year');
        this.datePicker.setCompareHandler(function (date1, date2) {
            return date1.getFullYear() - date2.getFullYear();
        }, 'year');
        this.datePicker.refreshView();
    };
    YearPicker = __decorate([
        angular2_1.Component({
            selector: 'yearpicker, [yearpicker]'
        }),
        angular2_1.View({
            template: "\n<table [hidden]=\"datePicker.datepickerMode!=='year'\" role=\"grid\">\n  <thead>\n    <tr>\n      <th>\n        <button type=\"button\" class=\"btn btn-default btn-sm pull-left\"\n                (click)=\"datePicker.move(-1)\" tabindex=\"-1\">\n          <i class=\"glyphicon glyphicon-chevron-left\"></i>\n        </button>\n      </th>\n      <th colspan=\"3\">\n        <button [id]=\"uniqueId + '-title'\" role=\"heading\"\n                type=\"button\" class=\"btn btn-default btn-sm\"\n                (click)=\"datePicker.toggleMode()\"\n                [disabled]=\"datePicker.datepickerMode === datePicker.maxMode\"\n                [ng-class]=\"{disabled: datePicker.datepickerMode === datePicker.maxMode}\" tabindex=\"-1\" style=\"width:100%;\">\n          <strong>{{title}}</strong>\n        </button>\n      </th>\n      <th>\n        <button type=\"button\" class=\"btn btn-default btn-sm pull-right\"\n                (click)=\"datePicker.move(1)\" tabindex=\"-1\">\n          <i class=\"glyphicon glyphicon-chevron-right\"></i>\n        </button>\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ng-for=\"#rowz of rows\">\n      <td *ng-for=\"#dtz of rowz\" class=\"text-center\" role=\"gridcell\">\n      " + CURRENT_THEME_TEMPLATE.YEAR_BUTTON + "\n      </td>\n    </tr>\n  </tbody>\n</table>\n  ",
            directives: [angular2_1.FORM_DIRECTIVES, angular2_1.CORE_DIRECTIVES, angular2_1.NgClass]
        })
    ], YearPicker);
    return YearPicker;
})();
exports.YearPicker = YearPicker;
