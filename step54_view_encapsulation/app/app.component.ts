import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'my-app',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [`
    .test {
      padding: 10px;
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