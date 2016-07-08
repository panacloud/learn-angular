import { ActionReducer, Action } from '@ngrx/store';

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
