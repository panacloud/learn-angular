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
var NameList_1 = require('../../services/NameList');
var About = (function () {
    function About(list) {
        this.list = list;
        this.names = list.get();
    }
    About.prototype.addName = function (newname) {
        this.list.add(newname.value);
        newname.value = '';
    };
    About = __decorate([
        angular2_1.Component({
            selector: 'component-2',
            appInjector: [NameList_1.NamesList]
        }),
        angular2_1.View({
            templateUrl: './components/about/about.html',
            directives: [angular2_1.NgFor]
        }), 
        __metadata('design:paramtypes', [NameList_1.NamesList])
    ], About);
    return About;
})();
exports.About = About;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYWJvdXQvYWJvdXQudHMiXSwibmFtZXMiOlsiQWJvdXQiLCJBYm91dC5jb25zdHJ1Y3RvciIsIkFib3V0LmFkZE5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEseUJBQXFDLG1CQUFtQixDQUFDLENBQUE7QUFFekQseUJBQXdCLHlCQUF5QixDQUFDLENBQUE7QUFFbEQ7SUFZRUEsZUFBWUEsSUFBZUE7UUFDekJDLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBO1FBQ2pCQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtJQUMxQkEsQ0FBQ0E7SUFDREQsdUJBQU9BLEdBQVBBLFVBQVFBLE9BQU9BO1FBQ2JFLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBQzdCQSxPQUFPQSxDQUFDQSxLQUFLQSxHQUFHQSxFQUFFQSxDQUFDQTtJQUNyQkEsQ0FBQ0E7SUFuQkhGO1FBQUNBLG9CQUFTQSxDQUFDQTtZQUNUQSxRQUFRQSxFQUFFQSxhQUFhQTtZQUN2QkEsV0FBV0EsRUFBRUEsQ0FBQ0Esb0JBQVNBLENBQUNBO1NBQ3pCQSxDQUFDQTtRQUNEQSxlQUFJQSxDQUFDQTtZQUNKQSxXQUFXQSxFQUFFQSwrQkFBK0JBO1lBQzVDQSxVQUFVQSxFQUFFQSxDQUFDQSxnQkFBS0EsQ0FBQ0E7U0FDcEJBLENBQUNBOztjQWFEQTtJQUFEQSxZQUFDQTtBQUFEQSxDQXBCQSxBQW9CQ0EsSUFBQTtBQVpZLGFBQUssUUFZakIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2Fib3V0L2Fib3V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIFZpZXcsIE5nRm9yfSBmcm9tICdhbmd1bGFyMi9hbmd1bGFyMic7XG5cbmltcG9ydCB7TmFtZXNMaXN0fSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9OYW1lTGlzdCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NvbXBvbmVudC0yJyxcbiAgYXBwSW5qZWN0b3I6IFtOYW1lc0xpc3RdXG59KVxuQFZpZXcoe1xuICB0ZW1wbGF0ZVVybDogJy4vY29tcG9uZW50cy9hYm91dC9hYm91dC5odG1sJyxcbiAgZGlyZWN0aXZlczogW05nRm9yXVxufSlcbmV4cG9ydCBjbGFzcyBBYm91dCB7XG4gIG5hbWVzOiBBcnJheTxzdHJpbmc+O1xuICBsaXN0OiBOYW1lc0xpc3Q7XG5cbiAgY29uc3RydWN0b3IobGlzdDogTmFtZXNMaXN0KSB7XG4gICAgdGhpcy5saXN0ID0gbGlzdDtcbiAgICB0aGlzLm5hbWVzID0gbGlzdC5nZXQoKTtcbiAgfVxuICBhZGROYW1lKG5ld25hbWUpIHtcbiAgICB0aGlzLmxpc3QuYWRkKG5ld25hbWUudmFsdWUpO1xuICAgIG5ld25hbWUudmFsdWUgPSAnJztcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==