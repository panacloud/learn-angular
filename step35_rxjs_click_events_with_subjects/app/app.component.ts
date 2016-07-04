import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Component({
  selector: 'my-app',
  template: `<h1>{{clock | async | date: 'medium' }}</h1>
    <button (click)='click$.next()'>Update Clock</button>
  `
})
export class AppComponent { 
  click$ = new Subject();
  
  clock;

  constructor(){
    this.clock = this.click$.map(()=> new Date());
    this.clock.subscribe(console.log.bind(console));
  }
}

