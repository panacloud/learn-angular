import {Component} from 'angular2/core';

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