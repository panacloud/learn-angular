import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/Observable/merge';

@Component({
  selector: 'my-app',
  template: `<h1>{{clock | async }}</h1>
    <button (click)='click.next()'>Update Clock</button>
  `
})
export class AppComponent { 
  click = new Subject();
  
  clickClock = Observable.merge(click)
  clock = this.click.map(() => new Date());

  constructor(){
    this.clock.subscribe(console.log.bind(console));
  }
}
