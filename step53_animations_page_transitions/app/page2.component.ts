import { Component, trigger, state, style, animate, transition } from '@angular/core';

@Component({
  selector: 'page2',
  template: `<div @flyInOut="'in'">
              <h1>Page 2 of Angular 2 App</h1>
              <div  class="greenbrick"></div>
            </div>`,
   styles: ['.greenbrick { width: 200px; height: 100px; background: green; }'],
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
export class Page2Component { }