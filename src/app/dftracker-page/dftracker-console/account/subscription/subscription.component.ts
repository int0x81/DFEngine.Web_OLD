import { Component, OnInit, OnDestroy } from '@angular/core';
import { StripeService } from 'src/app/_services/implementations/stripe.service';
import { StripeSubscription } from 'src/app/_models/stripesubscription';
import { StripeServiceDefinition } from 'src/app/_services/stripe.service.def';
import { StripeMock } from 'src/app/_services/mocks/stripe.service.mock';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CancelModalComponent } from './cancel-modal/cancel-modal.component';
import { SubscribeModalComponent } from './subscribe-modal/subscribe-modal.component';
import { RenewModalComponent } from './renew-modal/renew-modal.component';
import { GlobalEventService } from 'src/app/_services/implementations/globalevent.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.sass']
})
export class SubscriptionComponent implements OnInit, OnDestroy {

  private stripeService: StripeServiceDefinition;
  private subscriptionActivatedSubscription: Subscription;
  private subscriptionCanceledSubscription: Subscription;

  subscription: StripeSubscription;

  constructor(stripeMock: StripeMock, private modalService: NgbModal, private globalEventService: GlobalEventService) {
    this.stripeService = stripeMock;
  }

  ngOnInit() {
    this.stripeService.getSubscription().then(s => this.subscription = s);

    this.subscriptionActivatedSubscription = this.globalEventService.SubscriptionActivatedEvent.subscribe(async () => {
      this.subscription = await this.stripeService.getSubscription();
    });

    this.subscriptionCanceledSubscription = this.globalEventService.SubscriptionCanceledEvent.subscribe(async () => {
      this.subscription = await this.stripeService.getSubscription();;
    });
  }

  onCancelButtonClick() {
    this.modalService.open(CancelModalComponent, {centered: true });
  }

  onSubscribeClick() {
    this.modalService.open(SubscribeModalComponent, {centered: true });
  }

  onRenewButtonClick() {
    this.modalService.open(RenewModalComponent, {centered: true });
  }

  ngOnDestroy() {
    this.subscriptionActivatedSubscription.unsubscribe();
    this.subscriptionCanceledSubscription.unsubscribe();
  }
}
