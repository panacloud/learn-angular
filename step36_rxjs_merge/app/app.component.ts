import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/Observable/interval';
import 'rxjs/add/Observable/merge';

@Component({
  selector: 'my-app',
  template: `<h1>{{clock | async }}</h1>
    <button (click)='click.next()'>Update Clock</button>
  `
})
export class AppComponent { 
  click = new Subject();
  timer = Observable.interval(5000);
  clock = Observable.merge(this.click, this.timer).map(() => new Date());

  constructor(){
    this.clock.subscribe(console.log.bind(console));
  }
}
