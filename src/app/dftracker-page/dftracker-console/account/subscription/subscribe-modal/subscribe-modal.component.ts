import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';
import { StripeMock } from 'src/app/_services/mocks/stripe.service.mock';
import { StripeServiceDefinition } from 'src/app/_services/stripe.service.def';
import { GlobalEventService } from 'src/app/_services/implementations/globalevent.service';

@Component({
  selector: 'app-subscribe-modal',
  templateUrl: './subscribe-modal.component.html',
  styleUrls: ['./subscribe-modal.component.sass']
})
export class SubscribeModalComponent implements OnInit {

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

  onSubscribe() {
    this.stripeService.createSubscription().then(() => {
      this.globalEventService.SubscriptionActivatedEvent.next();
      this.activeModal.close()
    },
    (e) => console.error("Unable to create subscription"));
  }
}
