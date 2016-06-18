import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<input [value]="'Hello ' + name">`
})
export class AppComponent { 
    name: string;

    constructor() {
        this.name = 'Zia';
    }
}