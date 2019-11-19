import { Technology } from '../_models/technology';

export interface TechnologyServiceDefinition {

    /**
     * Gets all supported technologies from the api and stores
     * them in indexedDb
     */
    loadTechnologies(): Promise<void>;

    /**
     * Gets all stored technologies from indexedDb
     */
    getTechnologies(): Promise<Technology[]>;
}