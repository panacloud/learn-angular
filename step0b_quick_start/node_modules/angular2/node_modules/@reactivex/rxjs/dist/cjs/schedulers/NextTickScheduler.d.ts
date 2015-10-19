import ImmediateScheduler from './ImmediateScheduler';
import Subscription from '../Subscription';
import Action from './Action';
export default class NextTickScheduler extends ImmediateScheduler {
    scheduleNow<T>(work: (x?: any) => Subscription<T>, state?: any): Action;
}
