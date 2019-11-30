import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechSelectorComponent } from './tech-selector/tech-selector.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TechSelectorComponent
    ],
    exports: [
        TechSelectorComponent
    ],
    bootstrap: [],
    providers: [],
    entryComponents: [ ]
})
/**
 * This module contains various components that are reused across the app
 */
export class DFComponentsModule { }