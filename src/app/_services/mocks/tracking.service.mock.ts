import { TrackingServiceDefinition } from '../tracking.service.def';
import { Injectable } from '@angular/core';
import { TrackingProcess } from 'src/app/_models/trackingprocess';
import { TrackingOptionValue } from 'src/app/_models/trackingoptionvalue';
import * as localForage from 'localforage';
import { Guid } from 'guid-typescript';

@Injectable()
export class TrackingMock implements TrackingServiceDefinition {
    
    readonly db: LocalForage;

    trackingProcess_01: TrackingProcess = {
        
        id: "eee46759",
        gitHubBranchId: "3943738009",
        technologyId: "46724058",
        options: [
            {
                id: Guid.create().toString(),
                fieldId: "34457680",
                value: "std_server"
            },
            {
                id: Guid.create().toString(),
                fieldId: "34557680",
                value: "std_database"
            }
        ],
        selected: true
    }

    constructor() {
        
        this.db = localForage.createInstance({
            name: "TrackingProcesses"
        });
    }

    loadTrackingProcesses(): Promise<void> {
        
        return new Promise<void>((resolve) => setTimeout(() => {
            this.db.setItem<TrackingProcess>(this.trackingProcess_01.id, this.trackingProcess_01);
            resolve();
        }, Math.random() * 2000));
    }

    getTrackingProcesses(): Promise<TrackingProcess[]> {
        
        return new Promise<TrackingProcess[]>((resolve) => {

            let allProcesses = new Array<TrackingProcess>();

            this.db.iterate<TrackingProcess, any>((value) => {
                allProcesses.push(value);
            }).then(() => {
                resolve(allProcesses);
            });  
        });
    }

    create(branchId: string, technologyId: string, options: TrackingOptionValue[]): Promise<TrackingProcess> {

        return new Promise((resolve) => {
            setTimeout(() => {
                let trackingProcess = this.buildTrackingProcess(branchId, technologyId, options);
                this.db.setItem(trackingProcess.id, trackingProcess).then(() => {
                    resolve(trackingProcess);
                });

            }, Math.random() * 4000);
        });
    }

    delete(id: string): Promise<void> {

        return new Promise((resolve) => {
            setTimeout(() => {
                this.db.removeItem(id).then(() => {
                    resolve();
                });

            }, Math.random() * 2000);
        });
    }

    async getSelectedTrackingProcessIds(): Promise<string[]> {
        
        let processIds = new Array<string>();

        await this.db.iterate<TrackingProcess, any>((value) => {
            if(value.selected)
                processIds.push(value.id);
        });

        return processIds;
    }
    
    async changeProcessesSelectionState(processId: string): Promise<void> {
        
        let trackingProcess = await this.db.getItem<TrackingProcess>(processId);
        trackingProcess.selected = !trackingProcess.selected;
        this.db.setItem(trackingProcess.id, trackingProcess);
    }

    private buildTrackingProcess(branchId: string, technologyId: string, options: TrackingOptionValue[]) : TrackingProcess {

        let trackingProcess = new TrackingProcess();
        trackingProcess.id = Guid.create().toString();
        trackingProcess.gitHubBranchId = branchId;
        trackingProcess.technologyId = technologyId;
        trackingProcess.options = options;

        return trackingProcess;
    }
}