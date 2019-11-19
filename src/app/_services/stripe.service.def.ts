import { StripeSubscription } from '../_models/stripesubscription';

export interface StripeServiceDefinition {

    /**
     * Creates a subscription that contains the payment details
     */
    createSubscription(): Promise<StripeSubscription>;

    /**
     * Gets the subscription related to the current user
     * or null if no subscription is active
     */
    getSubscription(): Promise<StripeSubscription>;

    /**
     * Cancels the current subscription
     */
    cancelSubscription(): Promise<void>;
}