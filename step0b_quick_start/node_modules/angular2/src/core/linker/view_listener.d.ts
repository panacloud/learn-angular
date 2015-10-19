import * as viewModule from './view';
/**
 * Listener for view creation / destruction.
 */
export declare class AppViewListener {
    viewCreated(view: viewModule.AppView): void;
    viewDestroyed(view: viewModule.AppView): void;
}
