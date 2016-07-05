import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Todo} from './Todo';
import {List} from 'immutable';

@Injectable()
export class DataService{
    private _sub$: BehaviorSubject<List<Todo>> = new BehaviorSubject(List([]));

    constructor(){
        
    }

    get todos() {
        return this._sub$.asObservable();
    }


    addItem(item: Todo){
        //We will use another service to talk to the server called http backend service
        //if case it fails update the ui service
        //check out http://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
        let current = this._sub$.getValue();
        current = current.push(item);
        this._sub$.next(current);
    }

}