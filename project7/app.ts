/// <reference path="typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, For, If} from 'angular2/angular2';


//TypeScript
@Component({
  selector: 'parent'
})
@View({
  template: `
    <input #myvariable (keyup)></input>
    <p>{{myvariable.value}}</p>

  `,
  directives: []
})
class ParentComponent {
  
  constructor() {
  }
}

bootstrap(ParentComponent);