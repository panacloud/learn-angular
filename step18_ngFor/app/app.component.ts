import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
            <div *ngFor="let c of cities">
                <div>{{c}}<div>
            </div>
    `
})
export class AppComponent { 
    
    cities: [string];
    
    constructor(){
        this.cities = ['Karachi', 'Lahore', 'Pindi'];
    }
  
}