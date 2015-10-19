import Subject from '../Subject';
import Scheduler from '../Scheduler';
import Subscription from '../Subscription';
export default class ReplaySubject<T> extends Subject<T> {
    private bufferSize;
    private _windowTime;
    private scheduler;
    private events;
    constructor(bufferSize?: number, _windowTime?: number, scheduler?: Scheduler);
    _next(value?: any): void;
    _subscribe(subscriber: any): Subscription<T>;
    private _getNow();
    private _getEvents(now);
}
