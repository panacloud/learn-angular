import {Component} from '@angular/core';
import {ChildOneComponent} from './childOne.component';

@Component({
    selector: 'my-app',
    template: ` <div>This is the Root App Component</div>
                <child-one data = "data sent to public property"></child-one>
              `,
    directives: [ChildOneComponent]
})
export class AppComponent { 

    constructor() {
        
    }
}