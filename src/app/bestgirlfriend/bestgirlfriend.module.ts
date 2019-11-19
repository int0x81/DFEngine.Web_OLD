import { NgModule } from '@angular/core';
import { BestgirlfriendPageComponent } from './bestgirlfriend-page/bestgirlfriend-page.component';
import { BestGirlFriendRoutingModule } from './bestgirlfriend.routing.module';

@NgModule({
    imports: [
        BestGirlFriendRoutingModule
    ],
    declarations: [BestgirlfriendPageComponent],
    bootstrap: [],
    providers: [],
    entryComponents: []
})
/**
 * Ready for some easter eggs? ;)
 */
export class BestGirlFriendModule {}