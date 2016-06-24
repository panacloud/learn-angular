import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<div *ngIf="false">This will not show</div>
              <div *ngIf="true">This will show</div>
              <div *ngIf="a > b">This will show because 5 is greater then 4</div>
              <div *ngIf="myFunction()">This will show because function returns a true value</div>
    `
})
export class AppComponent { 
    a: number;
    b: number;
    
    constructor(){
        this.a = 5;
        this.b = 4;
    }
    
    myFunction(){
        return true;
    }
}