export { inject } from './test_injector';
export declare function proxy(): void;
export declare var afterEach: {
    (action: () => void): void;
    (action: (done: () => void) => void): void;
};
export interface NgMatchers extends jasmine.Matchers {
    toBe(expected: any): boolean;
    toEqual(expected: any): boolean;
    toBePromise(): boolean;
    toBeAnInstanceOf(expected: any): boolean;
    toHaveText(expected: any): boolean;
    toImplement(expected: any): boolean;
    not: NgMatchers;
}
export declare var expect: (actual: any) => NgMatchers;
export declare var IS_DARTIUM: boolean;
export declare class AsyncTestCompleter {
    _done: Function;
    constructor(done: Function);
    done(): void;
}
export declare function describe(...args: any[]): any;
export declare function ddescribe(...args: any[]): any;
export declare function xdescribe(...args: any[]): any;
export declare function beforeEach(fn: any): void;
/**
 * Allows overriding default bindings defined in test_injector.js.
 *
 * The given function must return a list of DI bindings.
 *
 * Example:
 *
 *   beforeEachBindings(() => [
 *     bind(Compiler).toClass(MockCompiler),
 *     bind(SomeToken).toValue(myValue),
 *   ]);
 */
export declare function beforeEachBindings(fn: any): void;
export declare function it(name: any, fn: any): void;
export declare function xit(name: any, fn: any): void;
export declare function iit(name: any, fn: any): void;
export interface GuinessCompatibleSpy extends jasmine.Spy {
    /** By chaining the spy with and.returnValue, all calls to the function will return a specific
     * value. */
    andReturn(val: any): void;
    /** By chaining the spy with and.callFake, all calls to the spy will delegate to the supplied
     * function. */
    andCallFake(fn: Function): GuinessCompatibleSpy;
}
export declare class SpyObject {
    constructor(type?: any);
    noSuchMethod(args: any): void;
    spy(name: any): any;
    static stub(object?: any, config?: any, overrides?: any): any;
    rttsAssert(value: any): boolean;
    _createGuinnessCompatibleSpy(name: any): GuinessCompatibleSpy;
}
export declare function isInInnerZone(): boolean;
export declare var __esModule: boolean;
