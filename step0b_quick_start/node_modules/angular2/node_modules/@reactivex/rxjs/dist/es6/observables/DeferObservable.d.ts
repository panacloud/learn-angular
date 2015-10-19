import Observable from '../Observable';
export default class DeferObservable<T> extends Observable<T> {
    static create<T>(observableFactory: () => Observable<T>): Observable<T>;
    observableFactory: () => Observable<T>;
    constructor(observableFactory: any);
    _subscribe(subscriber: any): void;
}
