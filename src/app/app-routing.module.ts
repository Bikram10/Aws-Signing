import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {RoleGuardService} from "./service/role-guard.service";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [RoleGuardService], data: {role: 'ROLE_USER'}},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
