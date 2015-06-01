import {Component, View, For, If} from 'angular2/angular2';

//TypeScript
@Component({
  selector: 'child',
  properties: {componentmessage: "componentmessage"};
})
@View({
  template: `
    <p> {{ componentmessage }} </p>
  `
})
export class ChildComponent {
  componentmessage: string;
  constructor() {
  }
}