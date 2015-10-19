import { AbstractChangeDetector } from './abstract_change_detector';
import { EventBinding } from './event_binding';
import { BindingTarget } from './binding_record';
import { DirectiveRecord, DirectiveIndex } from './directive_record';
import { Locals } from './parser/locals';
import { ChangeDetectorGenConfig } from './interfaces';
import { ChangeDetectionStrategy } from './constants';
import { ProtoRecord } from './proto_record';
export declare class DynamicChangeDetector extends AbstractChangeDetector<any> {
    private _records;
    private _eventBindings;
    private _directiveRecords;
    private _genConfig;
    values: any[];
    changes: any[];
    localPipes: any[];
    prevContexts: any[];
    directives: any;
    constructor(id: string, dispatcher: any, numberOfPropertyProtoRecords: number, propertyBindingTargets: BindingTarget[], directiveIndices: DirectiveIndex[], strategy: ChangeDetectionStrategy, _records: ProtoRecord[], _eventBindings: EventBinding[], _directiveRecords: DirectiveRecord[], _genConfig: ChangeDetectorGenConfig);
    handleEventInternal(eventName: string, elIndex: number, locals: Locals): boolean;
    hydrateDirectives(directives: any): void;
    dehydrateDirectives(destroyPipes: boolean): void;
    checkNoChanges(): void;
    detectChangesInRecordsInternal(throwOnChange: boolean): void;
    afterContentLifecycleCallbacksInternal(): void;
    afterViewLifecycleCallbacksInternal(): void;
}
