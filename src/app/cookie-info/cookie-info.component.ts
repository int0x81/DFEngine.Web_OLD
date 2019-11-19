import { Component, OnInit, OnDestroy } from '@angular/core';
import { CookieService } from '../_services/implementations/cookie.service';
import { DarkThemeService } from '../_services/implementations/darktheme.service';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cookie-info',
  templateUrl: './cookie-info.component.html',
  styleUrls: ['./cookie-info.component.sass']
})
export class CookieInfoComponent implements OnInit, OnDestroy {

  private darkThemeSubscription: Subscription;
  darkTheme: boolean;

  constructor(private cookieService: CookieService, darkThemeService: DarkThemeService, public modal: NgbActiveModal) { 
    this.darkTheme = darkThemeService.getDarkThemeState();

    this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);
  }

  ngOnInit() {
  }

  routeToCookiePolicy() {
    this.modal.close();
  }

  disagreeCookiePolicy() {
    window.history.back();
  }

  acceptCookiePolicy() {
    this.cookieService.acceptCookiePolicySubject.next();
    this.modal.close();
  }

  ngOnDestroy() {
    this.darkThemeSubscription.unsubscribe();
  }
}
