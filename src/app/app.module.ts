import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./service/auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthHttpInceptorService} from "./service/auth-http-inceptor.service";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {RoleGuardService} from "./service/role-guard.service";
import { HomeComponent } from './home/home.component';
import {TokenService} from "./service/token.service";
import {ClientService} from "./service/client.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
          }
        }),
      HttpClientModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInceptorService,
      multi: true
    },
    AuthService,
    JwtHelperService,
    RoleGuardService,
    TokenService,
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function tokenGetter(){
  return localStorage.getItem('AuthToken');
}
