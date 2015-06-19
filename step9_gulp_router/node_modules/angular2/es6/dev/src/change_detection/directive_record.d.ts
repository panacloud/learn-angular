export declare class DirectiveIndex {
    elementIndex: number;
    directiveIndex: number;
    constructor(elementIndex: number, directiveIndex: number);
    name: string;
}
export declare class DirectiveRecord {
    directiveIndex: DirectiveIndex;
    callOnAllChangesDone: boolean;
    callOnChange: boolean;
    callOnCheck: boolean;
    callOnInit: boolean;
    changeDetection: string;
    constructor({directiveIndex, callOnAllChangesDone, callOnChange, callOnCheck, callOnInit, changeDetection}?: {
        directiveIndex?: DirectiveIndex;
        callOnAllChangesDone?: boolean;
        callOnChange?: boolean;
        callOnCheck?: boolean;
        callOnInit?: boolean;
        changeDetection?: string;
    });
    isOnPushChangeDetection(): boolean;
}
