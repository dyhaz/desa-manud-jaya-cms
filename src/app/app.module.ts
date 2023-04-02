import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

import { NgbNavModule, NgbAccordionModule, NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { SharedModule } from './cyptolanding/shared/shared.module';

import { ExtrapagesModule } from './extrapages/extrapages.module';

import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initFirebaseBackend } from './authUtils';
import { CyptolandingComponent } from './cyptolanding/cyptolanding.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { FakeBackendInterceptor } from './core/helpers/fake-backend';
import { LandingComponent } from './landing/landing.component';
import { JenisPerizinanService, PerizinanService, ProgramDesaService, WargaService } from '@core/http/api';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { OAuthModule } from 'angular-oauth2-oidc';
import { FormsModule } from "@angular/forms";

if (environment.defaultauth === 'firebase') {
  initFirebaseBackend(environment.firebaseConfig);
} else {
  // tslint:disable-next-line: no-unused-expression
  FakeBackendInterceptor;
}

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CyptolandingComponent,
    LandingComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        LayoutsModule,
        AppRoutingModule,
        ExtrapagesModule,
        CarouselModule,
        NgbAccordionModule,
        NgbNavModule,
        NgbTooltipModule,
        SharedModule,
        ScrollToModule.forRoot(),
        NgbModule,
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: ['http://localhost:4200', 'https://simanud.asia', 'https://portal.simanud.asia', 'https://admin.simanud.asia'],
                sendAccessToken: true
            },
            // loginUrl: 'https://accounts.google.com/o/oauth2/auth',
            // clientId: 'your-client-id-here',
            // scope: 'openid profile email',
            // responseType: 'id_token token',
            // showDebugInformation: true,
            // logoutUrl: 'https://accounts.google.com/logout',
        }),
        FormsModule
    ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    ProgramDesaService,
    PerizinanService,
    WargaService,
    JenisPerizinanService
    // LoaderService,
    // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
  ],
})
export class AppModule { }
