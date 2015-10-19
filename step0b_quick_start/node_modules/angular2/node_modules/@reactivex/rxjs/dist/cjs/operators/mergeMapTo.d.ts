import Observable from '../Observable';
export default function mergeMapTo<T, R, R2>(observable: Observable<R>, resultSelector?: (outerValue: T, innerValue: R, outerIndex: number, innerIndex: number) => R2, concurrent?: number): Observable<R2>;
