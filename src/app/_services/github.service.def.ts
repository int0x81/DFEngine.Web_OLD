import { GitHubRepository } from '../_models/githubrepository';

export interface GitHubServiceDefinition {

    /**
     * Gets all available repositories from the api and stores
     * them in indexedDb
     */
    loadRepositories() : Promise<void>

    /**
     * Gets all stored repositories from indexedDb.
     */
    getRepositories(): Promise<GitHubRepository[]>;
}