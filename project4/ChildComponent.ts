import {Component, View, bootstrap, For, If} from 'angular2/angular2';

@Component({
  selector: 'child'
})
@View({
  templateUrl: "<p>{{message}}</p>",
  directives: [
    For,
    If
  ]
})
export class ChildComponent {
  message: string;
  
  constructor() {
    this.message = "I am the child component";
  }
  
}