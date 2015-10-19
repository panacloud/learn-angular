import Scheduler from '../Scheduler';
import ImmediateAction from './ImmediateAction';
import Subscription from '../Subscription';
import Action from './Action';
export default class ImmediateScheduler implements Scheduler {
    actions: ImmediateAction<any>[];
    active: boolean;
    scheduled: boolean;
    now(): number;
    flush(): void;
    schedule<T>(work: (x?: any) => Subscription<T> | void, delay?: number, state?: any): Subscription<T>;
    scheduleNow<T>(work: (x?: any) => Subscription<T> | void, state?: any): Action;
    scheduleLater<T>(work: (x?: any) => Subscription<T> | void, delay: number, state?: any): Action;
}
