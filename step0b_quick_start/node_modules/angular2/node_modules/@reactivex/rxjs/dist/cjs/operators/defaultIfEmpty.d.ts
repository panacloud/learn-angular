import Observable from '../Observable';
export default function defaultIfEmpty<T, R>(defaultValue?: R): Observable<T> | Observable<R>;
