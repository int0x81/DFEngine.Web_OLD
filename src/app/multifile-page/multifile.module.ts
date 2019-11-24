import { NgModule } from '@angular/core';
import { MultifilePageComponent } from './multifile-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MultifileRoutingModule } from './multifile.routing.module';

@NgModule({
    imports: [
        MultifileRoutingModule
    ],
    declarations: [ 
        MultifilePageComponent,
        SidebarComponent ],
    bootstrap: [ MultifilePageComponent ],
    providers: [],
    entryComponents: []
})
export class MultifileModule { }