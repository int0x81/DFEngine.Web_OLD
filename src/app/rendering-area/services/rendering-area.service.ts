import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Landscape } from 'src/app/_models/landscape';

@Injectable()
export class RenderingAreaService {

    /**
     * Feeding this subject will cause the rendering area
     * to fall back to its original state
     */
    clearGRESubject = new Subject<void>();

    /**
     * Feeding this subject will cause the rendering area
     * to display the loading animation
     */
    loadingStateSubject = new Subject<void>();

    /**
     * Feeding this subject will cause the rendering area
     * to render a landscape
     */
    renderLandscapeSubject = new Subject<Landscape>();
}