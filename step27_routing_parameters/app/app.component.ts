import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  selector: 'my-app',
  template: `<h1>{{title}}</h1>
              <a [routerLink]="['/page1']">Page One</a>
              <a [routerLink]="['/page2', 15]">Page Two</a>
              <router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent { 
  title: string;

  constructor(){
    this.title = "My first test of the new router";
  }
}
