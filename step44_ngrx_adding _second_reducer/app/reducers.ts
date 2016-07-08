import { ActionReducer, Action } from '@ngrx/store';
import {List} from 'immutable';

export const SECOND = 'SECOND';
export const HOUR = 'HOUR';

export const clockReducer: ActionReducer<Date> = (state = new Date(), action: Action)=> {
    const date = new Date(state.getTime());
    switch(action.type){
        case SECOND:
            date.setSeconds(date.getSeconds() + action.payload);
            return date;

        case HOUR:
            date.setHours(date.getHours() + action.payload);
            return date;

        default:
            return state;

    }

};

export interface IPerson {
    name: string;
    time: string;
}

const defaultPeople : List<IPerson> = List([
    {name: "Sara", time: ""},
    {name: "John", time: ""},
    {name: "Nancy", time: ""},
    {name: "Drew", time: ""}
]);
export const peopleReducer = (state = defaultPeople, action: Action)=> {
    switch (action.type) {

        default:
            return state;
    }
};
