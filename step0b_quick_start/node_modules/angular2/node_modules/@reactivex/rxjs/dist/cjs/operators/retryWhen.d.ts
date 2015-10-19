import Observable from '../Observable';
export default function retryWhen<T>(notifier: (errors: Observable<any>) => Observable<any>): any;
