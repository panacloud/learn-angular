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
        this.item = af.database.object('/item');
    }
    AppComponent.prototype.save = function (newName) {
        this.item.set({ name: newName });
    };
    AppComponent.prototype.update = function (newSize) {
        this.item.update({ size: newSize });
    };
    AppComponent.prototype.delete = function () {
        this.item.remove();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n  <h1>{{ item | async | json }}</h1>\n  <input type=\"text\" #newname placeholder=\"Name\" />\n  <input type=\"text\" #newsize placeholder=\"Size\" />\n  <br />\n  <button (click)=\"save(newname.value)\">Set Name</button>\n  <button (click)=\"update(newsize.value)\">Update Size</button>\n  <button (click)=\"delete()\">Delete</button>\n  ",
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map