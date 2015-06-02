import { CompileElement } from './compile_element';
import { CompileStep } from './compile_step';
/**
 * Controls the processing order of elements.
 * Right now it only allows to add a parent element.
 */
export declare class CompileControl {
    _steps: List<CompileStep>;
    _currentStepIndex: number;
    _parent: CompileElement;
    _results: any;
    _additionalChildren: any;
    _ignoreCurrentElement: boolean;
    constructor(steps: any);
    internalProcess(results: any, startStepIndex: any, parent: CompileElement, current: CompileElement): any;
    addParent(newElement: CompileElement): void;
    addChild(element: CompileElement): void;
    /**
     * Ignores the current element.
     *
     * When a step calls `ignoreCurrentElement`, no further steps are executed on the current
     * element and no `CompileElement` is added to the result list.
     */
    ignoreCurrentElement(): void;
}
export declare var __esModule: boolean;
