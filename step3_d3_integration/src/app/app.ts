/// <reference path="./../../typings/tsd.d.ts" />

import {Component, bootstrap, ElementRef} from 'angular2/angular2';

@Component({
    selector: 'my-app',
    template: '<h1>D3.js Integrated if background is yellow</h1>',
    providers: [ElementRef]
})
class AppComponent { 
    elementRef: ElementRef;
    
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    
    afterViewInit(){
        console.log("afterViewInit() called");
        d3.select(this.elementRef.nativeElement).select("h1").style("background-color", "yellow");
    }
}
bootstrap(AppComponent);