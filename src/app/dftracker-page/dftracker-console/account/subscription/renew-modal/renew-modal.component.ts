import { Component, OnInit } from '@angular/core';
import { StripeServiceDefinition } from 'src/app/_services/stripe.service.def';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StripeMock } from 'src/app/_services/mocks/stripe.service.mock';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';
import { GlobalEventService } from 'src/app/_services/implementations/globalevent.service';

@Component({
  selector: 'app-renew-modal',
  templateUrl: './renew-modal.component.html',
  styleUrls: ['./renew-modal.component.sass']
})
export class RenewModalComponent implements OnInit {

  private stripeService: StripeServiceDefinition;

  darkTheme: boolean;
  private darkThemeSubscription: Subscription;

  constructor(public activeModal: NgbActiveModal, stripeMock: StripeMock, darkThemeService: DarkThemeService, private globalEventService: GlobalEventService) {
    this.stripeService = stripeMock;
    this.darkTheme = darkThemeService.getDarkThemeState();
    this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.darkThemeSubscription.unsubscribe();
  }

  onRenew() {
    this.stripeService.createSubscription().then(() => {
      this.globalEventService.SubscriptionActivatedEvent.next();
      this.activeModal.close();
    },
    (e) => console.error("Unable to renew subscription"));
  }
}
