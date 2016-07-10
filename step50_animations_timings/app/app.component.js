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
var AppComponent = (function () {
    function AppComponent() {
        this.model = new hero_1.Hero('');
        this.heroes = [
            new hero_1.Hero('Mr. Zeeshan'),
            new hero_1.Hero('Miss Hira'),
            new hero_1.Hero('Mr. Inam'),
            new hero_1.Hero('Mr. Taha'),
            new hero_1.Hero('Mr. Rehan')
        ];
    }
    AppComponent.prototype.onSubmit = function () {
        console.log("form submited:" + JSON.stringify(this.model));
        this.heroes.push(this.model);
        this.model = new hero_1.Hero('');
    };
    AppComponent.prototype.deleteHero = function (hero) {
        var _this = this;
        this.heroes.forEach(function (ele, index) {
            if (ele.name === hero.name) {
                _this.heroes.splice(index, 1);
                console.log(index);
                console.log(_this.heroes.length);
            }
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            template: "\n    <ul class=\"heroes\">\n      <li *ngFor=\"let hero of heroes\"\n          @flyInOut=\"hero.state\"\n          (click)=\"deleteHero(hero)\">\n        {{hero.name}}\n      </li>\n    </ul>\n    <form (ngSubmit)=\"onSubmit()\">\n      <div>\n        <label for=\"name\">Name</label>\n        <input type=\"text\" required\n        [(ngModel)]=\"model.name\" name=\"name\">\n      </div>\n      <button type=\"submit\">Submit</button>\n    </form>\n  ",
            styles: ["\n  .heroes {\n    margin: 0 0 2em 0;\n    list-style-type: none;\n    padding: 0;\n    width: 15em;\n  }\n  .heroes li {\n    position: relative;\n    left: 0;\n    background-color: #EEE;\n    margin: .5em;\n    padding: .3em 0;\n    height: 1.6em;\n    border-radius: 4px;\n  }\n  .heroes .text {\n    position: relative;\n    top: -3px;\n  }\n  \n"],
            animations: [
                core_1.trigger('flyInOut', [
                    core_1.state('in', core_1.style({ opacity: 1, transform: 'translateX(0)' })),
                    core_1.transition('void => *', [
                        core_1.style({
                            opacity: 0,
                            transform: 'translateX(-100%)'
                        }),
                        core_1.animate('0.2s ease-in')
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate('0.2s 10 ease-out', core_1.style({
                            opacity: 0,
                            transform: 'translateX(100%)'
                        }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map