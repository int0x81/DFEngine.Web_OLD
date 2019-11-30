import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SQLFile } from 'src/app/_models/sql-file';

@Injectable()
export class FileProviderService {

    constructor(private http: HttpClient) {

    }
    /**
     * Gets all ETL files located in Azure DevOps
     */
    getFilesFromAzureDevOps(): Promise<SQLFile[]> {
        
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': environment.API,
                'Accept': 'application/json'
            })
        }

        return this.http.get<SQLFile[]>(environment.API + '/azuredevops/getetlfiles', httpOptions).toPromise();
    } 
}