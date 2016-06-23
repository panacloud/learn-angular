import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<ul>
                    <li *ngFor="let name of names">Hello {{ name }}</li>
               </ul>`
})
export class AppComponent { 
    names: string[];

    constructor() {
        this.names = ['Zia', 'Hira', 'Inam', 'Rehan', 'Tauha'];
    }
}