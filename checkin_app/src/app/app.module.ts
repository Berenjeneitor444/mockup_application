import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicAuthInterceptor } from './interceptors/basic-auth-interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingModule } from './shared-components/loading/loading.module';
import { MatIconRegistry } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';

import { ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import * as Sentry from '@sentry/angular';
import { provideIonicAngular } from '@ionic/angular/standalone';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    LoadingModule,
    IonicModule.forRoot({}),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
    // sentry
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    provideIonicAngular({}),
    /*
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
    */
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass('material-icons-outlined');
  }
}
