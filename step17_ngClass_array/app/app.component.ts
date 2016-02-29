import {Component} from 'angular2/core';
import {NgClass} from 'angular2/common';

@Component({
    selector: 'my-app',
    template: `
            <div [ngClass]="classList">This is text</div>
    `,
    styles: [`
        .bordered {
            border: 1px dashed black;
            background-color: #eee;
        }
  `],
    directives: [NgClass]
})
export class AppComponent { 
    
    classList: [string];
    
    constructor(){
        this.classList = ['bordered'];
    }
    
  
    
}