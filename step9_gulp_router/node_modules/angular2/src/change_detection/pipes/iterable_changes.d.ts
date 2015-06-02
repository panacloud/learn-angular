import { Pipe, PipeFactory } from './pipe';
export declare class IterableChangesFactory extends PipeFactory {
    constructor();
    supports(obj: any): boolean;
    create(cdRef: any): Pipe;
}
/**
 * @exportedAs angular2/pipes
 */
export declare class IterableChanges extends Pipe {
    private _collection;
    private _length;
    private _linkedRecords;
    private _unlinkedRecords;
    private _previousItHead;
    private _itHead;
    private _itTail;
    private _additionsHead;
    private _additionsTail;
    private _movesHead;
    private _movesTail;
    private _removalsHead;
    private _removalsTail;
    constructor();
    static supportsObj(obj: any): boolean;
    supports(obj: any): boolean;
    collection: any;
    length: int;
    forEachItem(fn: Function): void;
    forEachPreviousItem(fn: Function): void;
    forEachAddedItem(fn: Function): void;
    forEachMovedItem(fn: Function): void;
    forEachRemovedItem(fn: Function): void;
    transform(collection: any): any;
    check(collection: any): boolean;
    isDirty: boolean;
    /**
     * Reset the state of the change objects to show no changes. This means set previousKey to
     * currentKey, and clear all of the queues (additions, moves, removals).
     * Set the previousIndexes of moved and added items to their currentIndexes
     * Reset the list of additions, moves and removals
     */
    _reset(): void;
    /**
     * This is the core function which handles differences between collections.
     *
     * - `record` is the record which we saw at this position last time. If null then it is a new
     *   item.
     * - `item` is the current item in the collection
     * - `index` is the position of the item in the collection
     */
    _mismatch(record: CollectionChangeRecord, item: any, index: int): CollectionChangeRecord;
    /**
     * This check is only needed if an array contains duplicates. (Short circuit of nothing dirty)
     *
     * Use case: `[a, a]` => `[b, a, a]`
     *
     * If we did not have this check then the insertion of `b` would:
     *   1) evict first `a`
     *   2) insert `b` at `0` index.
     *   3) leave `a` at index `1` as is. <-- this is wrong!
     *   3) reinsert `a` at index 2. <-- this is wrong!
     *
     * The correct behavior is:
     *   1) evict first `a`
     *   2) insert `b` at `0` index.
     *   3) reinsert `a` at index 1.
     *   3) move `a` at from `1` to `2`.
     *
     *
     * Double check that we have not evicted a duplicate item. We need to check if the item type may
     * have already been removed:
     * The insertion of b will evict the first 'a'. If we don't reinsert it now it will be reinserted
     * at the end. Which will show up as the two 'a's switching position. This is incorrect, since a
     * better way to think of it is as insert of 'b' rather then switch 'a' with 'b' and then add 'a'
     * at the end.
     */
    _verifyReinsertion(record: CollectionChangeRecord, item: any, index: int): CollectionChangeRecord;
    /**
     * Get rid of any excess {@link CollectionChangeRecord}s from the previous collection
     *
     * - `record` The first excess {@link CollectionChangeRecord}.
     */
    _truncate(record: CollectionChangeRecord): void;
    _reinsertAfter(record: CollectionChangeRecord, prevRecord: CollectionChangeRecord, index: int): CollectionChangeRecord;
    _moveAfter(record: CollectionChangeRecord, prevRecord: CollectionChangeRecord, index: int): CollectionChangeRecord;
    _addAfter(record: CollectionChangeRecord, prevRecord: CollectionChangeRecord, index: int): CollectionChangeRecord;
    _insertAfter(record: CollectionChangeRecord, prevRecord: CollectionChangeRecord, index: int): CollectionChangeRecord;
    _remove(record: CollectionChangeRecord): CollectionChangeRecord;
    _unlink(record: CollectionChangeRecord): CollectionChangeRecord;
    _addToMoves(record: CollectionChangeRecord, toIndex: int): CollectionChangeRecord;
    _addToRemovals(record: CollectionChangeRecord): CollectionChangeRecord;
    toString(): string;
}
/**
 * @exportedAs angular2/pipes
 */
export declare class CollectionChangeRecord {
    currentIndex: int;
    previousIndex: int;
    item: any;
    _nextPrevious: CollectionChangeRecord;
    _prev: CollectionChangeRecord;
    _next: CollectionChangeRecord;
    _prevDup: CollectionChangeRecord;
    _nextDup: CollectionChangeRecord;
    _prevRemoved: CollectionChangeRecord;
    _nextRemoved: CollectionChangeRecord;
    _nextAdded: CollectionChangeRecord;
    _nextMoved: CollectionChangeRecord;
    constructor(item: any);
    toString(): string;
}
export declare var __esModule: boolean;
