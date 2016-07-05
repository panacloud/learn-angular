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
var data_service_1 = require('./data.service');
var Todo_1 = require('./Todo');
var AppComponent = (function () {
    function AppComponent(data) {
        this.item = new Todo_1.Todo('');
        this.data = data;
        this.data.todos.subscribe(function (entry) { return console.log(entry); });
    }
    AppComponent.prototype.onSubmit = function () {
        //console.log("Item added: " + this.item);
        this.data.addItem(this.item);
        this.item = new Todo_1.Todo('');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "<div>\n    <h1>Item List</h1>\n    <ul id=\"todo-list\">\n      <li *ngFor=\"let item of data.todos | async\" >\n        <span>a{{item.item}}</span>\n    </li>\n</ul>\n    <form (ngSubmit)=\"onSubmit()\">\n      <div>\n        <label for=\"item\">Item</label>\n        <input type=\"text\" required\n        [(ngModel)]=\"item.item\" name=\"item\">\n      </div>\n      <button type=\"submit\">Add</button>\n    </form>\n</div>\n  ",
            providers: [data_service_1.DataService]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map