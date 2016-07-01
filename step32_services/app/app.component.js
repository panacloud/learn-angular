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
var hero_service_1 = require('./hero.service');
var AppComponent = (function () {
    function AppComponent(heroService) {
        this.heroService = heroService;
    }
    AppComponent.prototype.onSelected = function () {
        this.selected = this.heroService.getHeroes()[this.randomIntFromInterval(0, 4)];
    };
    AppComponent.prototype.randomIntFromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    AppComponent.prototype.ngOnInit = function () {
        this.selected = this.heroService.getHeroes()[0];
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "<h1>My Heros</h1>\n  <button (click)=\"onSelected()\">Print Name</button>\n  {{selected}}\n  ",
            providers: [hero_service_1.HeroService]
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map