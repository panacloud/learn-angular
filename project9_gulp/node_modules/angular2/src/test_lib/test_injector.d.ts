import { Binding } from 'angular2/di';
import { Injector } from 'angular2/di';
import { Type } from 'angular2/src/facade/lang';
export declare function createTestInjector(bindings: List<Type | Binding | List<any>>): Injector;
/**
 * Allows injecting dependencies in `beforeEach()` and `it()`.
 *
 * Example:
 *
 * ```
 * beforeEach(inject([Dependency, AClass], (dep, object) => {
 *   // some code that uses `dep` and `object`
 *   // ...
 * }));
 *
 * it('...', inject([AClass, AsyncTestCompleter], (object, async) => {
 *   object.doSomething().then(() => {
 *     expect(...);
 *     async.done();
 *   });
 * })
 * ```
 *
 * Notes:
 * - injecting an `AsyncTestCompleter` allow completing async tests - this is the equivalent of
 *   adding a `done` parameter in Jasmine,
 * - inject is currently a function because of some Traceur limitation the syntax should eventually
 *   becomes `it('...', @Inject (object: AClass, async: AsyncTestCompleter) => { ... });`
 *
 * @param {Array} tokens
 * @param {Function} fn
 * @return {FunctionWithParamTokens}
 * @exportedAs angular2/test
 */
export declare function inject(tokens: List<any>, fn: Function): FunctionWithParamTokens;
export declare class FunctionWithParamTokens {
    _tokens: List<any>;
    _fn: Function;
    constructor(tokens: List<any>, fn: Function);
    execute(injector: Injector): void;
}
export declare var __esModule: boolean;
