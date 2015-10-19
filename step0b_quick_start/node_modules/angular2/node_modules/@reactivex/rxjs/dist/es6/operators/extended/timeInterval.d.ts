import Observable from '../../Observable';
import Scheduler from '../../Scheduler';
export default function timeInterval<T>(scheduler?: Scheduler): Observable<TimeInterval>;
export declare class TimeInterval {
    value: any;
    interval: number;
    constructor(value: any, interval: number);
}
