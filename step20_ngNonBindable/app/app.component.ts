import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
            <div *ngFor="#j of js; #i = index">
                <span ngNonBindable>{{i + j}}</span>
            </div>
    `
})
export class AppComponent { 
    
    js: [number];
    
    constructor(){
        this.js = [1, 2, 3];
    }
  
}