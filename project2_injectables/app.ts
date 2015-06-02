/// <reference path="typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, For, If} from 'angular2/angular2';
import {FriendsService} from 'FriendsService';


@Component({
  selector: 'my-app',
  injectables: [ FriendsService ]
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
  
  constructor(friendsSerice: FriendsService) {
    this.name = "Zia";
    this.friends = friendsSerice.array;
  }
}

bootstrap(MyAppComponent);