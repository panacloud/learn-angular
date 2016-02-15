import {Component} from 'angular2/core';
import {PairComponent} from './pair.component';
import {Pair} from './Pair';
import {NgFor} from 'angular2/common'

@Component({
    selector: 'my-app',
    template: ` <div>This is the Root App Component</div>
                <pair *ngFor="#mypair of pairs" [nameValue]="mypair"></pair>
              `,
    directives: [PairComponent, NgFor]
})
export class AppComponent { 
    pairs: Pair[];
    constructor() {
        this.pairs = [
            new Pair("cotton", 6),
            new Pair("food", 9)
        ]
    }
}