/**
 * The Testability service provides testing hooks that can be accessed from
 * the browser and by services such as Protractor. Each bootstrapped Angular
 * application on the page will have an instance of Testability.
 */
export declare class Testability {
    _pendingCount: number;
    _callbacks: List<Function>;
    constructor();
    increaseCount(delta?: number): number;
    _runCallbacks(): void;
    whenStable(callback: Function): void;
    getPendingCount(): number;
    findBindings(using: any, binding: string, exactMatch: boolean): List<any>;
}
export declare class TestabilityRegistry {
    _applications: Map<any, Testability>;
    constructor();
    registerApplication(token: any, testability: Testability): void;
    findTestabilityInTree(elem: any): Testability;
}
export declare var __esModule: boolean;
