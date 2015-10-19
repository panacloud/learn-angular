import Observable from '../Observable';
import Scheduler from '../Scheduler';
export default function sampleTime<T>(delay: number, scheduler?: Scheduler): Observable<T>;
