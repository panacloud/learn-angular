import Observable from '../Observable';
export default function window<T>(closingNotifier: Observable<any>): Observable<Observable<T>>;
