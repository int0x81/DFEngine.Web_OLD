import { Component } from '@angular/core';
import { MobileNavbarService } from 'src/app/_services/implementations/mobilenavbar.service';

@Component({
  selector: 'app-mobile-nav-opener',
  templateUrl: './mobile-nav-opener.component.html',
  styleUrls: ['./mobile-nav-opener.component.sass']
})
export class MobileNavOpenerComponent {

  mobileNavOpen: boolean = false;

  constructor(private mobileNavbarService: MobileNavbarService) { }

  onClick() {
    this.mobileNavOpen = !this.mobileNavOpen;
    this.mobileNavbarService.mobileNavToggleSubject.next();
  }
}