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
var angularfire2_1 = require('angularfire2');
var AppComponent = (function () {
    function AppComponent(af) {
        this.items = af.database.list('/messages');
    }
    AppComponent.prototype.add = function (newName) {
        this.items.push({ text: newName });
    };
    AppComponent.prototype.update = function (key, name) {
        this.items.update(key, { name: name });
    };
    AppComponent.prototype.deleteItem = function (key) {
        this.items.remove(key);
    };
    AppComponent.prototype.deleteEverything = function () {
        this.items.remove();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n  <ul>\n    <li *ngFor=\"let item of items | async\">\n      <input type=\"text\" #update [value]=\"item.text\" />\n      <button (click)=\"update(item.$key, update.value)\">Update</button>\n      <button (click)=\"deleteItem(item.$key)\">Delete</button>\n    </li>\n  </ul>\n  <input type=\"text\" #newitem />\n  <button (click)=\"add(newitem.value)\">Add</button>\n  <button (click)=\"deleteEverything()\">Delete All</button>\n  ",
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map