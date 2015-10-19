import Scheduler from '../Scheduler';
import Observable from '../Observable';
export default class ArrayObservable<T> extends Observable<T> {
    array: T[];
    scheduler: Scheduler;
    static create<T>(array: T[], scheduler?: Scheduler): ArrayObservable<T>;
    static of<T>(...array: (T | Scheduler)[]): Observable<T>;
    static dispatch(state: any): void;
    value: any;
    constructor(array: T[], scheduler?: Scheduler);
    _subscribe(subscriber: any): void;
}
