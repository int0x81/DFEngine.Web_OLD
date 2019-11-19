import { GitHubServiceDefinition } from '../github.service.def';
import { GitHubRepository } from 'src/app/_models/githubrepository';
import { GitHubBranch } from 'src/app/_models/githubbranch';

export class GitHubMock implements GitHubServiceDefinition {

    branch_01: GitHubBranch = {

        gitHubId: "1943738009",
        name: "master",
        repositoryName: "repo_01"
    }

    branch_02: GitHubBranch = {
        
        gitHubId: "2943738009",
        name: "dev",
        repositoryName: "repo_01"
    }

    branch_03: GitHubBranch = {
        
        gitHubId: "3943738009",
        name: "master",
        repositoryName: "repo_02"
    }

    repository_01: GitHubRepository = {

        gitHubId: "6943738405",
        name: "repo_01",
        nameWithOwner: "dfenginetestuser/repo_01",
        branches: [
            this.branch_01,
            this.branch_02
        ]
    }

    repository_02: GitHubRepository = {

        gitHubId: "6943738009",
        name: "repo_02",
        nameWithOwner: "dfenginetestuser/repo_02",
        branches: [ this.branch_03]
    }
    
    loadRepositories(): Promise<void> {
        
        return new Promise<void>((resolve) => setTimeout(() => {
            resolve();
        }, Math.random() * 2000));
    }    
    
    getRepositories(): Promise<GitHubRepository[]> {

        let repos: GitHubRepository[] = [
            this.repository_01,
            this.repository_02
        ]
        
        return new Promise<GitHubRepository[]>((resolve) => setTimeout(() => {
            resolve(repos);
        }, Math.random() * 4000));
    }
}