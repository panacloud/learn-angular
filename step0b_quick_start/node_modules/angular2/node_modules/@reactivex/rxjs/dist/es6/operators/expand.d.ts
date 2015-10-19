import Observable from '../Observable';
export default function expand<T, R>(project: (value: T, index: number) => Observable<R>, concurrent?: number): Observable<R>;
