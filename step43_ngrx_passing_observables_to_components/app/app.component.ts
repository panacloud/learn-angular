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
import {Clock} from './clock.component';

@Component({
    selector: 'my-app',
    directives: [Clock],
    template: `
        <input #inputNum type="number" value="0">
        <button (click)="click$.next(inputNum.value)">Update</button>
        <clock [time]="time | async"></clock>
        `
})
export class AppComponent {
    click$ = new Subject()
        .map((value: string)=> ({type:HOUR, payload:parseInt(value)}));;

    seconds$ = Observable
        .interval(1000)
        .mapTo({type: SECOND, payload:3});

    time: Observable<Date>;

    constructor(store:Store<Date>) {
        this.time = store.select('clock');


        Observable.merge(
            this.click$,
            this.seconds$
        )
        .subscribe(store.dispatch.bind(store));//Note this
            
    }
}