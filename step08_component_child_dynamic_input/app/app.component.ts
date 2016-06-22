import {Component} from '@angular/core';
import {ChildOneComponent} from './childOne.component';

@Component({
    selector: 'my-app',
    template: ` <div>This is the Root App Component</div>
                <child-one [data] = "mydata"></child-one>
              `,
    directives: [ChildOneComponent]
})
export class AppComponent { 
    mydata: number = 10;
    constructor() {
        setInterval(()=> this.mydata++, 1000);
    }
    
  
}