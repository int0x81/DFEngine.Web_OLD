import { Component, OnInit, OnDestroy, NgZone, AfterViewInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout'
import { Observable, Subscription } from 'rxjs';
import { DarkThemeService } from './_services/implementations/darktheme.service';
import { CookieService } from './_services/implementations/cookie.service';
import { GlobalEventService } from './_services/implementations/globalevent.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieInfoComponent } from './cookie-info/cookie-info.component';

@Component({ 
    selector: 'app-root', 
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {

    private layoutChangeSubscription: Subscription;
    private darkThemeSubscription: Subscription;

    cookiesAccepted: boolean;
    darkTheme: boolean;

    constructor(darkThemeService: DarkThemeService) {

        this.darkTheme = darkThemeService.getDarkThemeState();
        this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {

        this.layoutChangeSubscription.unsubscribe();
        this.darkThemeSubscription.unsubscribe();
    }
}