import Observable from '../Observable';
export default function windowCount<T>(windowSize: number, startWindowEvery?: number): Observable<Observable<T>>;
