import { IsAdminGuard } from './guards/is-admin';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { User } from './models';
import { UserModule as CommonUserModule } from '@ronas-it/angular-common';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonUserModule.forRoot({
      userModel: User,
      userService: UserService
    })
  ],
  providers: [UserService, IsAdminGuard]
})
export class UserModule {
  constructor(@Optional() @SkipSelf() parentModule: UserModule) {
    if (parentModule) {
      throw new Error('UserModule is already loaded. Import it in the AppModule only');
    }
  }
}
