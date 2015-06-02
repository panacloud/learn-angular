import { isPresent } from 'angular2/src/facade/lang';
// This is a workaround for privacy in Dart as we don't have library parts
export function internalView(viewRef) {
    return viewRef._view;
}
// This is a workaround for privacy in Dart as we don't have library parts
export function internalProtoView(protoViewRef) {
    return isPresent(protoViewRef) ? protoViewRef._protoView : null;
}
/**
 * @exportedAs angular2/view
 */
export class ViewRef {
    constructor(view) {
        this._view = view;
    }
    get render() { return this._view.render; }
    setLocal(contextName, value) { this._view.setLocal(contextName, value); }
}
/**
 * @exportedAs angular2/view
 */
export class ProtoViewRef {
    constructor(protoView) {
        this._protoView = protoView;
    }
}
//# sourceMappingURL=view_ref.js.map