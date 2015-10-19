import { ChangeDetectorDefinition } from './interfaces';
export declare class ChangeDetectorJITGenerator {
    private changeDetectionUtilVarName;
    private abstractChangeDetectorVarName;
    private _logic;
    private _names;
    private id;
    private changeDetectionStrategy;
    private records;
    private propertyBindingTargets;
    private eventBindings;
    private directiveRecords;
    private genConfig;
    typeName: string;
    constructor(definition: ChangeDetectorDefinition, changeDetectionUtilVarName: string, abstractChangeDetectorVarName: string);
    generate(): Function;
    generateSource(): string;
}
