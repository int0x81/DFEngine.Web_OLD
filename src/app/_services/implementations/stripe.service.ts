import { StripeSubscription } from '../../_models/stripesubscription';
import { StripeServiceDefinition } from '../stripe.service.def';

export class StripeService implements StripeServiceDefinition {
    
    createSubscription(): Promise<StripeSubscription> {
        throw new Error("Method not implemented.");
    }    
    
    getSubscription(): Promise<StripeSubscription> {
        throw new Error("Method not implemented.");
    }
    
    cancelSubscription(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}