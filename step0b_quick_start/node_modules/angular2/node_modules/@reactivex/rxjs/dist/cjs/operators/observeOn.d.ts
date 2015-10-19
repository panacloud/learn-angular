import Observable from '../Observable';
import Scheduler from '../Scheduler';
export default function observeOn<T>(scheduler: Scheduler, delay?: number): Observable<T>;
