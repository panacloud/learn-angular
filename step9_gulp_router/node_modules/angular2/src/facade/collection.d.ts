export declare var List: ArrayConstructor;
export declare var Map: {
    new <K, V>(): Map<K, V>;
    new <K, V>(m: Map<K, V>): Map<K, V>;
    new <K, V>(l: List<any>): Map<K, V>;
    prototype: Map<any, any>;
};
export declare var Set: {
    new <T>(): Set<T>;
    new <T>(s: Set<T>): Set<T>;
    new <T>(l: List<T>): Set<T>;
    prototype: Set<any>;
};
export declare var StringMap: ObjectConstructor;
export declare class MapWrapper {
    static create(): Map<any, any>;
    static clone<K, V>(m: Map<K, V>): Map<K, V>;
    static createFromStringMap(stringMap: any): Map<string, any>;
    static createFromPairs(pairs: List<any>): Map<any, any>;
    static get<K, V>(m: Map<K, V>, k: K): V;
    static set<K, V>(m: Map<K, V>, k: K, v: V): void;
    static contains<K>(m: Map<K, any>, k: K): boolean;
    static forEach<K, V>(m: Map<K, V>, fn: Function): void;
    static size(m: Map<any, any>): number;
    static delete<K>(m: Map<K, any>, k: K): void;
    static clear(m: Map<any, any>): void;
    static clearValues(m: Map<any, any>): void;
    static iterable(m: any): any;
    static keys<K>(m: Map<K, any>): List<K>;
    static values<V>(m: Map<any, V>): List<V>;
}
/**
 * Wraps Javascript Objects
 */
export declare class StringMapWrapper {
    static create(): StringMap<any, any>;
    static contains(map: StringMap<string, any>, key: string): boolean;
    static get<V>(map: StringMap<string, V>, key: string): V;
    static set<V>(map: StringMap<string, V>, key: string, value: V): void;
    static keys(map: StringMap<string, any>): List<string>;
    static isEmpty(map: StringMap<string, any>): boolean;
    static delete(map: StringMap<string, any>, key: string): void;
    static forEach<K, V>(map: StringMap<string, V>, callback: Function): void;
    static merge<V>(m1: StringMap<string, V>, m2: StringMap<string, V>): StringMap<string, V>;
    static equals<V>(m1: StringMap<string, V>, m2: StringMap<string, V>): boolean;
}
export declare class ListWrapper {
    static create(): List<any>;
    static createFixedSize(size: any): List<any>;
    static get(m: any, k: any): any;
    static set(m: any, k: any, v: any): void;
    static clone(array: List<any>): any[];
    static map(array: any, fn: any): any;
    static forEach(array: List<any>, fn: Function): void;
    static push(array: any, el: any): void;
    static first(array: any): any;
    static last(array: any): any;
    static find(list: List<any>, pred: Function): any;
    static indexOf(array: List<any>, value: any, startIndex?: number): number;
    static reduce<T, E>(list: List<T>, fn: (accumValue: E, currentValue: T, currentIndex: number, array: T[]) => E, init: E): E;
    static filter(array: any, pred: Function): any;
    static any(list: List<any>, pred: Function): boolean;
    static contains(list: List<any>, el: any): boolean;
    static reversed(array: any): any[];
    static concat(a: any, b: any): any;
    static isList(list: any): boolean;
    static insert(list: any, index: int, value: any): void;
    static removeAt(list: any, index: int): any;
    static removeAll(list: any, items: any): void;
    static removeLast<T>(list: List<T>): T;
    static remove(list: any, el: any): boolean;
    static clear(list: any): void;
    static join(list: any, s: any): any;
    static isEmpty(list: any): boolean;
    static fill(list: List<any>, value: any, start?: int, end?: int): void;
    static equals(a: List<any>, b: List<any>): boolean;
    static slice<T>(l: List<T>, from?: int, to?: int): List<T>;
    static splice<T>(l: List<T>, from: int, length: int): List<T>;
    static sort<T>(l: List<T>, compareFn: (a: T, b: T) => number): void;
}
export declare function isListLikeIterable(obj: any): boolean;
export declare function iterateListLike(obj: any, fn: Function): void;
export declare class SetWrapper {
    static createFromList<T>(lst: List<T>): Set<T>;
    static has<T>(s: Set<T>, key: T): boolean;
}
export declare var __esModule: boolean;
