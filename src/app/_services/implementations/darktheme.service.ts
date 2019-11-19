import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DarkThemeService {

    private currentState: boolean;

    /**
     * Feeding this subject toggles the dark theme state
     * across the whole app
     */
    public darkThemeSubject: Subject<void> = new Subject<void>();
    
    
    constructor() {

        this.currentState = this.getDarkThemePreferences();

        this.darkThemeSubject.subscribe(() => this.currentState = !this.currentState);
    }

    public getDarkThemeState(): boolean { 
        return this.currentState; 
    }

    private getDarkThemePreferences(): boolean {
        return true;
    }
}