import Operator from '../Operator';
import Observer from '../Observer';
import Observable from '../Observable';
import Subscriber from '../Subscriber';
import Subscription from '../Subscription';
import OuterSubscriber from '../OuterSubscriber';
export declare class ExpandOperator<T, R> implements Operator<T, R> {
    private project;
    private concurrent;
    constructor(project: (value: T, index: number) => Observable<any>, concurrent?: number);
    call(subscriber: Subscriber<R>): Subscriber<T>;
}
export declare class ExpandSubscriber<T, R> extends OuterSubscriber<T, R> {
    private project;
    private concurrent;
    private index;
    private active;
    private hasCompleted;
    private buffer;
    constructor(destination: Observer<T>, project: (value: T, index: number) => Observable<R>, concurrent?: number);
    _next(value: any): void;
    _complete(): void;
    notifyComplete(innerSub: Subscription<T>): void;
    notifyNext(outerValue: T, innerValue: R, outerIndex: number, innerIndex: number): void;
}
