import { GitHubBranch } from './githubbranch';

export class GitHubRepository {

    gitHubId: string;
    name: string;
    nameWithOwner: string;
    branches: Array<GitHubBranch>;
}