import { Landscape } from '../_models/landscape';
import { Guid } from 'guid-typescript';

export interface LandscapeServiceDefinition {

    /**
     * Gets a landscape that is combined from the result of all requested tracking processes
     * @param trackingProcessIds The ids of all tracking processes the user 
     * wants to see the landscape of
     */
    getLandscape(trackingProcessIds: Array<Guid>): Promise<Landscape>;
}