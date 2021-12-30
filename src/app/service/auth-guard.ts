import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {TokenService} from "./token.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private helper: JwtHelperService, private router: Router, private authService: AuthService, private token: TokenService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean{
    const token = this.token.getToken();

    if(!token){
      this.router.navigate(['login']);
      return false;
    }
    const tokenPayload = this.helper.decodeToken(token);

    if(tokenPayload.scopes === route.data.role){
      return true;
    }

    return false;
  }

}
