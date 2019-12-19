import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechSelectorComponent } from './tech-selector/tech-selector.component';
import { TechnologyMock } from '../_services/mocks/technology.service.mock';
import { TechnologyService } from '../_services/implementations/technology.service';
import { HttpClientModule } from '@angular/common/http';

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
    providers: [ TechnologyService ],
    entryComponents: [ ]
})
/**
 * This module contains various components that are reused across the app
 */
export class DFComponentsModule { }