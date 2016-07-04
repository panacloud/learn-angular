import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from "rxjs/Subject";
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/mapTo';
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
            this.click$.mapTo('hour'),
            Observable.interval(1000).mapTo('second')
        )
            .scan((acc, curr) => {
                const date = new Date(acc.getTime());

                if(curr === 'second'){
                    date.setSeconds(date.getSeconds() + 1);
                }

                if(curr === 'hour'){
                    date.setHours(date.getHours() + 1);
                }

                return date;
            }, new Date());
    }
}