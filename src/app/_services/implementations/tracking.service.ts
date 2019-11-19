import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TrackingProcess } from '../../_models/trackingprocess';
import { OptionsService } from './options.service';
import * as localForage from 'localforage';
import { Guid } from 'guid-typescript';
import { TrackingOptionValue } from '../../_models/trackingoptionvalue';
import { AuthenticationService } from './authentication.service';
import { TrackingServiceDefinition } from '../tracking.service.def';

@Injectable()
export class TrackingService implements TrackingServiceDefinition {

    private readonly trackingProcesses: LocalForage;

    constructor(private http: HttpClient, private options: OptionsService, private auth: AuthenticationService) { 

        this.trackingProcesses = localForage.createInstance({
            name: "TrackingProcesses"
        });
    }

    
    async loadTrackingProcesses(): Promise<void> {

        let user = await this.auth.getClientUser();

        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': this.options.API_ENDPOINT,
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + user.jwt
            })
        }

        await this.http.get<TrackingProcess[]>(this.options.API_ENDPOINT + '/trackingprocesses/getall', httpOptions).toPromise().then((tps) => {

            for(let tp of tps) {
                this.trackingProcesses.setItem(tp.id, tp);
            }
        });
        
    }

    async getTrackingProcesses(): Promise<TrackingProcess[]> {

        let allTrackingProcesses = new Array<TrackingProcess>();
        
        await this.trackingProcesses.iterate<TrackingProcess, any>((value) => {
            allTrackingProcesses.push(value);
        });

        return allTrackingProcesses; 
    }

    async create(branchId: string, technologyId: string, options: TrackingOptionValue[]): Promise<TrackingProcess> {

        let user = await this.auth.getClientUser();
        let trackingProcess = this.buildTrackingProcess(branchId, technologyId, options);

        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': this.options.API_ENDPOINT,
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + user.jwt
            })
        }

        let created = await this.http.post<TrackingProcess>(this.options.API_ENDPOINT + '/trackingprocesss/create', trackingProcess, httpOptions).toPromise();
        await this.trackingProcesses.setItem(created.id, created);
        return created;
    } 

    async delete(id: string): Promise<void> {

        let user = await this.auth.getClientUser();

        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': this.options.API_ENDPOINT,
                'Authorization': 'Bearer ' + user.jwt
            })
        }   

        await this.http.delete<any>(this.options.API_ENDPOINT + '/trackingprocesses/delete?id=' + encodeURIComponent(id), httpOptions).toPromise().then(async() => {
            
            await this.trackingProcesses.removeItem(id);
        });
    }

    async getSelectedTrackingProcessIds(): Promise<string[]> {

        let processIds = new Array<string>();

        await this.trackingProcesses.iterate<TrackingProcess, any>((value) => {
            if(value.selected)
                processIds.push(value.id);
        });

        return processIds;
    }

    async changeProcessesSelectionState(processId: string): Promise<void> {

        let trackingProcess = await this.trackingProcesses.getItem<TrackingProcess>(processId);
        trackingProcess.selected = !trackingProcess.selected;
        this.trackingProcesses.setItem(trackingProcess.id, trackingProcess);
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