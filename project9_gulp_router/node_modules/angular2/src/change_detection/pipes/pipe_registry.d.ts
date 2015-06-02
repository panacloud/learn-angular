import { Pipe } from './pipe';
import { ChangeDetectorRef } from '../change_detector_ref';
export declare class PipeRegistry {
    config: any;
    constructor(config: any);
    get(type: string, obj: any, cdRef: ChangeDetectorRef): Pipe;
}
export declare var __esModule: boolean;
