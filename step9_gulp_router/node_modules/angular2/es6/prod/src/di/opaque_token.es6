/**
 *
 *
 * @exportedAs angular2/di
 */
export class OpaqueToken {
    constructor(desc) {
        this._desc = `Token(${desc})`;
    }
    toString() { return this._desc; }
}
//# sourceMappingURL=opaque_token.js.map