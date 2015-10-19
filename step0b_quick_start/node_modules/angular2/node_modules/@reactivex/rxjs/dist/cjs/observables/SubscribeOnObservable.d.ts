import Scheduler from '../Scheduler';
import Observable from '../Observable';
export default class SubscribeOnObservable<T> extends Observable<T> {
    static create<T>(source: Observable<T>, delay?: number, scheduler?: Scheduler): SubscribeOnObservable<T>;
    static dispatch({source, subscriber}: {
        source: any;
        subscriber: any;
    }): any;
    private delayTime;
    private scheduler;
    constructor(source: Observable<T>, delay?: number, scheduler?: Scheduler);
    _subscribe(subscriber: any): void;
}
