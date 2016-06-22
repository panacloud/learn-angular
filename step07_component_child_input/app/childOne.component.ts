import {Component} from '@angular/core';

@Component({
    selector: 'child-one',
    template: `<div>This is child One with input: {{data}}</div>`,
    inputs: ['data']
})
export class ChildOneComponent { 
    data: string;
    constructor() {
      this.data = "default value";
    }
}