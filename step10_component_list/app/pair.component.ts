import {Component} from '@angular/core';
import {Pair} from './Pair';

@Component({
    selector: 'pair',
    template: `<div>
                    <span>{{nameValue.name}}: </span>
                    <span>{{nameValue.value}}</span>
               </div>`,
    inputs: ['nameValue']
})
export class PairComponent { 
    nameValue: Pair
    constructor() {
     
    }
}