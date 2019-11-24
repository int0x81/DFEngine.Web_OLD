import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }  from './app.component';
import { PageNotFoundComponent } from './page-not-found/pagenotfound.component';
import { TechnologyMock } from './_services/mocks/technology.service.mock';
import { LiveQueryPageComponent } from './live-query-page/live-query-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DarkmodeToggleComponent } from './navbar/darkmode-toggle/darkmode-toggle.component';
import { AdBannerComponent } from './live-query-page/ad-banner/ad-banner.component';
import { CreditComponent } from './live-query-page/credit/credit.component';
import { EditorComponent } from './live-query-page/editor/editor.component';
import { LiveQueryMock } from './_services/mocks/livequery.service.mock';
import { RenderingAreaComponent } from './live-query-page/rendering-area/rendering-area.component';
import { TermsOfServicePageComponent } from './terms-of-service-page/terms-of-service-page.component';
import { GlobalEventService } from './_services/implementations/globalevent.service';
import { DarkThemeService } from './_services/implementations/darktheme.service';
import { InteractiveLogoComponent } from './navbar/interactive-logo/interactive-logo.component';
import { TechSelectorComponent } from './live-query-page/editor/tech-selector/tech-selector.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { TechnologyService } from './_services/implementations/technology.service';
import { LiveQueryService } from './_services/implementations/livequery.service';
import { GREComponent } from './gre/gre';
import { GREService } from './gre/gre.service';
import { CookieInfoComponent } from './cookie-info/cookie-info.component';
import { CookieService } from './_services/implementations/cookie.service';
import { CookiePolicyPageComponent } from './cookie-policy-page/cookie-policy-page.component';
import { InfoButtonComponent } from './navbar/info-button/info-button.component';
import { InfoModalComponent } from './navbar/info-modal/info-modal.component';
import { GitHubButtonComponent } from './navbar/github-button/github-button.component';
import { WebGLHelperService } from './_services/implementations/webglhelper.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule//,
        //ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    declarations: [
        AppComponent,
        
        PageNotFoundComponent,
        LiveQueryPageComponent,
        NavbarComponent,
        DarkmodeToggleComponent,
        AdBannerComponent,
        CreditComponent,
        EditorComponent,
        RenderingAreaComponent,
        TermsOfServicePageComponent,
        InteractiveLogoComponent,
        TechSelectorComponent,
        PrivacyPageComponent,
        GREComponent,
        CookieInfoComponent,
        CookiePolicyPageComponent,
        InfoButtonComponent,
        InfoModalComponent,
        GitHubButtonComponent
    ],
    bootstrap: [ AppComponent ],
    providers: [ 
        CookieService,
        TechnologyService, 
        LiveQueryService, //LiveQueryMock,
        DarkThemeService,  
        GlobalEventService, 
        GREService,
        WebGLHelperService
    ],
    entryComponents: [ InfoModalComponent, CookieInfoComponent ]
})
export class AppModule { }