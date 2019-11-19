import { Landscape } from '../_models/landscape';
import { Subject } from 'rxjs';
import { LiveQueryRequest } from '../_models/livequeryrequest';
import { Technology } from '../_models/technology';

export interface LiveQueryServiceDefinition {

    newQuerySubject: Subject<LiveQueryRequest>;

    /**
     * Sends SQL to the server and gets back a compiled result object
     * which also contains errors if something was wrong with the query
     * @param The sql statement from the user
     */
    getLandscape(request: LiveQueryRequest): Promise<Landscape>;

    /**
     * Gets the technology that is currently selected
     */
    getSelectedTechnology(): Technology;

    /**
     * Sets the selected technology
     * @param tech The technology
     */
    selectTechnology(tech: Technology);
}