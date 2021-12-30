import {CanActivate, RouterStateSnapshot} from "@angular/router";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
import {TokenService} from "./token.service";


@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(private helper: JwtHelperService, private router: Router, private token: TokenService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.token.getToken();

    if(!token){
      this.router.navigate(['/']);
      return false;
    }
    const tokenPayload = this.helper.decodeToken(token);

    if(tokenPayload.scopes === route.data.role){
      return true;
    }
    return false;
  }
}
