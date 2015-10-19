import Scheduler from '../Scheduler';
import Observable from '../Observable';
export default class TimerObservable<T> extends Observable<T> {
    private dueTime;
    private period;
    private scheduler;
    static create(dueTime?: number, period?: number | Scheduler, scheduler?: Scheduler): Observable<number>;
    static dispatch(state: any): void;
    _period: number;
    constructor(dueTime?: number, period?: number | Scheduler, scheduler?: Scheduler);
    _subscribe(subscriber: any): void;
}
