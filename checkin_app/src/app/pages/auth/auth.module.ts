import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from '@pages/auth/login/login.module';
import { AuthPageRoutingModule } from '@pages/auth/auth-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, LoginModule, AuthPageRoutingModule],
})
export class AuthModule {}
