import Scheduler from '../Scheduler';
import Observable from '../Observable';
export default class RangeObservable<T> extends Observable<T> {
    static create(start?: number, end?: number, scheduler?: Scheduler): Observable<number>;
    static dispatch(state: any): void;
    private start;
    private end;
    private scheduler;
    constructor(start: number, end: number, scheduler?: Scheduler);
    _subscribe(subscriber: any): void;
}
