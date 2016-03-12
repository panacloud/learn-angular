System.register(['angular2/core', 'angular2/platform/browser', 'angularfire2', 'firebase'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, browser_1, angularfire2_1, firebase_1;
    var rootFirebase, ref, App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (angularfire2_1_1) {
                angularfire2_1 = angularfire2_1_1;
            },
            function (firebase_1_1) {
                firebase_1 = firebase_1_1;
            }],
        execute: function() {
            core_1.enableProdMode();
            rootFirebase = 'https://multi-test.firebaseio.com/';
            ref = new firebase_1.default(rootFirebase);
            ref.child('questions').set([{
                    question: 'why?'
                }, {
                    question: 'how?'
                }]);
            App = (function () {
                function App(questions) {
                    this.questions = questions;
                }
                App = __decorate([
                    core_1.Component({
                        template: "\n    <h1>Hello</h1>\n    <div *ngFor=\"#question of questions | async\">\n      {{question.val().question}}\n    </div>\n  ",
                        selector: 'app',
                        providers: [angularfire2_1.FirebaseList('/questions')]
                    }),
                    __param(0, core_1.Inject('/questions')), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof angularfire2_1.FirebaseObservable !== 'undefined' && angularfire2_1.FirebaseObservable) === 'function' && _a) || Object])
                ], App);
                return App;
                var _a;
            }());
            browser_1.bootstrap(App, [
                core_1.provide(angularfire2_1.FirebaseUrl, {
                    useValue: rootFirebase
                })]);
        }
    }
});
//# sourceMappingURL=main.js.map