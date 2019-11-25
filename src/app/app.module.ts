import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RenderingAreaModule } from './rendering-area/rendering-area.module';

import { AppComponent }  from './app.component';
import { PageNotFoundComponent } from './page-not-found/pagenotfound.component';
import { LiveQueryPageComponent } from './live-query-page/live-query-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DarkmodeToggleComponent } from './navbar/darkmode-toggle/darkmode-toggle.component';
import { AdBannerComponent } from './live-query-page/ad-banner/ad-banner.component';
import { CreditComponent } from './live-query-page/credit/credit.component';
import { EditorComponent } from './live-query-page/editor/editor.component';
import { TermsOfServicePageComponent } from './terms-of-service-page/terms-of-service-page.component';
import { GlobalEventService } from './_services/implementations/globalevent.service';
import { DarkThemeService } from './_services/implementations/darktheme.service';
import { InteractiveLogoComponent } from './navbar/interactive-logo/interactive-logo.component';
import { TechSelectorComponent } from './live-query-page/editor/tech-selector/tech-selector.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { TechnologyService } from './_services/implementations/technology.service';
import { LiveQueryService } from './_services/implementations/livequery.service';
import { CookieInfoComponent } from './cookie-info/cookie-info.component';
import { CookieService } from './_services/implementations/cookie.service';
import { CookiePolicyPageComponent } from './cookie-policy-page/cookie-policy-page.component';
import { InfoButtonComponent } from './navbar/info-button/info-button.component';
import { InfoModalComponent } from './navbar/info-modal/info-modal.component';
import { GitHubButtonComponent } from './navbar/github-button/github-button.component';
import { WebGLHelperService } from './_services/implementations/webglhelper.service';
import { MobileNavOpenerComponent } from './navbar/mobile-nav-opener/mobile-nav-opener.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        RenderingAreaModule
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
        TermsOfServicePageComponent,
        InteractiveLogoComponent,
        TechSelectorComponent,
        PrivacyPageComponent,
        CookieInfoComponent,
        CookiePolicyPageComponent,
        InfoButtonComponent,
        InfoModalComponent,
        GitHubButtonComponent,
        MobileNavOpenerComponent,
    ],
    bootstrap: [ AppComponent ],
    providers: [ 
        CookieService,
        TechnologyService, 
        LiveQueryService,
        DarkThemeService,  
        GlobalEventService,
        WebGLHelperService
    ],
    entryComponents: [ InfoModalComponent, CookieInfoComponent ]
})
export class AppModule { }