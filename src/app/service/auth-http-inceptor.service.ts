import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TokenService} from "./token.service";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

const TOKEN_HEADER_KEY = "Authorization"
@Injectable()
export class AuthHttpInceptorService implements HttpInterceptor{

  constructor(private token: TokenService, private router: Router, private authService: AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    if (this.token.getToken() != null && req.url.startsWith("http://localhost:8080")) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())});
    }
    return next.handle(authReq).pipe(tap(
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err + "Error");
          if (err.status === 401) {
            this.router.navigate(['user']);
          }
        }
      })
    );
  }

}
