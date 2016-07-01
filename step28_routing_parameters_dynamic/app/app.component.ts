import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';


@Component({
  selector: 'my-app',
  template: `<h1>{{title}}</h1>
              <button (click)="onSelect()">Go to page 2 with 19 as parameter</button>
              <router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent { 
  title: string;

  constructor(private router: Router){
    this.title = "My first test of the new router";
  }

  onSelect(){
    this.router.navigate(['/page2', 19]);
  }
}
