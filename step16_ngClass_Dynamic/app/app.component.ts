import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
            <div [ngClass]="{bordered: isBordered}">This is text</div>
            <button (click)=toggleBorder()>Toogle Border</button>
    `,
    styles: [`
        .bordered {
            border: 1px dashed black;
            background-color: #eee;
        }
  `]
})
export class AppComponent { 
    
    isBordered: boolean;
    
    constructor(){
        this.isBordered = true;
    }
    
    toggleBorder(){
        this.isBordered = !this.isBordered;
    }
    
}