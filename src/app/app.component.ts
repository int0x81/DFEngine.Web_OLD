import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MobileNavbarService } from './_services/implementations/mobilenavbar.service';

@Component({ 
    selector: 'app-root', 
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnDestroy {

    private mobileNavSubscription: Subscription;
    mobileNavOpen: boolean = false;

    constructor(mobileNavbarService: MobileNavbarService) {
        this.mobileNavSubscription = mobileNavbarService.mobileNavToggleSubject.subscribe(() => {
            this.mobileNavOpen = !this.mobileNavOpen;
        });
     }

    ngOnDestroy(): void {
        this.mobileNavSubscription.unsubscribe();
    }
}