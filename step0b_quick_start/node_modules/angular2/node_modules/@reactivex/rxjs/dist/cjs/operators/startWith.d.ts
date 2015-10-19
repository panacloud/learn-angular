import Scheduler from '../Scheduler';
import Observable from '../Observable';
export default function startWith<T>(...array: (T | Scheduler)[]): Observable<T>;
