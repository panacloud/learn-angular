import { ProtoRecord } from './proto_record';
export declare var uninitialized: Object;
export declare class SimpleChange {
    previousValue: any;
    currentValue: any;
    constructor(previousValue: any, currentValue: any);
}
export declare class ChangeDetectionUtil {
    static uninitialized(): Object;
    static arrayFn0(): any[];
    static arrayFn1(a1: any): any[];
    static arrayFn2(a1: any, a2: any): any[];
    static arrayFn3(a1: any, a2: any, a3: any): any[];
    static arrayFn4(a1: any, a2: any, a3: any, a4: any): any[];
    static arrayFn5(a1: any, a2: any, a3: any, a4: any, a5: any): any[];
    static arrayFn6(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any): any[];
    static arrayFn7(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any): any[];
    static arrayFn8(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any): any[];
    static arrayFn9(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any, a9: any): any[];
    static operation_negate(value: any): boolean;
    static operation_add(left: any, right: any): any;
    static operation_subtract(left: any, right: any): number;
    static operation_multiply(left: any, right: any): number;
    static operation_divide(left: any, right: any): number;
    static operation_remainder(left: any, right: any): number;
    static operation_equals(left: any, right: any): boolean;
    static operation_not_equals(left: any, right: any): boolean;
    static operation_identical(left: any, right: any): boolean;
    static operation_not_identical(left: any, right: any): boolean;
    static operation_less_then(left: any, right: any): boolean;
    static operation_greater_then(left: any, right: any): boolean;
    static operation_less_or_equals_then(left: any, right: any): boolean;
    static operation_greater_or_equals_then(left: any, right: any): boolean;
    static operation_logical_and(left: any, right: any): any;
    static operation_logical_or(left: any, right: any): any;
    static cond(cond: any, trueVal: any, falseVal: any): any;
    static mapFn(keys: List<any>): (a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any, a9: any) => StringMap<any, any>;
    static keyedAccess(obj: any, args: any): any;
    static unwrapValue(value: any): any;
    static throwOnChange(proto: ProtoRecord, change: any): void;
    static changeDetectionMode(strategy: string): string;
    static simpleChange(previousValue: any, currentValue: any): SimpleChange;
    static addChange(changes: any, propertyName: string, change: any): any;
}
export declare var __esModule: boolean;
