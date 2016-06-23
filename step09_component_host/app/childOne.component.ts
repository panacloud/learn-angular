import {Component} from '@angular/core';

@Component({
    selector: 'child-one',
    template: `<div>This is child One with input: {{data}}</div>`,
    inputs: ['data'],
    host: {
      class: 'row',
      "[style.color]":"backgroundColor()" 
    }
})
export class ChildOneComponent { 
    data: string;
    constructor() {
      this.data = "default value";
    }
    
    backgroundColor(): string {
        return "red";
    }
}