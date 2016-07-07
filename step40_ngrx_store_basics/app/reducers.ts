import { ActionReducer, Action } from '@ngrx/store';

export const SECOND = 'SECOND';
export const HOUR = 'HOUR';

export const clockReducer: ActionReducer<Date> = (state = new Date(), action: Action)=> {
    const date = new Date(state.getTime());
    switch(action.type){
        case SECOND:
            date.setSeconds(date.getSeconds() + 1);
            return date;

        case HOUR:
            date.setHours(date.getHours() + 1);
            return date;

        default:
            return state;

    }

};
