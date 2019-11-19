import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Graph } from './models/dataObjects/graph';

@Injectable()
export class GREService {

    clearGRESubject = new Subject<void>();
    renderGraphSubject = new Subject<Graph>();
}