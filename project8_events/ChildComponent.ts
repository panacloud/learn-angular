import {Component, View, For, If, EventEmitter} from 'angular2/angular2';

//TypeScript
@Component({
  selector: 'child',
  events: ['complete']
})
@View({
  template: `
    <button (click)="onPress()">Fire Complete Event</button>
  `
})
export class ChildComponent {
  complete: EventEmitter;
  constructor() {
    this.complete = new EventEmitter();
  }
  
  onPress(){
    this.complete.next();
  }
}