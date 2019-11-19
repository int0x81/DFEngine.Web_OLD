import { Component, OnInit, NgZone } from '@angular/core';
import { AuthenticationServiceDefinition } from 'src/app/_services/authentication.service.def';
import { ClientUser } from 'src/app/_models/clientuser';
import { AuthenticationMock } from 'src/app/_services/mocks/authentication.service.mock';
import { GlobalEventService } from 'src/app/_services/implementations/globalevent.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-options',
  templateUrl: './nav-options.component.html',
  styleUrls: ['./nav-options.component.css']
})
export class NavOptionsComponent implements OnInit {

  private authService: AuthenticationServiceDefinition;
  activeUser: ClientUser | null | undefined = undefined;
  showSignInButton: boolean = false;

  constructor(authMock: AuthenticationMock, private router: Router) {

    this.authService = authMock;
  }

  async ngOnInit() {

    await this.authService.getClientUser().then((user) => {
      this.activeUser = user;
      if(this.activeUser == null)
        this.showSignInButton = true;
    });
  }
}
