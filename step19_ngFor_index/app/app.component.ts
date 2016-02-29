import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';

@Component({
    selector: 'my-app',
    template: `
            <div *ngFor="#c of cities; #i = index">
                <div>{{i + 1}} - {{c}}<div>
            </div>
    `,
    directives: [NgFor]
})
export class AppComponent { 
    
    cities: [string];
    
    constructor(){
        this.cities = ['Miami', 'Sao Paulo', 'New York'];
    }
  
}