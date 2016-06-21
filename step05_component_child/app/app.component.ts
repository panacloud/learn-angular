import {Component} from '@angular/core';
import {ChildOneComponent} from './childOne.component';

@Component({
    selector: 'my-app',
    template: ` <div>This is the Root App Component</div>
                <child-one></child-one>
              `,
    directives: [ChildOneComponent]
})
export class AppComponent { 

    constructor() {
        
    }
}