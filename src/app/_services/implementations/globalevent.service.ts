import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class GlobalEventService {

    public sidebarToggleSubject: Subject<void> = new Subject<void>();
    public SubscriptionActivatedEvent: Subject<void> = new Subject<void>();
    public SubscriptionCanceledEvent: Subject<void> = new Subject<void>();
}