import Observer from './Observer';
import Subscription from './Subscription';
export default class Subscriber<T> extends Subscription<T> implements Observer<T> {
    protected destination: Observer<any>;
    private _subscription;
    private _isUnsubscribed;
    static create<T>(next?: (x?: any) => void, error?: (e?: any) => void, complete?: () => void): Subscriber<T>;
    _next(value: T): void;
    _error(err: any): void;
    _complete(): void;
    constructor(destination?: Observer<any>);
    isUnsubscribed: boolean;
    add(sub: Subscription<T> | Function | void): void;
    remove(sub: Subscription<T>): void;
    unsubscribe(): void;
    next(value?: any): void;
    error(error?: any): void;
    complete(): void;
}
