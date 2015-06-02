import { BaseException } from "angular2/src/facade/lang";
export class ExpressionChangedAfterItHasBeenChecked extends BaseException {
    constructor(proto, change) {
        super();
        this.message =
            `Expression '${proto.expressionAsString}' has changed after it was checked. ` +
                `Previous value: '${change.previousValue}'. Current value: '${change.currentValue}'`;
    }
    toString() { return this.message; }
}
export class ChangeDetectionError extends BaseException {
    constructor(proto, originalException) {
        super();
        this.originalException = originalException;
        this.location = proto.expressionAsString;
        this.message = `${this.originalException} in [${this.location}]`;
    }
    toString() { return this.message; }
}
//# sourceMappingURL=exceptions.js.map