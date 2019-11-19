import { Subject } from 'rxjs';

export class CookieService {

    acceptCookiePolicySubject: Subject<void> = new Subject<void>();

    constructor() {
      this.acceptCookiePolicySubject.subscribe(() => localStorage.setItem("cookiePolicyAccepted", "true"));
    }

    hasAcceptedCookiePolicy(): boolean {

        let state = localStorage.getItem("cookiePolicyAccepted");

        if(state == null || state == "false")
          return false;
        else
          return true;
    }
}