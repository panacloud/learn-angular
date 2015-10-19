import Scheduler from '../Scheduler';
import Observable from '../Observable';
export default function merge<R>(...observables: (Observable<any> | Scheduler | number)[]): Observable<R>;
