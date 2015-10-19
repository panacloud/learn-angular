export default function scan<T, R>(project: (acc: R, x: T) => R, acc?: R): any;
