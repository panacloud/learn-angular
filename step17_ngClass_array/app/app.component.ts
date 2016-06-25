import {Component} from '@angular/core';

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
  `]
})
export class AppComponent { 
    
    classList: [string];
    
    constructor(){
        this.classList = ['bordered'];
    }
    
  
    
}