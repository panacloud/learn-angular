import { ProtoRecord } from './proto_record';
import { BaseException } from "angular2/src/facade/lang";
export declare class ExpressionChangedAfterItHasBeenChecked extends BaseException {
    message: string;
    constructor(proto: ProtoRecord, change: any);
    toString(): string;
}
export declare class ChangeDetectionError extends BaseException {
    message: string;
    originalException: any;
    location: string;
    constructor(proto: ProtoRecord, originalException: any);
    toString(): string;
}
export declare var __esModule: boolean;
