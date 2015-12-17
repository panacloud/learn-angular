import {Component} from 'angular2/core';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';


@Component({
  selector: 'my-app',
  directives: [Alert],
  template:`
    <h1>Hello, {{name}}!</h1>
        Say hello to: <input [value]="name" (input)="name = $event.target.value">
        <alert type="success">Hello world by ng2-bootstrap</alert>
    `
})
export class AppComponent {
  name: string = 'World';
}