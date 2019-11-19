import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationServiceDefinition } from '../_services/authentication.service.def';
import { AuthenticationMock } from '../_services/mocks/authentication.service.mock';

@Injectable()
export class DFTrackerGuard implements CanActivate {

    private authService: AuthenticationServiceDefinition;

    constructor(private router: Router, authMock: AuthenticationMock) {
        this.authService = authMock;
    }
    
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        
        let user = await this.authService.getClientUser();

        if(user == null) {
            this.router.navigate(["/dftracker/info"]);
            return false;
        } else {
            this.router.navigate(["/dftracker/console"]);
            return false;
        }
    }
}