import {Component} from 'angular2/core';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';


@Component({
  selector: 'my-app',
  template:`
    <alert type="info">ng2-bootstrap hello world!</alert>
  `,
  directives: [
    Alert
  ]
   
})
export class AppComponent {
 
}