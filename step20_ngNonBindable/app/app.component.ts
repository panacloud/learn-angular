import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
            <div *ngFor="let j of js; let i = index">
                <span ngNonBindable>{{i + j}}</span>
                 <span>{{i + j}}</span>
            </div>
    `
})
export class AppComponent { 
    
    js: [number];
    
    constructor(){
        this.js = [1, 2, 3];
    }
  
}