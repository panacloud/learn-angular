import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
            <div [style.background-color]="'yellow'" [style.font-size.px]="fontSize">
                Uses fixed yellow background with dynamic font size
            </div>
            <button (click)="increaseFontSize()">Increase Font Size</button>
    `
})
export class AppComponent { 
    fontSize: number;
    
    constructor(){
        this.fontSize = 12;
    }
    
    increaseFontSize(){
        return ++this.fontSize;
    }
}