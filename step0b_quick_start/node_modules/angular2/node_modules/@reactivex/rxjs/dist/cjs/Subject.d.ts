import Operator from './Operator';
import Observer from './Observer';
import Observable from './Observable';
import Subscriber from './Subscriber';
import Subscription from './Subscription';
export default class Subject<T> extends Observable<T> implements Observer<T>, Subscription<T> {
    _subscriptions: Subscription<T>[];
    _unsubscribe: () => void;
    static create<T>(source: Observable<T>, destination: Observer<T>): Subject<T>;
    destination: Observer<T>;
    observers: Observer<T>[];
    isUnsubscribed: boolean;
    dispatching: boolean;
    errorSignal: boolean;
    errorInstance: any;
    completeSignal: boolean;
    lift<T, R>(operator: Operator<T, R>): Observable<T>;
    _subscribe(subscriber: Subscriber<any>): Subscription<T>;
    add(subscription?: any): void;
    remove(subscription?: any): void;
    unsubscribe(): void;
    next(value: any): void;
    error(error: any): void;
    complete(): void;
    _next(value?: any): void;
    _error(error?: any): void;
    _complete(): void;
}
