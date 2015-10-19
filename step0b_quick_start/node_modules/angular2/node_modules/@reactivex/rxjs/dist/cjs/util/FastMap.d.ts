export default class FastMap {
    size: number;
    private _values;
    delete(key: string): boolean;
    set(key: string, value: any): FastMap;
    get(key: string): any;
    forEach(cb: any, thisArg: any): void;
    clear(): void;
}
