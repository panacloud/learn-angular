import { Component, trigger, state, style, animate, transition } from '@angular/core';

@Component({
  selector: 'page1',
  template: `<div @flyInOut="'in'">
                <h1>Page 1 of Angular 2 App</h1>
                <div  class="redbrick"></div>
              </div>`,
   styles: ['.redbrick { width: 200px; height: 100px; background: red; }'],
   animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(1000)
      ]),
      transition('* => void', [
        animate(1000, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class Page1Component { }