import Observable from '../Observable';
export default function zip<T, R>(...observables: (Observable<any> | ((...values: Array<any>) => R))[]): Observable<R>;
