import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { BestgirlfriendPageComponent } from './bestgirlfriend-page/bestgirlfriend-page.component';

const routes: Routes = [
  { path: '', component: BestgirlfriendPageComponent },
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
export class BestGirlFriendRoutingModule { }