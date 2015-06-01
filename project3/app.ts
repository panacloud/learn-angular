/// <reference path="typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, For, If} from 'angular2/angular2';


@Component({
  selector: 'my-app'
})
@View({
  templateUrl: "todo.html",
  directives: [
    For,
    If
  ]
})
class TodoComponent {
  items: string[];
  
  constructor() {
    this.items = ["Eat Nihari", "Buy Choclate", "Go on vacation"];
  }
  
  addItem(item: string){
    this.items.push(item);
  }
  
  doneTyping($event) {
    if($event.which === 13) {
      this.addItem($event.target.value);
      $event.target.value = null;
    }
  }
}

bootstrap(TodoComponent);