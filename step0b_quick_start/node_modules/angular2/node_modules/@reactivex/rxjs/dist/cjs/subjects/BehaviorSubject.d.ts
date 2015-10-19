import Subject from '../Subject';
import Subscription from '../Subscription';
export default class BehaviorSubject<T> extends Subject<T> {
    value: any;
    constructor(value: any);
    _subscribe(subscriber: any): Subscription<T>;
    _next(value?: any): void;
}
