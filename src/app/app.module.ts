import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RenderingAreaModule } from './rendering-area/rendering-area.module';
import { DFComponentsModule } from './components/df-components.module';

import { AppComponent }  from './app.component';
import { PageNotFoundComponent } from './page-not-found/pagenotfound.component';
import { LiveQueryPageComponent } from './live-query-page/live-query-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DarkmodeToggleComponent } from './navbar/darkmode-toggle/darkmode-toggle.component';
import { AdBannerComponent } from './live-query-page/ad-banner/ad-banner.component';
import { EditorComponent } from './live-query-page/editor/editor.component';
import { DarkThemeService } from './_services/implementations/darktheme.service';
import { InteractiveLogoComponent } from './navbar/interactive-logo/interactive-logo.component';
import { CookieInfoComponent } from './cookie-info/cookie-info.component';
import { CookieService } from './_services/implementations/cookie.service';
import { CookiePolicyPageComponent } from './cookie-policy-page/cookie-policy-page.component';
import { InfoButtonComponent } from './navbar/info-button/info-button.component';
import { InfoModalComponent } from './navbar/info-modal/info-modal.component';
import { GitHubButtonComponent } from './navbar/github-button/github-button.component';
import { WebGLHelperService } from './_services/implementations/webglhelper.service';
import { MobileNavOpenerComponent } from './navbar/mobile-nav-opener/mobile-nav-opener.component';
import { RenderingAreaService } from './rendering-area/services/rendering-area.service';
import { CompilerService } from './_services/implementations/compiler.service';
import { CompilerOptionsService } from './_services/implementations/compileroptions.service';
import { MobileNavComponent } from './navbar/mobile-nav/mobile-nav.component';
import { MobileNavbarService } from './_services/implementations/mobilenavbar.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        RenderingAreaModule,
        DFComponentsModule
    ],
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        LiveQueryPageComponent,
        NavbarComponent,
        DarkmodeToggleComponent,
        AdBannerComponent,
        EditorComponent,
        InteractiveLogoComponent,
        CookieInfoComponent,
        CookiePolicyPageComponent,
        InfoButtonComponent,
        InfoModalComponent,
        GitHubButtonComponent,
        MobileNavOpenerComponent,
        MobileNavComponent,
    ],
    bootstrap: [ AppComponent ],
    providers: [ 
        MobileNavbarService,
        CookieService,
        DarkThemeService, 
        CompilerService,
        CompilerOptionsService, 
        RenderingAreaService,
        WebGLHelperService
    ],
    entryComponents: [ InfoModalComponent, CookieInfoComponent ]
})
export class AppModule { }