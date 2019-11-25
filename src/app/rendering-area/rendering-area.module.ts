import { NgModule } from '@angular/core';
import { StatusLogoComponent } from './status-logo/status-logo.component';
import { DynamicRenderingBackgroundComponent } from './dynamic-rendering-background/dynamic-rendering-background.component';
import { GREComponent } from './gre/gre.component';
import { RenderingAreaService } from './services/rendering-area.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RenderingAreaComponent } from './rendering-area.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        RenderingAreaComponent,
        StatusLogoComponent,
        DynamicRenderingBackgroundComponent,
        GREComponent
    ],
    exports: [
        RenderingAreaComponent
    ],
    bootstrap: [],
    providers: [ RenderingAreaService ],
    entryComponents: [ ]
})
/**
 * This module represents the graph rendering engine used to visualize the data flows
 */
export class RenderingAreaModule { }