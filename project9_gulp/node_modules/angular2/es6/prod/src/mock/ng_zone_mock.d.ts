import { NgZone } from 'angular2/src/core/zone/ng_zone';
export declare class MockNgZone extends NgZone {
    constructor();
    run(fn: any): any;
    runOutsideAngular(fn: any): any;
}
