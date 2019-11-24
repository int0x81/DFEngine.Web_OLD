import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private readonly SM_DEVICE_WIDTH: number = 668;

  private breakpointSubscription: Subscription;
  smDevice: boolean;

  constructor(breakpointObserver: BreakpointObserver) {

      this.smDevice = breakpointObserver.isMatched('(max-width: ' + this.SM_DEVICE_WIDTH + 'px)');
      this.breakpointSubscription = breakpointObserver.observe('(max-width: ' + this.SM_DEVICE_WIDTH + 'px)')
        .subscribe(result => this.smDevice = result.matches);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.breakpointSubscription.unsubscribe();
  }
}
