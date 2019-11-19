import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { DFTrackerConsoleComponent } from './dftracker-console.component';
import { AccountComponent } from './account/account.component';
import { SubscriptionComponent } from './account/subscription/subscription.component';
import { DeinstallComponent } from './account/deinstall/deinstall.component';

const routes: Routes = [
  { path: '', component: DFTrackerConsoleComponent },
  { path: 'account', component: AccountComponent, children: [
    { path: '', redirectTo: 'subscription' },
    { path: 'subscription', component: SubscriptionComponent },
    { path: 'deinstall', component: DeinstallComponent }
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(
      routes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class DFTrackerRoutingModule { }