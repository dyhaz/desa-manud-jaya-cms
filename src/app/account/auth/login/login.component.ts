import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '@core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { AuthenticationService } from '@core/http/api';
import Swal from 'sweetalert2';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;

  // set the current year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    // private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    private auth: AuthenticationService,
    private oauthService: OAuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    localStorage.removeItem('currentUser');
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.configureOAuth();

    // Check if SSO login succeed
    this.route.queryParams
      .subscribe(params => {
          console.log('access token', params.returnUrl.split('access_token=')[1]);
          const token = params.returnUrl?.split('access_token=')[1] ?? false;
          if (token) {
            Swal.fire('Sukses!', 'Login berhasil', 'success');
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 2000);
          }
        }
      );
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      if (environment.defaultauth === 'firebase') {
        // this.authenticationService.login(this.f.email.value, this.f.password.value).then((res: any) => {
        //   this.router.navigate(['/dashboard']);
        // })
        //   .catch(error => {
        //     this.error = error ? error : '';
        //   });
      } else if (environment.defaultauth === 'api') {
        this.auth.login({
          email: this.f.email.value,
          password: this.f.password.value
        }).subscribe((response) => {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.router.navigate(['/dashboard']);
        }, async (result) => {
          await Swal.fire('Error', result.toString());
        });
      } else {
        this.authFackservice.login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe(
            data => {
              this.router.navigate(['/dashboard']);
            },
            error => {
              this.error = error ? error : '';
            });
      }
    }
  }

  private configureOAuth(): void {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      clientId: '186253579723-pvgkk6cpbe8krpu8m07ngdfdc44v1rv8.apps.googleusercontent.com',
      redirectUri: window.location.origin,
      scope: 'openid',
      responseType: 'id_token token',
      showDebugInformation: true,
      strictDiscoveryDocumentValidation: false
    };

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  signInWithGoogle() {
    this.oauthService.initLoginFlow();
  }
}
