import Subscription from '../Subscription';
import OuterSubscriber from '../OuterSubscriber';
export default function subscribeToResult<T, R>(outerSubscriber: OuterSubscriber<T, R>, result: any, outerValue?: T, outerIndex?: number): Subscription<T>;
