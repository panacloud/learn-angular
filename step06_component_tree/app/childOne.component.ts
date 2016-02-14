import {Component} from 'angular2/core';
import {SubChildComponent} from './subChild.component'

@Component({
    selector: 'child-one',
    template: `<div>This is child One</div>
               <sub-child></sub-child>
              `,
    directives: [SubChildComponent]
})
export class ChildOneComponent { 

    constructor() {
     
    }
}