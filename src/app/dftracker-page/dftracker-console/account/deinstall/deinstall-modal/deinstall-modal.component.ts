import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationMock } from 'src/app/_services/mocks/authentication.service.mock';
import { AuthenticationServiceDefinition } from 'src/app/_services/authentication.service.def';
import { Router } from '@angular/router';
import { GlobalEventService } from 'src/app/_services/implementations/globalevent.service';
import { Subscription } from 'rxjs';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';

@Component({
  selector: 'app-deinstall-modal',
  templateUrl: './deinstall-modal.component.html',
  styleUrls: ['./deinstall-modal.component.css']
})
export class DeinstallModalComponent implements OnInit, OnDestroy {

  private authenticationService: AuthenticationServiceDefinition;
  darkTheme: boolean;
  private darkThemeSubscription: Subscription;

  constructor(authMock: AuthenticationMock, private router: Router, public activeModal: NgbActiveModal, darkThemeService: DarkThemeService) { 
    this.authenticationService = authMock;
    this.darkTheme = darkThemeService.getDarkThemeState();
    this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);
  }

  ngOnInit() {}

  removeSession() {
    this.authenticationService.removeLocalSession().then(() => {
      this.router.navigate(["/livequery"]);
      this.activeModal.close();
    });
  }

  ngOnDestroy() {
    this.darkThemeSubscription.unsubscribe();
  }
}
