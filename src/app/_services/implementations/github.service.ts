import * as localForage from 'localforage';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { OptionsService } from './options.service';
import { AuthenticationService } from './authentication.service';
import { GitHubRepository } from '../../_models/githubrepository';
import { GitHubServiceDefinition } from '../github.service.def';

export class GitHubService implements GitHubServiceDefinition {

    private readonly repositories: LocalForage;

    constructor(private http: HttpClient, private options: OptionsService, private auth: AuthenticationService) {

        this.repositories = localForage.createInstance({
            name: "Repositories"
        });
    }

    async loadRepositories() : Promise<void> {

        let user = await this.auth.getClientUser();

        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': this.options.API_ENDPOINT,
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + user.jwt
            })
        }

        return this.http.get<GitHubRepository[]>(this.options.API_ENDPOINT + '/repositories/getall', httpOptions).toPromise().then((repos) => {

            for(let repo of repos) {
                this.repositories.setItem(repo.gitHubId, repo);
            }
        });
    }

    
    async getRepositories(): Promise<GitHubRepository[]> {

        let allRepositories = new Array<GitHubRepository>();
        
        await this.repositories.iterate<GitHubRepository, any>((value) => {
            allRepositories.push(value);
        });

        return allRepositories;
    }
}