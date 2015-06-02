/// <reference path="typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, For, If} from 'angular2/angular2';
import {ChildComponent} from 'ChildComponent';


//TypeScript
@Component({
  selector: 'parent'
})
@View({
  template: `
    <h1>{{ message }}</h1>
    <child (complete)="workDone()"></child>
  `,
  directives: [ChildComponent]
})
class ParentComponent {
  message: string;
  
  constructor() {
    this.message = "I'm the parent";
  }
  
  workDone(){
    console.log("Work is completed");
  }
}

bootstrap(ParentComponent);