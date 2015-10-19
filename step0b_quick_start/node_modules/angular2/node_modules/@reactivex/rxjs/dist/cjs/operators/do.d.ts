import Observer from '../Observer';
export default function _do<T>(nextOrObserver?: Observer<T> | ((x: T) => void), error?: (e: any) => void, complete?: () => void): any;
