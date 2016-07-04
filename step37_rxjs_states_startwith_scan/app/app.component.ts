import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from "rxjs/Subject";
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';

@Component({
    selector: 'my-app',
    template: `
        <button (click)="click$.next()">Update Clock</button>
        <h1>{{clock | async | date:'medium'}}</h1>
        `
})
export class AppComponent {
    click$ = new Subject();

    clock;

    constructor() {
        this.clock = Observable.merge(
            this.click$,
            Observable.interval(1000)
        )
            .startWith(new Date())
            .scan((acc: Date, curr)=> {
                const date = new Date(acc.getTime());

                date.setSeconds(date.getSeconds() + 1);

                return date;
            });
    }
}