import { AuthenticationServiceDefinition } from '../authentication.service.def';
import { ClientUser } from 'src/app/_models/clientuser';
import { GitHubOAuthTicket } from 'src/app/_models/githuboauthticket';
import * as localForage from 'localforage';

export class AuthenticationMock implements AuthenticationServiceDefinition {

    private readonly userStore: LocalForage;

    ticket: GitHubOAuthTicket = {
        clientId: "somemockedid",
        state: "1337"
    }
    
    constructor() {
        
        this.userStore = localForage.createInstance({
            name: "UserMock"
        });  
    }

    getClientUser(): Promise<ClientUser> {
        
        return this.userStore.getItem("1");
    }   
    
    getGitHubOAuthTicket(): Promise<GitHubOAuthTicket> {

        return new Promise<GitHubOAuthTicket>((resolve) => setTimeout(() => {
            resolve(this.ticket);
        }, Math.random() * 2000));
    }
    
    exchangeGitHubCode(code: string, state: string): Promise<void> {
        
        this.userStore.setItem<ClientUser>("1", {
            name: "DFEngineTestUser",
            avatarUrl: "https://avatars1.githubusercontent.com/u/50590548?s=400&v=4",
            jwt: "ey1337.someinvalidjwt.1337jojo"
        })

        return new Promise<void>((resolve) => setTimeout(() => {
            resolve();
        }, Math.random() * 5000));
    }

    removeLocalSession(): Promise<void> {
        
        return this.userStore.clear();
    }
}