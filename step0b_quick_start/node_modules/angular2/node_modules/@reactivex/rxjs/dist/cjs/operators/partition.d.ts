import Observable from '../Observable';
export default function partition<T>(predicate: (x: any, i?: any, a?: any) => boolean, thisArg?: any): Observable<T>[];
