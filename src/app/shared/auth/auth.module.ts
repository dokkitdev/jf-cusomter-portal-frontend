import { AuthModule as CommonAuthModule } from '@ronas-it/angular-common';
import { AuthService } from './auth.service';
import { configuration } from '@configurations';
import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
  imports: [
    CommonAuthModule.forRoot({
      ...configuration.api,
      authService: AuthService
    })
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {
  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error('AuthModule is already loaded. Import it in the AppModule only');
    }
  }
}
