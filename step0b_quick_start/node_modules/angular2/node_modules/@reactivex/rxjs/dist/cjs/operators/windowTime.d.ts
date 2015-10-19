import Observable from '../Observable';
import Scheduler from '../Scheduler';
export default function windowTime<T>(windowTimeSpan: number, windowCreationInterval?: number, scheduler?: Scheduler): Observable<Observable<T>>;
