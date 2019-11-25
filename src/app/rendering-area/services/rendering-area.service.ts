import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Graph } from '../gre/models/dataObjects/graph';

@Injectable()
export class RenderingAreaService {

    clearGRESubject = new Subject<void>();
    renderGraphSubject = new Subject<Graph>();
}