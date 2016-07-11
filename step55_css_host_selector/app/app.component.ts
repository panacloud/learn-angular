import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'my-app',
  encapsulation: ViewEncapsulation.Native,
  styles: [`
    :host {
      display: block;
      padding: 10px;
      background: red;
    }
  `],
  template: `
    <div class="test">
      <div>
        Title: 
      </div>
      <input type="text" [(ngModel)]="title">
    </div>
  `
})
export class AppComponent {
  public title = 'Hello!';
}