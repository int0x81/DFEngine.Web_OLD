import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as localForage from 'localforage';

import { GitHubOAuthTicket } from '../../_models/githuboauthticket';
import { OptionsService } from './options.service';
import { ClientUser } from '../../_models/clientuser';
import { AuthenticationServiceDefinition } from '../authentication.service.def';

@Injectable()
export class AuthenticationService implements AuthenticationServiceDefinition {
    
    private readonly clientUser: LocalForage;
    private readonly dbKey: string = 'dbKey';

    constructor(private http: HttpClient, private options: OptionsService) {

        this.clientUser = localForage.createInstance({
            name: "ClientUser"
        });
     }

    async getClientUser(): Promise<ClientUser> {
        
        return await this.clientUser.getItem(this.dbKey);
    }

    getGitHubOAuthTicket() : Promise<GitHubOAuthTicket> {   

        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': this.options.API_ENDPOINT,
                'Accept': 'application/json'
            })
        }

        return this.http.get<GitHubOAuthTicket>(this.options.API_ENDPOINT + '/auth/getoauthticket', httpOptions).toPromise();
    }

    exchangeGitHubCode(code: string, state: string): Promise<void> {
        
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': this.options.API_ENDPOINT,
                'Accept': 'application/json'
            })
        }

        let url: string = this.options.API_ENDPOINT + '/auth/codeexchange?code=' + encodeURIComponent(code) + '&state=' + encodeURIComponent(state);

        return this.http.get<ClientUser>(url, httpOptions).toPromise().then((user) => {

            this.clientUser.setItem(this.dbKey, user);
        });
    }

    removeLocalSession(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}