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
var hero_1 = require('./hero');
var HeroFormComponent = (function () {
    function HeroFormComponent() {
        this.model = new hero_1.Hero(18, 'Dr Zeeshan');
        this.submitted = false;
    }
    HeroFormComponent.prototype.onSubmit = function () {
        console.log("form submited:" + JSON.stringify(this.model));
        this.submitted = true;
    };
    Object.defineProperty(HeroFormComponent.prototype, "diagnostic", {
        // TODO: Remove this when we're done
        get: function () { return JSON.stringify(this.model); },
        enumerable: true,
        configurable: true
    });
    HeroFormComponent = __decorate([
        core_1.Component({
            selector: 'hero-form',
            template: "<div>\n    <h1>Hero Form</h1>\n    <form (ngSubmit)=\"onSubmit()\">\n      <div>\n        <label for=\"name\">Name</label>\n        <input type=\"text\" required\n        [(ngModel)]=\"model.name\" name=\"name\" #spy>\n         <br>TODO: remove this: model.name: {{model.name}}\n         <br>TODO: remove this: spy.className: {{spy.className}}\n      </div>\n      <button type=\"submit\">Submit</button>\n    </form>\n</div>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], HeroFormComponent);
    return HeroFormComponent;
}());
exports.HeroFormComponent = HeroFormComponent;
//# sourceMappingURL=heroform.component.js.map