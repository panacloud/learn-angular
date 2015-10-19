import Scheduler from '../Scheduler';
import Observable from '../Observable';
export default function subscribeOn<T>(scheduler: Scheduler, delay?: number): Observable<T>;
