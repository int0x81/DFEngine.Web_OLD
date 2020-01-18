import { Component, OnInit, OnDestroy, NgZone, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkThemeService } from './_services/implementations/darktheme.service';

@Component({ 
    selector: 'app-root', 
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {

    private darkThemeSubscription: Subscription;

    darkTheme: boolean;

    constructor(darkThemeService: DarkThemeService) {

        this.darkTheme = darkThemeService.getDarkThemeState();
        this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {

        this.darkThemeSubscription.unsubscribe();
    }
}