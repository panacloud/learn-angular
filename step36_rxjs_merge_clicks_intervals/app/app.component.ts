import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/Observable/interval';
import 'rxjs/add/Observable/merge';

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
    this.clock = Observable.merge(
            this.click$,
            Observable.interval(5000)
        ).map(()=> new Date());
    this.clock.subscribe(console.log.bind(console));
  }
}
