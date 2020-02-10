import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/pagenotfound.component';
import { LiveQueryPageComponent } from './live-query-page/live-query-page.component';
import { CookiePolicyPageComponent } from './cookie-policy-page/cookie-policy-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'livequery', pathMatch: 'full' },
  { path: 'livequery', component: LiveQueryPageComponent },
  { path: 'multifile', loadChildren: () => import('./multifile-page/multifile.module').then(mod => mod.MultifileModule) },
  { path: 'cookies', component: CookiePolicyPageComponent },
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
