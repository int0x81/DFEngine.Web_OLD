import { GitHubOAuthTicket } from '../_models/githuboauthticket';
import { ClientUser } from '../_models/clientuser';

export interface AuthenticationServiceDefinition {

    /**
     * Gets the current user from indexedDb
     */
    getClientUser(): Promise<ClientUser>;

    /**
     * Gets an OAuthTicket from the server that can be exchanged for a code on GitHub
     */
    getGitHubOAuthTicket() : Promise<GitHubOAuthTicket>;

    /**
     * Exchanges the code retrieved from GitHub and stores the returned ClientUser object
     * in indexedDb. If this step was successfull the server stored the oAuthToken and 
     * is ready to perform actions for us.
     * @param code The code retrieved from GitHub
     * @param state The state retrieved from the server
     * @see If you're not familiar to the OAuth2 protocol you may check out this info page: 
     *      https://auth0.com/docs/protocols/oauth2
     */
    exchangeGitHubCode(code: string, state: string): Promise<void>;

    /**
     * Removes the current github session from this device
     * and also clears the user content (like repositories etc)
     * from cache
     */
    removeLocalSession(): Promise<void>;
}