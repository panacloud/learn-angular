import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'page2',
  template: `<h1>Page 2 of Angular 2 App</h1>
             <a [routerLink]="['section1']">Section One</a>
              <a [routerLink]="['section2']">Section Two</a>
             <router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES]
})
export class Page2Component { }