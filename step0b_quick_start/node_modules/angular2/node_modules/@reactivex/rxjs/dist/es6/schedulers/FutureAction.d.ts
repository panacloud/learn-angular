import Subscription from '../Subscription';
import ImmediateScheduler from './ImmediateScheduler';
import Action from './Action';
import ImmediateAction from './ImmediateAction';
export default class FutureAction<T> extends ImmediateAction<T> {
    scheduler: ImmediateScheduler;
    work: (x?: any) => Subscription<T> | void;
    id: any;
    delay: number;
    constructor(scheduler: ImmediateScheduler, work: (x?: any) => Subscription<T> | void);
    schedule(state?: any, delay?: number): Action;
    unsubscribe(): void;
}
