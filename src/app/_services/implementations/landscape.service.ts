import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TrackingService } from './tracking.service';
import { OptionsService } from './options.service';
import { AuthenticationService } from './authentication.service';
import { Subject } from 'rxjs';
import { LandscapeServiceDefinition } from '../landscape.service.def';
import { Guid } from 'guid-typescript';
import { Landscape } from 'src/app/_models/landscape';

@Injectable()
export class LandscapeService implements LandscapeServiceDefinition {

    newLandscape: Subject<string>;

    constructor(private http: HttpClient, private options: OptionsService, private trackingService: TrackingService, private auth: AuthenticationService) {

        this.newLandscape = new Subject<string>();
    }

    async getLandscape(trackingProcessIds: Array<Guid>): Promise<Landscape> {

        let user = await this.auth.getClientUser();

        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': this.options.API_ENDPOINT,
                'Authorization': 'Bearer ' + user.jwt,
                'Accept': 'application/json'
            })
        }

        let requestBody = await this.trackingService.getSelectedTrackingProcessIds();

        return this.http.post<Landscape>(this.options.API_ENDPOINT + "/landscapes/get", requestBody, httpOptions).toPromise();
    }
}