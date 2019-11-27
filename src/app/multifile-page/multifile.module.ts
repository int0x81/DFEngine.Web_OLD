import { NgModule } from '@angular/core';
import { MultifilePageComponent } from './multifile-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MultifileRoutingModule } from './multifile.routing.module';
import { RenderingAreaModule } from '../rendering-area/rendering-area.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        MultifileRoutingModule,
        RenderingAreaModule,
        CommonModule
    ],
    declarations: [ 
        MultifilePageComponent,
        SidebarComponent ],
    bootstrap: [ MultifilePageComponent ],
    providers: [],
    entryComponents: []
})
export class MultifileModule { }