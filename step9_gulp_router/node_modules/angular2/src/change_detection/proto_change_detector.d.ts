import { ProtoChangeDetector, ChangeDetectorDefinition } from './interfaces';
import { DynamicChangeDetector } from './dynamic_change_detector';
import { PipeRegistry } from './pipes/pipe_registry';
import { ProtoRecord } from './proto_record';
export declare class DynamicProtoChangeDetector extends ProtoChangeDetector {
    private _pipeRegistry;
    private definition;
    _records: List<ProtoRecord>;
    constructor(_pipeRegistry: PipeRegistry, definition: ChangeDetectorDefinition);
    instantiate(dispatcher: any): DynamicChangeDetector;
    _createRecords(definition: ChangeDetectorDefinition): List<ProtoRecord>;
}
export declare class JitProtoChangeDetector extends ProtoChangeDetector {
    private _pipeRegistry;
    private definition;
    _factory: Function;
    constructor(_pipeRegistry: any, definition: ChangeDetectorDefinition);
    instantiate(dispatcher: any): any;
    _createFactory(definition: ChangeDetectorDefinition): Function;
}
export declare var __esModule: boolean;
