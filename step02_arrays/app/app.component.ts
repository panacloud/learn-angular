import {Component} from '@angular/core';
import {NgFor} from '@angular/common';

@Component({
    selector: 'my-app',
    template: `<ul>
                    <li *ngFor="#name of names">Hello {{ name }}</li>
               </ul>`,
    directives: [NgFor]
})
export class AppComponent { 
    names: string[];

    constructor() {
        this.names = ['Zia', 'Hira', 'Inam', 'Rehan', 'Tauha'];
    }
}