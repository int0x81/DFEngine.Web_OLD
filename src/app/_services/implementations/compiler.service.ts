import { Injectable } from '@angular/core';
import { CompilerServiceDefinition } from '../compiler.service.def';
import { Subject } from 'rxjs';
import { Landscape } from 'src/app/_models/landscape';
import { CompilerRequest } from 'src/app/_models/compilerRequest';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CompilerService implements CompilerServiceDefinition {

    constructor(private http: HttpClient) {}
    
    compile(request: CompilerRequest): Promise<any> {
        
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': environment.API,
                'Accept': 'application/json'
            })
        }

        return this.http.post<any>(environment.API + '/compilers/compile', request, httpOptions).toPromise();
    }
}