import {EventEmitter, Injectable} from "@angular/core";
import {Constants} from "../sared/constants";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginInfo} from "../model/loginInfo";
import {TokenService} from "./token.service";

@Injectable()
export class AuthService {

  baseUrl: string = Constants.base_url;
  public authenticated: boolean = false;
  authenticatedEmitter: EventEmitter<boolean> = new EventEmitter();


  constructor(private http: HttpClient, private token: TokenService,
  ) {

  }


  attemptAuth(email: string, password: string){
    const credentials = {email: email, password: password};
    return this.http.post(this.baseUrl + "/token/generated-token", credentials);
  }

  public generateS3Token() {
    return this.http.post(this.baseUrl + "/getAuthorisation", {});
  }




  changeAuthentication(){
    this.authenticated = !this.authenticated;
    this.authenticatedEmitter.emit(this.authenticated);
  }
}
