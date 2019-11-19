import { NgModule } from '@angular/core';
import { DFTrackerRoutingModule } from './dftracker.routing.module';
import { DFTrackerConsoleComponent } from './dftracker-console.component';
import { AccountComponent } from './account/account.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { DeinstallComponent } from './account/deinstall/deinstall.component';
import { DeinstallModalComponent } from './account/deinstall/deinstall-modal/deinstall-modal.component';
import { SubscriptionComponent } from './account/subscription/subscription.component';
import { StripeMock } from 'src/app/_services/mocks/stripe.service.mock';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RenewModalComponent } from './account/subscription/renew-modal/renew-modal.component';
import { SubscribeModalComponent } from './account/subscription/subscribe-modal/subscribe-modal.component';
import { CancelModalComponent } from './account/subscription/cancel-modal/cancel-modal.component';
import { RepoModalComponent } from './sidebar/repo-modal/repo-modal.component';
import { AddRepoComponent } from './sidebar/add-repo/add-repo.component';
import { FileSelectorComponent } from './sidebar/file-selector/file-selector.component';
import { RepoSelectorComponent } from './sidebar/repo-selector/repo-selector.component';

@NgModule({
    imports: [
        DFTrackerRoutingModule,
        NgbModule,
        CommonModule,
    ],
    declarations: [
        DFTrackerConsoleComponent,
        AccountComponent,
        SidebarComponent,
        DeinstallComponent,
        DeinstallModalComponent,
        SubscriptionComponent,
        RenewModalComponent,
        SubscribeModalComponent,
        CancelModalComponent,
        RepoModalComponent,
        AddRepoComponent,
        FileSelectorComponent,
        RepoSelectorComponent
    ],
    bootstrap: [],
    providers: [ StripeMock ],
    entryComponents: [ RenewModalComponent, CancelModalComponent, SubscribeModalComponent, DeinstallModalComponent, RepoModalComponent ]
})
export class DFTrackerModule { }