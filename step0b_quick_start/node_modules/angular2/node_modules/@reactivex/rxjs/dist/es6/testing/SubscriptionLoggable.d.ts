import Scheduler from '../Scheduler';
import SubscriptionLog from './SubscriptionLog';
export default class SubscriptionLoggable {
    subscriptions: SubscriptionLog[];
    scheduler: Scheduler;
    logSubscribedFrame(): number;
    logUnsubscribedFrame(index: number): void;
}
