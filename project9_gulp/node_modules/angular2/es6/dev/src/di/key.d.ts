export { TypeLiteral } from './type_literal';
/**
 * A unique object used for retrieving items from the {@link Injector}.
 *
 * Keys have:
 * - a system-wide unique `id`.
 * - a `token`, usually the `Type` of the instance.
 *
 * Keys are used internally by the {@link Injector} because their system-wide unique `id`s allow the
 * injector to index in arrays rather than looking up items in maps.
 *
 * @exportedAs angular2/di
 */
export declare class Key {
    token: Object;
    id: number;
    /**
     * @private
     */
    constructor(token: Object, id: number);
    displayName: string;
    /**
     * Retrieves a `Key` for a token.
     */
    static get(token: any): Key;
    /**
     * @returns the number of keys registered in the system.
     */
    static numberOfKeys: number;
}
/**
 * @private
 */
export declare class KeyRegistry {
    _allKeys: Map<Object, Key>;
    constructor();
    get(token: Object): Key;
    numberOfKeys: number;
}
