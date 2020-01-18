import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkThemeService } from '../_services/implementations/darktheme.service';
import { CookieService } from '../_services/implementations/cookie.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieInfoComponent } from '../cookie-info/cookie-info.component';
import { CompilerOptionsService } from '../_services/implementations/compileroptions.service';

@Component({
    selector: 'app-live-query-page',
    templateUrl: './live-query-page.component.html',
    styleUrls: ['./live-query-page.component.sass']
  })
export class LiveQueryPageComponent implements OnInit, AfterViewInit, OnDestroy {
  
  private darkTheme: boolean;
  private darkThemeSubscription: Subscription;
  private cookieAcceptSubscription: Subscription;

  cookiesAccepted: boolean;

  constructor(darkThemeService: DarkThemeService, cookieService: CookieService, private modalService: NgbModal, private compilerOptionsService: CompilerOptionsService) {

    this.cookiesAccepted = cookieService.hasAcceptedCookiePolicy();

    if(!this.cookiesAccepted) {
        this.cookieAcceptSubscription = cookieService.acceptCookiePolicySubject.subscribe(() =>{
          this.cookiesAccepted = true;
        });
    }

    this.darkTheme = darkThemeService.getDarkThemeState();
    this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);
  }

  ngOnInit() {
    this.compilerOptionsService.compileColumnLevel = true;
  }

  ngAfterViewInit() {
    // if(!this.cookiesAccepted)
    //     this.modalService.open(CookieInfoComponent);
  }

  ngOnDestroy(): void {
    
    this.darkThemeSubscription.unsubscribe();
    if(this.cookieAcceptSubscription != null && this.cookieAcceptSubscription != undefined)
      this.cookieAcceptSubscription.unsubscribe();
  }
}