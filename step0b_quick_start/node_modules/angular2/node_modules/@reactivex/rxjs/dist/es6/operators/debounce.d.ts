import Observable from '../Observable';
export default function debounce<T>(durationSelector: (value: T) => Observable<any> | Promise<any>): Observable<T>;
