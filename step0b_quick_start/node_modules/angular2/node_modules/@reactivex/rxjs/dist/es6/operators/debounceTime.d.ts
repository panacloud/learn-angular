import Observable from '../Observable';
import Scheduler from '../Scheduler';
export default function debounceTime<T>(dueTime: number, scheduler?: Scheduler): Observable<T>;
