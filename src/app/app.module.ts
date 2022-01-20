import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { WebpackTranslateLoader } from './app.translate.loader';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppState } from '@shared/store';
import { configuration } from '@configurations';
import { ApiModule } from '@ronas-it/angular-common';
import { AuthModule } from '@shared/auth';
import { UserModule } from '@shared/user';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationEffects } from '@shared/navigation';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: WebpackTranslateLoader
      }
    }),
    ApiModule.forRoot({
      apiUrl: configuration.api.url
    }),
    AuthModule,
    UserModule,
    EffectsModule.forRoot([
      NavigationEffects
    ]),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot<AppState>({
      router: routerReducer
    }),
    StoreDevtoolsModule.instrument(configuration.storeDevtools)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
