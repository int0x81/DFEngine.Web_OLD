import { LiveQueryServiceDefinition } from '../livequery.service.def';
import { Landscape } from 'src/app/_models/landscape';
import { Subject } from 'rxjs';
import { LiveQueryRequest } from 'src/app/_models/livequeryrequest';
import { Technology } from 'src/app/_models/technology';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class LiveQueryService implements LiveQueryServiceDefinition {

    private selectedTechnology: Technology = new Technology();

    newQuerySubject: Subject<LiveQueryRequest> = new Subject<LiveQueryRequest>();

    constructor(private http: HttpClient) {
    }

    getLandscape(request: LiveQueryRequest): Promise<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': environment.API,
                'Accept': 'application/json'
            })
        }

        return this.http.post<any>(environment.API + '/livequery/livecompile', request, httpOptions).toPromise();
    }
    
    getSelectedTechnology(): Technology {
        return this.selectedTechnology;
    }
    selectTechnology(tech: Technology) {
        this.selectedTechnology = tech;
    }
}