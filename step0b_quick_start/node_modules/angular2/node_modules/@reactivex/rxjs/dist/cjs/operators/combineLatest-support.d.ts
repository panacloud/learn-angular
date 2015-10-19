import Operator from '../Operator';
import Subscriber from '../Subscriber';
import OuterSubscriber from '../OuterSubscriber';
export declare class CombineLatestOperator<T, R> implements Operator<T, R> {
    project: (...values: Array<any>) => R;
    constructor(project?: (...values: Array<any>) => R);
    call(subscriber: Subscriber<R>): Subscriber<T>;
}
export declare class CombineLatestSubscriber<T, R> extends OuterSubscriber<T, R> {
    private project;
    private active;
    private values;
    private observables;
    private toRespond;
    constructor(destination: Subscriber<R>, project?: (...values: Array<any>) => R);
    _next(observable: any): void;
    _complete(): void;
    notifyComplete(innerSubscriber: any): void;
    notifyNext(observable: any, value: R, outerIndex: number, innerIndex: number): void;
}
