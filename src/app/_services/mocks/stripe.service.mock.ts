import { StripeServiceDefinition } from '../stripe.service.def';
import { StripeSubscription } from 'src/app/_models/stripesubscription';
import * as localForage from 'localforage';

export class StripeMock implements StripeServiceDefinition {

    private subscriptionStore: LocalForage;

    constructor() {
        this.subscriptionStore = localForage.createInstance({
            name: "SubscriptionMock"
        });
    }

    async createSubscription(): Promise<StripeSubscription> {

        let inThirtyDays = new Date();
        inThirtyDays.setDate(new Date().getDate() + 30);

        let subscription: StripeSubscription = {
            validUntil: inThirtyDays,
            isCanceled: false
        }

        await this.subscriptionStore.setItem("1", subscription);
        
        return new Promise<StripeSubscription>((resolve) => setTimeout(() => {
            resolve(subscription);
        }, Math.random() * 4000));
    }    
    
    async getSubscription(): Promise<StripeSubscription> {
        
        let sub = await this.subscriptionStore.getItem<StripeSubscription>("1");

        if(sub == null)
          return null;

        if(!sub.isCanceled && sub.validUntil <= new Date()) {
            await this.subscriptionStore.clear();
            return null;
        }

        return sub;
    }

    async cancelSubscription(): Promise<void> {
        
        let sub = await this.subscriptionStore.getItem<StripeSubscription>("1");
        sub.isCanceled = true;
        await this.subscriptionStore.setItem("1", sub);

        return new Promise<void>((resolve) => setTimeout(() => {
            resolve();
        }, Math.random() * 4000));
    }
}