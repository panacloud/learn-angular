import Observable from '../Observable';
import Subscriber from '../Subscriber';
export default class ForkJoinObservable<T> extends Observable<T> {
    private observables;
    constructor(observables: Observable<any>[]);
    static create<R>(...observables: Observable<any>[]): Observable<R>;
    _subscribe(subscriber: Subscriber<any>): void;
}
