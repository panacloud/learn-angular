/// <reference path="typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, For, If} from 'angular2/angular2';


@Component({
  selector: 'my-app'
})
@View({
  templateUrl: "list.html",
  directives: [
    For,
    If
  ]
})
class MyAppComponent {
  name: string;
  friends: string[];
  
  constructor() {
    this.name = "Zia";
    this.friends = ["Sam", "Nicole", "Ahmed"];
  }
}

bootstrap(MyAppComponent);