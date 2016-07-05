"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var immutable_1 = require('immutable');
var DataService = (function () {
    function DataService() {
        this._sub$ = new BehaviorSubject_1.BehaviorSubject(immutable_1.List([]));
    }
    Object.defineProperty(DataService.prototype, "todos", {
        get: function () {
            return this._sub$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DataService.prototype.addItem = function (item) {
        //We will use another service to talk to the server called http backend service
        //if case it fails update the ui service
        //check out http://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
        var current = this._sub$.getValue();
        current = current.push(item);
        this._sub$.next(current);
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map