import Observable from '../Observable';
import Operator from '../Operator';
import Subscriber from '../Subscriber';
import Subscription from '../Subscription';
import Observer from '../Observer';
import OuterSubscriber from '../OuterSubscriber';
export declare class MergeMapOperator<T, R, R2> implements Operator<T, R> {
    private project;
    private resultSelector;
    private concurrent;
    constructor(project: (value: T, index: number) => Observable<R>, resultSelector?: (outerValue: T, innerValue: R, outerIndex: number, innerIndex: number) => R2, concurrent?: number);
    call(observer: Subscriber<R>): Subscriber<T>;
}
export declare class MergeMapSubscriber<T, R, R2> extends OuterSubscriber<T, R> {
    private project;
    private resultSelector;
    private concurrent;
    private hasCompleted;
    private buffer;
    private active;
    protected index: number;
    constructor(destination: Observer<T>, project: (value: T, index: number) => Observable<R>, resultSelector?: (outerValue: T, innerValue: R, outerIndex: number, innerIndex: number) => R2, concurrent?: number);
    _next(value: any): void;
    _innerSub(ish: any, value: T, index: number): void;
    _complete(): void;
    notifyNext(outerValue: T, innerValue: R, outerIndex: number, innerIndex: number): void;
    notifyComplete(innerSub: Subscription<T>): void;
}
