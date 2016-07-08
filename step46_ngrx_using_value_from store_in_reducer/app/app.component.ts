import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/withLatestFrom';
import {Subject} from "rxjs/Subject";
import {Store} from '@ngrx/store';
import { SECOND, HOUR, ADVANCE, RECALL, IPerson } from './reducers';
import {Clock} from './clock.component';
import {List} from 'immutable';

@Component({
    selector: 'my-app',
    directives: [Clock],
    template: `
        <input #inputNum type="number" value="0">
        <button (click)="click$.next(inputNum.value)">Update</button>
        <clock [time]="time | async"></clock>
        <div (click)="person$.next(person)" *ngFor="let person of people | async">
            {{person.name}} is in {{person.time | date:'jms'}}        
        </div>
        <button (click)="recall$.next()">Recall</button>
        `
})
export class AppComponent {
    click$ = new Subject()
        .map((value: string)=> ({type:HOUR, payload:parseInt(value)}));;

    seconds$ = Observable
        .interval(1000)
        .mapTo({type: SECOND, payload:3});

    person$ = new Subject()
        .map((value)=>({payload: value, type:ADVANCE}));

    recall$ = new Subject();

    time: Observable<Date>;
    people: Observable<List<IPerson>>;

    constructor(store:Store<Date>) {
        this.time = store.select('clock');
        this.people = store.select('people');

        Observable.merge(
            this.click$,
            this.seconds$,
            this.person$,
            this.recall$
                .withLatestFrom(this.time, (_, y)=> y)
                .map((time)=> ({type:RECALL, payload: time}))
        )
        .subscribe(store.dispatch.bind(store));//Note this
            
    }
}