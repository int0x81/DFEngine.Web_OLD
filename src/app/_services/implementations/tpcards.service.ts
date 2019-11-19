import { TrackingProcess } from '../../_models/trackingprocess';
import { TrackingService } from './tracking.service';
import { Subject } from 'rxjs';
import { TrackingOptionValue } from '../../_models/trackingoptionvalue';
import { TrackingServiceDefinition } from '../tracking.service.def';
import { TrackingMock } from '../mocks/tracking.service.mock';

/**
 * The Tracking Processes are displayed as a card table in the repository
 * section. The user can create new processes, remove old ones etc. This service
 * manages these operations across multiple components
 */
export class TPCardsService {

    trackingService: TrackingServiceDefinition;
    /**
     * Maps each tracking processes to its index number its card
     * has in the cardtable
     */
    private tableProcessMap = new Map<string, number>()

    public cardsToCreate: Subject<TrackingProcess> = new Subject<TrackingProcess>();
    public cardsToDelete: Subject<number> = new Subject<number>();

    constructor(trackingMock: TrackingMock) {
        this.trackingService = trackingMock;
    }

    /**
     * Removes all cards, then publish a new card for each process loaded
     */
    async init() {

        for(let entry of this.tableProcessMap) {
            this.cardsToDelete.next(entry[1]);
        }
        this.tableProcessMap.clear();

        let trackingProcesses = await this.trackingService.getTrackingProcesses();

        let counter: number = 0;

        for(let tp of trackingProcesses) {
            this.tableProcessMap.set(tp.id, counter);
            this.cardsToCreate.next(tp);
            counter++;
        }
    }

    async createProcess(branchId: string, technologyId: string, options: TrackingOptionValue[]) {

        await this.trackingService.create(branchId, technologyId, options).then((tp) => {
            this.cardsToCreate.next(tp);
        })
    }

    async removeProcess(trackingProcessId: string) {

        let index: number;

        for(let entry of this.tableProcessMap) {
            if(entry[0] == trackingProcessId)
                index = entry[1];
        }

        await this.trackingService.delete(trackingProcessId).then(() => {
            this.cardsToDelete.next(index);
        })
    }
} 