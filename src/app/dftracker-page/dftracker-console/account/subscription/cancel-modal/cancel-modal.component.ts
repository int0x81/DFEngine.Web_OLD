import { Component, OnInit } from '@angular/core';
import { StripeServiceDefinition } from 'src/app/_services/stripe.service.def';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StripeMock } from 'src/app/_services/mocks/stripe.service.mock';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';
import { StripeSubscription } from 'src/app/_models/stripesubscription';
import { GlobalEventService } from 'src/app/_services/implementations/globalevent.service';

@Component({
  selector: 'app-cancel-modal',
  templateUrl: './cancel-modal.component.html',
  styleUrls: ['./cancel-modal.component.sass']
})
export class CancelModalComponent implements OnInit {

  private stripeService: StripeServiceDefinition;
  validUntil: Date;

  darkTheme: boolean;
  private darkThemeSubscription: Subscription;

  constructor(public activeModal: NgbActiveModal, private stripeMock: StripeMock, darkThemeService: DarkThemeService, private globalEventService: GlobalEventService) {
    this.stripeService = stripeMock;
    this.darkTheme = darkThemeService.getDarkThemeState();
    this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);
  }

  ngOnInit() {
    this.stripeMock.getSubscription().then(s => this.validUntil = s.validUntil);
  }

  ngOnDestroy() {
    this.darkThemeSubscription.unsubscribe();
  }

  onCancelation() {
    this.stripeMock.cancelSubscription().then(() => {
      this.globalEventService.SubscriptionCanceledEvent.next();
      this.activeModal.close();
    },
    (e) => console.error("Unable to cancel subscription")); 
  }
}
