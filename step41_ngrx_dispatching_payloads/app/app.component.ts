import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/mapTo';
import {Subject} from "rxjs/Subject";
import {Store} from '@ngrx/store';
import { SECOND, HOUR } from './reducers';

@Component({
    selector: 'my-app',
    template: `
        <button (click)="click$.next()">Update</button>
        <h1>{{clock | async | date:'medium'}}</h1>
        `
})
export class AppComponent {
    click$ = new Subject();

    clock : Observable<Date>;

    constructor(store:Store<Date>) {
        this.clock = store.select('clock');


        Observable.merge(
            this.click$.mapTo({type:HOUR, payload:4}),
            Observable.interval(1000).mapTo({type:SECOND, payload:3})
        )
            .subscribe((action)=>{
                store.dispatch(action)
            })
    }
}