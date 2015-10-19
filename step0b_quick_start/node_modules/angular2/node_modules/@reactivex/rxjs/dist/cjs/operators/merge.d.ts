import Observable from '../Observable';
import Scheduler from '../Scheduler';
export default function merge<R>(...observables: (Observable<any> | Scheduler | number)[]): Observable<R>;
