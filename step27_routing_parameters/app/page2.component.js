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
var router_1 = require('@angular/router');
var Page2Component = (function () {
    function Page2Component(route, router) {
        this.route = route;
        this.router = router;
    }
    Page2Component.prototype.ngOnInit = function () {
        var _this = this;
        //Option 1
        //Stick with the this observable params approach if there's even a chance that we might navigate to this component multiple times in a row. 
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params['id']; // (+) converts string 'id' to a number
        });
        //Option 2
        this.id_static = this.route.snapshot.params['id'];
    };
    Page2Component.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    Page2Component = __decorate([
        core_1.Component({
            selector: 'page2',
            template: "<h1>Page 2 of Angular 2 App</h1>\n  <div>The id is {{id}}</div>\n  <div>The id is {{id_static}}, accessed through static api</div>\n  "
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router])
    ], Page2Component);
    return Page2Component;
}());
exports.Page2Component = Page2Component;
//# sourceMappingURL=page2.component.js.map