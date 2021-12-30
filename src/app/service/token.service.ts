import {Injectable} from "@angular/core";


const TOKEN_KEY = 'AuthToken';

@Injectable()
export class TokenService{


  constructor() {
  }

  signout(){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveS3Token(authorisationHeader: string){
    window.sessionStorage.removeItem(authorisationHeader);
    window.sessionStorage.setItem('s3Token', authorisationHeader);
  }
  public saveS3Date(xmzDate: string){
    window.sessionStorage.removeItem(xmzDate);
    window.sessionStorage.setItem('x-amz-date', xmzDate);
  }

  public saveS3Sha(contentSHA: string){
    window.sessionStorage.removeItem(contentSHA);
    window.sessionStorage.setItem('x-amz-content-sha256', contentSHA);
  }


  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getS3Token(): string | null {
    return sessionStorage.getItem('s3Token');
  }
  public getS3Date(): string | null {
    return sessionStorage.getItem('x-amz-date');
  }
  public getContentSHA(): string | null {
    return sessionStorage.getItem('x-amz-content-sha256');
  }
}
