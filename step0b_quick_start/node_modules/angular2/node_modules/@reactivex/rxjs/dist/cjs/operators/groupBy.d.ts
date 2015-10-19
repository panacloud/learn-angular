import Observable from '../Observable';
import { RefCountSubscription, GroupedObservable } from './groupBy-support';
export declare function groupBy<T, R>(keySelector: (value: T) => string, elementSelector?: (value: T) => R, durationSelector?: (grouped: GroupedObservable<R>) => Observable<any>): GroupByObservable<T, R>;
export declare class GroupByObservable<T, R> extends Observable<GroupedObservable<R>> {
    source: Observable<T>;
    private keySelector;
    private elementSelector;
    private durationSelector;
    constructor(source: Observable<T>, keySelector: (value: T) => string, elementSelector?: (value: T) => R, durationSelector?: (grouped: GroupedObservable<R>) => Observable<any>);
    _subscribe(subscriber: any): RefCountSubscription<{}>;
}
