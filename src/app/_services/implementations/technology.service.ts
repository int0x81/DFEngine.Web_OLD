import { Technology } from '../../_models/technology';
import * as localForage from 'localforage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TechnologyServiceDefinition } from '../technology.service.def';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class TechnologyService implements TechnologyServiceDefinition {

    readonly db: LocalForage;

    constructor(private http: HttpClient) {

        this.db = localForage.createInstance({
            name: "Technologies"
        });
    }

    async loadTechnologies(): Promise<void> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': environment.API,
                'Accept': 'application/json'
            })
        }

        return this.http.get<Technology[]>(environment.API + '/technologies/getall', httpOptions).toPromise().then(async (technos) => {

            for(let techno of technos) {
                await this.db.setItem(techno.id, techno);
            }
        });
    }

    getTechnologies(): Promise<Technology[]> {

        return new Promise<Technology[]>((resolve) => {

            let allTechnologies = new Array<Technology>();

            this.db.iterate<Technology, any>((value) => {
                allTechnologies.push(value);
            }).then(() => {
                resolve(allTechnologies);
            });  
        });
    }
}