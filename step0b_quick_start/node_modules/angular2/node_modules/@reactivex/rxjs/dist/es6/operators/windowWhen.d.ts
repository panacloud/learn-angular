import Observable from '../Observable';
export default function window<T>(closingSelector: () => Observable<any>): Observable<Observable<T>>;
