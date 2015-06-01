/// <reference path="typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, For, If} from 'angular2/angular2';
import {ChildComponent} from 'ChildComponent';



@Component({
  selector: 'my-app'
})
@View({
  template: "<p>Tree Component</p><child></child>",
  directives: [
    For,
    If,
    ChildComponent
  ]
})
class TreeComponent {
  
  constructor() {
    
  }
  
}

bootstrap(TreeComponent);