/// <reference path="typings/angular2/angular2.d.ts" />
if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var TodoComponent = (function () {
    function TodoComponent() {
        this.items = ["Eat Nihari", "Buy Choclate", "Go on vacation"];
    }
    TodoComponent.prototype.addItem = function (field) {
        this.items.push(field.value);
        field.value = null;
    };
    TodoComponent.prototype.doneTyping = function ($event) {
        if ($event.which === 13) {
            this.addItem($event.target);
        }
    };
    TodoComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app'
        }),
        angular2_1.View({
            templateUrl: "todo.html",
            directives: [
                angular2_1.For,
                angular2_1.If
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], TodoComponent);
    return TodoComponent;
})();
angular2_1.bootstrap(TodoComponent);
