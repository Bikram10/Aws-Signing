import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {first} from "rxjs/operators";
import {TokenService} from "../service/token.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private token: TokenService,
    private authenticationService: AuthService,
    private helper: JwtHelperService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login(): void {
    this.authenticationService.attemptAuth(this.f.email.value, this.f.password.value).subscribe(
      (data: any) => {
        this.token.saveToken(data.token);
        this.authenticationService.changeAuthentication();

        const tokenPayload = this.helper.decodeToken(data.token);

        if(tokenPayload.scopes === "ROLE_ADMIN"){
          this.router.navigate(['adminDashboard']);
        } else if (tokenPayload.scopes === "ROLE_USER") {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['/']);
        }
      },
    );
  }

}
