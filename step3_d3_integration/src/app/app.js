/// <reference path="./../../typings/tsd.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var AppComponent = (function () {
    function AppComponent(elementRef) {
        this.elementRef = elementRef;
    }
    AppComponent.prototype.afterViewInit = function () {
        console.log("afterViewInit() called");
        d3.select(this.elementRef.nativeElement).select("h1").style("background-color", "yellow");
    };
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app',
            template: '<h1>D3.js Integrated if background is yellow</h1>',
            providers: [angular2_1.ElementRef]
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef])
    ], AppComponent);
    return AppComponent;
})();
angular2_1.bootstrap(AppComponent);
//# sourceMappingURL=app.js.map