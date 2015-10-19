import { TestabilityRegistry, GetTestability } from 'angular2/src/core/testability/testability';
export declare class BrowserGetTestability implements GetTestability {
    static init(): void;
    addToWindow(registry: TestabilityRegistry): void;
}
