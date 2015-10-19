import Observable from '../Observable';
export default function zipProto<R>(...observables: (Observable<any> | ((...values: Array<any>) => R))[]): Observable<R>;
