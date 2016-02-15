System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var ImageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ImageComponent = (function () {
                function ImageComponent() {
                    this.clicked = new core_1.EventEmitter();
                    this.url = "./../assets/pakistan.png";
                }
                ImageComponent.prototype.clickPressed = function (event) {
                    this.clicked.emit(event);
                };
                ImageComponent = __decorate([
                    core_1.Component({
                        selector: 'clickable-image',
                        template: "<div>\n                    <img src=\"{{url}}\" width=\"100px\" height=\"100px\" (click)=\"clickPressed($event)\">\n               </div>",
                        inputs: ['url'],
                        outputs: ['clicked']
                    }), 
                    __metadata('design:paramtypes', [])
                ], ImageComponent);
                return ImageComponent;
            })();
            exports_1("ImageComponent", ImageComponent);
        }
    }
});
//# sourceMappingURL=image.component.js.map