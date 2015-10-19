import Observable from '../Observable';
export default class InfiniteObservable<T> extends Observable<T> {
    static create<T>(): InfiniteObservable<{}>;
    constructor();
    _subscribe(subscriber: any): void;
}
