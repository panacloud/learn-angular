import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
            <h4>Current choice is {{ choice }}</h4>
            <div class="ui raised segment">
                <ul [ngSwitch]="choice">
                    <li *ngSwitchWhen="1">First choice</li>
                    <li *ngSwitchWhen="2">Second choice</li>
                    <li *ngSwitchWhen="3">Third choice</li>
                    <li *ngSwitchWhen="4">Fourth choice</li>
                    <li *ngSwitchWhen="2">Second choice, again</li>
                    <li *ngSwitchDefault>Default choice</li>
                </ul>
            </div>
            <div style="margin-top: 20px;">
                <button class="ui primary button" (click)="nextChoice()">Next choice</button>
            </div>
    `
})
export class AppComponent { 
    choice: number;
    
    constructor(){
        this.choice = 1;
    }
    
    nextChoice(){
        return ++this.choice;
    }
}