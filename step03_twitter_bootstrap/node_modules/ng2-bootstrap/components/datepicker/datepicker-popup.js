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
// import {setProperty} from 'angular2/src/forms/directives/shared';
// import {DOM} from 'angular2/src/dom/dom_adapter';
var angular2_2 = require('angular2/angular2');
var position_1 = require('../position');
var datepicker_1 = require('./datepicker');
var PopupOptions = (function () {
    function PopupOptions(options) {
        Object.assign(this, options);
    }
    return PopupOptions;
})();
var datePickerPopupConfig = {
    datepickerPopup: 'YYYY-MM-dd',
    currentText: 'Today',
    clearText: 'Clear',
    closeText: 'Done',
    closeOnDateSelection: true,
    showButtonBar: true,
    onOpenFocus: true
};
var PopupContainer = (function () {
    function PopupContainer(element, options) {
        this.element = element;
        this.showButtonBar = true;
        this.update1 = new angular2_1.EventEmitter();
        Object.assign(this, options);
        this.classMap = { 'in': false };
        this.classMap[options.placement] = true;
    }
    PopupContainer.prototype.onUpdate = function ($event) {
        console.log('update', $event);
        if ($event) {
            if (typeof $event !== 'Date') {
                $event = new Date($event);
            }
            this.popupComp.activeDate = $event;
        }
    };
    PopupContainer.prototype.position = function (hostEl) {
        this.display = 'block';
        this.top = '0px';
        this.left = '0px';
        var p = position_1.positionService
            .positionElements(hostEl.nativeElement, this.element.nativeElement.children[0], this.placement, false);
        this.top = p.top + 'px';
    };
    PopupContainer.prototype.getText = function (key) {
        return this[key + 'Text'] || datePickerPopupConfig[key + 'Text'];
    };
    PopupContainer.prototype.isDisabled = function (date) {
        return false;
    };
    PopupContainer = __decorate([
        angular2_1.Component({
            selector: 'popup-container',
            events: ['update1']
        }),
        angular2_1.View({
            template: "\n    <ul class=\"dropdown-menu\"\n        style=\"display: block\"\n        [ng-style]=\"{top: top, left: left, display: display}\"\n        [ng-class]=\"classMap\">\n        <li>\n             <datepicker (cupdate)=\"onUpdate($event)\" *ng-if=\"popupComp\" [(ng-model)]=\"popupComp.cd.model\" [show-weeks]=\"true\"></datepicker>\n        </li>\n        <li *ng-if=\"showButtonBar\" style=\"padding:10px 9px 2px\">\n            <span class=\"btn-group pull-left\">\n                 <button type=\"button\" class=\"btn btn-sm btn-info\" (click)=\"select('today')\" ng-disabled=\"isDisabled('today')\">{{ getText('current') }}</button>\n                 <button type=\"button\" class=\"btn btn-sm btn-danger\" (click)=\"select(null)\">{{ getText('clear') }}</button>\n            </span>\n            <button type=\"button\" class=\"btn btn-sm btn-success pull-right\" (click)=\"close()\">{{ getText('close') }}</button>\n        </li>\n    </ul>",
            directives: [angular2_1.NgClass, angular2_1.NgStyle, datepicker_1.DatePicker, angular2_1.FORM_DIRECTIVES, angular2_1.CORE_DIRECTIVES],
            encapsulation: angular2_1.ViewEncapsulation.None
        })
    ], PopupContainer);
    return PopupContainer;
})();
var DatePickerPopup = (function () {
    function DatePickerPopup(cd, element, renderer, loader) {
        this.cd = cd;
        this.element = element;
        this.renderer = renderer;
        this.loader = loader;
        this.placement = 'bottom';
        this._isOpen = false;
        this.activeDate = cd.model;
    }
    Object.defineProperty(DatePickerPopup.prototype, "activeDate", {
        get: function () {
            return this._activeDate;
        },
        set: function (value) {
            this._activeDate = value;
            // setProperty(this.renderer, this.element, 'value', value.toString());
            // this.ngModelChanged.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerPopup.prototype, "isOpen", {
        get: function () {
            return this._isOpen;
        },
        set: function (value) {
            var _this = this;
            var fn = function () {
                _this._isOpen = value;
            };
            if (value === true) {
                this.show(fn);
            }
            if (value === false) {
                this.hide(fn);
            }
        },
        enumerable: true,
        configurable: true
    });
    DatePickerPopup.prototype.onInit = function () {
    };
    DatePickerPopup.prototype.show = function (cb) {
        var _this = this;
        var options = new PopupOptions({
            placement: this.placement
        });
        var binding = angular2_2.Injector.resolve([
            angular2_2.bind(PopupOptions).toValue(options)
        ]);
        this.popup = this.loader
            .loadNextToLocation(PopupContainer, this.element, binding)
            .then(function (componentRef) {
            componentRef.instance.position(_this.element);
            componentRef.instance.popupComp = _this;
            /*componentRef.instance.update1.observer({
             next: (newVal) => {
             setProperty(this.renderer, this.elementRef, 'value', newVal);
             }
             });*/
            cb();
            return componentRef;
        });
    };
    DatePickerPopup.prototype.hide = function (cb) {
        if (this.popup) {
            this.popup.then(function (componentRef) {
                componentRef.dispose();
                cb();
                return componentRef;
            });
        }
        else {
            cb();
        }
    };
    DatePickerPopup = __decorate([
        angular2_1.Directive({
            selector: '[datepicker-popup][ng-model]',
            // prop -> datepickerPopup - format
            properties: ['datepickerPopup', 'isOpen'],
            host: { '(cupdate)': 'onUpdate1($event)' }
        }),
        __param(0, angular2_1.Self())
    ], DatePickerPopup);
    return DatePickerPopup;
})();
exports.DatePickerPopup = DatePickerPopup;
