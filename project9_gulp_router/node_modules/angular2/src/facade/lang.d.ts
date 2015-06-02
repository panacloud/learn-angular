declare var _global: BrowserNodeGlobal;
export { _global as global };
export declare var Type: FunctionConstructor;
export declare type Type = new (...args: any[]) => any;
export declare class BaseException extends Error {
    message: any;
    stack: any;
    constructor(message?: string);
    toString(): string;
}
export declare var Math: Math;
export declare var Date: DateConstructor;
export declare function assertionsEnabled(): boolean;
export declare function CONST_EXPR<T>(expr: T): T;
export declare function CONST(): (target: any) => any;
export declare class ABSTRACT {
}
export declare class IMPLEMENTS {
}
export declare function isPresent(obj: any): boolean;
export declare function isBlank(obj: any): boolean;
export declare function isString(obj: any): boolean;
export declare function isFunction(obj: any): boolean;
export declare function isType(obj: any): boolean;
export declare function stringify(token: any): string;
export declare class StringWrapper {
    static fromCharCode(code: int): string;
    static charCodeAt(s: string, index: int): number;
    static split(s: string, regExp: any): string[];
    static equals(s: string, s2: string): boolean;
    static replace(s: string, from: string, replace: string): string;
    static replaceAll(s: string, from: RegExp, replace: string): string;
    static toUpperCase(s: string): string;
    static toLowerCase(s: string): string;
    static startsWith(s: string, start: string): boolean;
    static substring(s: string, start: int, end?: int): string;
    static replaceAllMapped(s: string, from: RegExp, cb: Function): string;
    static contains(s: string, substr: string): boolean;
}
export declare class StringJoiner {
    parts: any[];
    constructor(parts?: any[]);
    add(part: string): void;
    toString(): string;
}
export declare class NumberParseError extends BaseException {
    message: string;
    name: string;
    constructor(message: string);
    toString(): string;
}
export declare class NumberWrapper {
    static toFixed(n: number, fractionDigits: int): string;
    static equal(a: any, b: any): boolean;
    static parseIntAutoRadix(text: string): int;
    static parseInt(text: string, radix: int): int;
    static parseFloat(text: string): number;
    static NaN: number;
    static isNaN(value: any): boolean;
    static isInteger(value: any): boolean;
}
export declare var RegExp: RegExpConstructor;
export declare class RegExpWrapper {
    static create(regExpStr: any, flags?: string): RegExp;
    static firstMatch(regExp: any, input: any): any;
    static matcher(regExp: any, input: any): {
        re: any;
        input: any;
    };
}
export declare class RegExpMatcherWrapper {
    static next(matcher: any): any;
}
export declare class FunctionWrapper {
    static apply(fn: Function, posArgs: any): any;
}
export declare function looseIdentical(a: any, b: any): boolean;
export declare function getMapKey(value: any): any;
export declare function normalizeBlank(obj: any): any;
export declare function isJsObject(o: any): boolean;
export declare function print(obj: any): void;
export declare class Json {
    static parse(s: string): any;
    static stringify(data: any): string;
}
export declare class DateWrapper {
    static fromMillis(ms: any): Date;
    static toMillis(date: Date): number;
    static now(): Date;
    static toJson(date: any): any;
}
export declare var __esModule: boolean;
