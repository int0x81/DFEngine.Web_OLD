import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AuthenticationServiceDefinition } from '../_services/authentication.service.def';
import { AuthenticationMock } from '../_services/mocks/authentication.service.mock';

@Component({
  selector: 'app-signin-success',
  templateUrl: './signin-success.component.html',
  styleUrls: ['./signin-success.component.css']
})
export class SigninSuccessComponent implements OnInit {

  private authenticationService: AuthenticationServiceDefinition;

  constructor(authenticationMock: AuthenticationMock, private route: ActivatedRoute, private router: Router) {

    this.authenticationService = authenticationMock;
   }

  ngOnInit() {

    let code = this.route.snapshot.queryParamMap.get("code");
    let state = this.route.snapshot.queryParamMap.get("state");

    this.authenticationService.exchangeGitHubCode("somecode", "somestate").then(() => {
      
      this.router.navigate(["/dftracker"]);
    });

  }

}
