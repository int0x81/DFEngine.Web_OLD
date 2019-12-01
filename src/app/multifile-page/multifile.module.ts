import { NgModule } from '@angular/core';
import { MultifileRoutingModule } from './multifile.routing.module';
import { RenderingAreaModule } from '../rendering-area/rendering-area.module';
import { DFComponentsModule } from '../components/df-components.module';
import { CommonModule } from '@angular/common';

import { MultifilePageComponent } from './multifile-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FileCatalogComponent } from './sidebar/file-catalog/file-catalog.component';
import { FileSelectionItemComponent } from './sidebar/file-catalog/file-selection-item/file-selection-item.component';
import { FileSelectionDirective } from './sidebar/file-catalog/file-selection.directive';
import { MultiFileService } from './services/multifile.service';
import { FileProviderService } from './services/file-provider.service';

@NgModule({
    imports: [
        MultifileRoutingModule,
        RenderingAreaModule,
        DFComponentsModule,
        CommonModule
    ],
    declarations: [ 
        MultifilePageComponent,
        SidebarComponent,
        FileCatalogComponent,
        FileSelectionItemComponent,
        FileSelectionDirective
    ],
    bootstrap: [ MultifilePageComponent ],
    providers: [
        MultiFileService,
        FileProviderService
    ],
    entryComponents: [ FileSelectionItemComponent ]
})
export class MultifileModule { }