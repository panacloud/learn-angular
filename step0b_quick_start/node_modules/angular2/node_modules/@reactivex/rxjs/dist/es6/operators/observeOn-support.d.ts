import Scheduler from '../Scheduler';
import Operator from '../Operator';
import Subscriber from '../Subscriber';
export declare class ObserveOnOperator<T, R> implements Operator<T, R> {
    delay: number;
    scheduler: Scheduler;
    constructor(scheduler: Scheduler, delay?: number);
    call(subscriber: Subscriber<T>): Subscriber<T>;
}
export declare class ObserveOnSubscriber<T> extends Subscriber<T> {
    static dispatch({notification, destination}: {
        notification: any;
        destination: any;
    }): void;
    delay: number;
    scheduler: Scheduler;
    constructor(destination: Subscriber<T>, scheduler: Scheduler, delay?: number);
    _next(x: any): void;
    _error(e: any): void;
    _complete(): void;
}
