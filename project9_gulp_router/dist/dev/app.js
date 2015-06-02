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
/// <reference path="../typings/angular2/angular2.d.ts" />
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var home_1 = require('./components/home/home');
var about_1 = require('./components/about/about');
var App = (function () {
    function App() {
    }
    App = __decorate([
        angular2_1.Component({
            selector: 'app'
        }),
        router_1.RouteConfig([
            { path: '/', component: home_1.Home, as: 'home' },
            { path: '/about', component: about_1.About, as: 'about' }
        ]),
        angular2_1.View({
            templateUrl: './app.html',
            directives: [router_1.RouterOutlet, router_1.RouterLink]
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
})();
angular2_1.bootstrap(App, [router_1.routerInjectables]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC50cyJdLCJuYW1lcyI6WyJBcHAiLCJBcHAuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsQUFDQSwwREFEMEQ7QUFDMUQseUJBQWdELG1CQUFtQixDQUFDLENBQUE7QUFDcEUsdUJBQXVFLGlCQUFpQixDQUFDLENBQUE7QUFFekYscUJBQW1CLHdCQUF3QixDQUFDLENBQUE7QUFDNUMsc0JBQW9CLDBCQUEwQixDQUFDLENBQUE7QUFFL0M7SUFBQUE7SUFXV0MsQ0FBQ0E7SUFYWkQ7UUFBQ0Esb0JBQVNBLENBQUNBO1lBQ1RBLFFBQVFBLEVBQUVBLEtBQUtBO1NBQ2hCQSxDQUFDQTtRQUNEQSxvQkFBV0EsQ0FBQ0E7WUFDWEEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsU0FBU0EsRUFBRUEsV0FBSUEsRUFBRUEsRUFBRUEsRUFBRUEsTUFBTUEsRUFBRUE7WUFDMUNBLEVBQUVBLElBQUlBLEVBQUVBLFFBQVFBLEVBQUVBLFNBQVNBLEVBQUVBLGFBQUtBLEVBQUVBLEVBQUVBLEVBQUVBLE9BQU9BLEVBQUVBO1NBQ2xEQSxDQUFDQTtRQUNEQSxlQUFJQSxDQUFDQTtZQUNKQSxXQUFXQSxFQUFFQSxZQUFZQTtZQUN6QkEsVUFBVUEsRUFBRUEsQ0FBQ0EscUJBQVlBLEVBQUVBLG1CQUFVQSxDQUFDQTtTQUN2Q0EsQ0FBQ0E7O1lBQ1VBO0lBQURBLFVBQUNBO0FBQURBLENBWFgsQUFXWUEsSUFBQTtBQUdaLG9CQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsMEJBQWlCLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL2FuZ3VsYXIyL2FuZ3VsYXIyLmQudHNcIiAvPlxuaW1wb3J0IHtDb21wb25lbnQsIFZpZXcsIGJvb3RzdHJhcCwgTmdGb3J9IGZyb20gJ2FuZ3VsYXIyL2FuZ3VsYXIyJztcbmltcG9ydCB7Um91dGVDb25maWcsIFJvdXRlck91dGxldCwgUm91dGVyTGluaywgcm91dGVySW5qZWN0YWJsZXN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XG5cbmltcG9ydCB7SG9tZX0gZnJvbSAnLi9jb21wb25lbnRzL2hvbWUvaG9tZSc7XG5pbXBvcnQge0Fib3V0fSBmcm9tICcuL2NvbXBvbmVudHMvYWJvdXQvYWJvdXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAnXG59KVxuQFJvdXRlQ29uZmlnKFtcbiAgeyBwYXRoOiAnLycsIGNvbXBvbmVudDogSG9tZSwgYXM6ICdob21lJyB9LFxuICB7IHBhdGg6ICcvYWJvdXQnLCBjb21wb25lbnQ6IEFib3V0LCBhczogJ2Fib3V0JyB9XG5dKVxuQFZpZXcoe1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwLmh0bWwnLFxuICBkaXJlY3RpdmVzOiBbUm91dGVyT3V0bGV0LCBSb3V0ZXJMaW5rXVxufSlcbmNsYXNzIEFwcCB7fVxuXG5cbmJvb3RzdHJhcChBcHAsIFtyb3V0ZXJJbmplY3RhYmxlc10pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9