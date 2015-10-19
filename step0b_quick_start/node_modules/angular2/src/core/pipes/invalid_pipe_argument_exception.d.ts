import { Type } from 'angular2/src/core/facade/lang';
import { BaseException } from 'angular2/src/core/facade/exceptions';
export declare class InvalidPipeArgumentException extends BaseException {
    constructor(type: Type, value: Object);
}
