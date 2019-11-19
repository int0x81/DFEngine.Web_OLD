import { Component, OnInit, OnDestroy } from '@angular/core';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';
import { Subscription } from 'rxjs';
import { AuthenticationMock } from 'src/app/_services/mocks/authentication.service.mock';
import { AuthenticationServiceDefinition } from 'src/app/_services/authentication.service.def';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dftracker-info',
  templateUrl: './dftracker-info.component.html',
  styleUrls: ['./dftracker-info.component.sass']
})
export class DFTrackerInfoComponent implements OnInit, OnDestroy {

  private authenticationService: AuthenticationServiceDefinition;
  darkTheme: boolean;
  private darkThemeSubscription: Subscription;

  termsAccepted: boolean = false;
  showTermsHint: boolean = false;

  constructor(darkThemeService: DarkThemeService, authMock: AuthenticationMock, private router: Router) { //remove router dependency in prod!

    this.authenticationService = authMock;
    this.darkTheme = darkThemeService.getDarkThemeState();
    this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);
  }

  ngOnInit() {}

  async onSignInClick() {

    if(!this.termsAccepted)
      this.showTermsHint = true;
    else {
      this.router.navigate(["/signinsuccess"]);
      // let ticket = await this.authenticationService.getGitHubOAuthTicket();
      // let authLink = "https://github.com/login/oauth/authorize?client_id=" + ticket.clientId + "&state=" + ticket.state;
      // window.location.href = authLink;
    }
  }

  acceptTerms() {
    this.termsAccepted = !this.termsAccepted;
  }

  ngOnDestroy() {
    this.darkThemeSubscription.unsubscribe();
  }
}
