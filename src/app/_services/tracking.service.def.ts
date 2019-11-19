import { TrackingProcess } from '../_models/trackingprocess';
import { TrackingOptionValue } from '../_models/trackingoptionvalue';

export interface TrackingServiceDefinition {

    /**
     * Gets all users tracking processes from the api and stores
     * them in indexedDb
     */
    loadTrackingProcesses(): Promise<void>;

    /**
     * Gets all tracking processes from indexedDb.
     */
    getTrackingProcesses(): Promise<TrackingProcess[]>;

    /**
     * Creates a new tracking process and sends it to the server. Returns the created
     * object
     * @param branchId The github id of the branch that shall be tracked
     * @param technologyId The id of the technology the branch should be tracked for
     * @param options A list of options that are required by DFEngine to track a repository
     * for a specific technology
     */
    create(branchId: string, technologyId: string, options: TrackingOptionValue[]): Promise<TrackingProcess>;

    /**
     * Deletes a tracking process at server side and then deletes it from the local storage
     * if successfull
     * @param id 
     */
    delete(id: string): Promise<void>;

    /**
     * Gets the ids of all selected tracking processes from indexedDb
     */
    getSelectedTrackingProcessIds(): Promise<string[]>;

    /**
     * Changes a selection state of a given process
     * @param processId The id of the process that selection state should be changed
     */
    changeProcessesSelectionState(processId: string): Promise<void>;
}