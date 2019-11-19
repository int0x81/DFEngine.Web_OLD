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

    private readonly MAX_SUPPORTED_WIDTH: number = 668;

    private layoutChangeSubscription: Subscription;
    private darkThemeSubscription: Subscription;

    smDevice: boolean = false;
    cookiesAccepted: boolean;
    darkTheme: boolean;

    constructor(breakpointObserver: BreakpointObserver, darkThemeService: DarkThemeService) {

        this.darkTheme = darkThemeService.getDarkThemeState();
        this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);

        this.smDevice = breakpointObserver.isMatched('(max-width: ' + this.MAX_SUPPORTED_WIDTH + 'px)');
        this.layoutChangeSubscription = breakpointObserver.observe('(max-width: ' + this.MAX_SUPPORTED_WIDTH + 'px)')
            .subscribe(result => this.smDevice = result.matches);
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {

        this.layoutChangeSubscription.unsubscribe();
        this.darkThemeSubscription.unsubscribe();
    }
}