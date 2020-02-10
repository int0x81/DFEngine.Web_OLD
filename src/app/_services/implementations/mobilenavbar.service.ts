import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable()
export class MobileNavbarService {

    private readonly SM_DEVICE_WIDTH: number = 738;

    private isOpen: boolean = false;
    private smDevice: boolean;

    public mobileNavToggleSubject: Subject<void> = new Subject<void>();

    constructor(breakpointObserver: BreakpointObserver) {
        breakpointObserver.observe('(max-width: ' + this.SM_DEVICE_WIDTH + 'px)')
        .subscribe(result => {
            this.smDevice = result.matches;
            if(this.isOpen)
                this.mobileNavToggleSubject.next();
        });

        this.mobileNavToggleSubject.subscribe(() => this.isOpen = !this.isOpen);
    }
}