import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/pagenotfound.component';
import { LiveQueryPageComponent } from './live-query-page/live-query-page.component';
import { TermsOfServicePageComponent } from './terms-of-service-page/terms-of-service-page.component';
import { DFTrackerInfoComponent } from './dftracker-page/dftracker-info/dftracker-info.component';
import { SigninSuccessComponent } from './signin-success/signin-success.component';
import { DFTrackerInfoGuard } from './_auth/dftracker-info.guard';
import { DFTrackerGuard } from './_auth/dftracker.guard';
import { DFTrackerConsoleGuard } from './_auth/dftracker-console.guard';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { CookiePolicyPageComponent } from './cookie-policy-page/cookie-policy-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'livequery', pathMatch: 'full' },
  { path: 'livequery', component: LiveQueryPageComponent },
  { path: 'dftracker', component: DFTrackerInfoComponent, canActivate: [DFTrackerGuard] },
  { path: 'dftracker/info', component: DFTrackerInfoComponent, canActivate: [DFTrackerInfoGuard] },
  { path: 'dftracker/console', loadChildren: () => import('./dftracker-page/dftracker-console/dftracker.module').then(mod => mod.DFTrackerModule), canActivate: [DFTrackerConsoleGuard] },
  { path: 'terms', component: TermsOfServicePageComponent },
  { path: 'privacy', component: PrivacyPageComponent },
  { path: 'cookies', component: CookiePolicyPageComponent },
  { path: 'signinsuccess', component: SigninSuccessComponent },
  { path: 'bestgirlfriend', loadChildren: () => import('./bestgirlfriend/bestgirlfriend.module').then(mod => mod.BestGirlFriendModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
