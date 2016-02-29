import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
            <div *ngFor="#c of cities">
                <div>{{c}}<div>
            </div>
    `
})
export class AppComponent { 
    
    cities: [string];
    
    constructor(){
        this.cities = ['Miami', 'Sao Paulo', 'New York'];
    }
  
}