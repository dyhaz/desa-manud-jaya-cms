import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { FirebaseAuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';

import { environment } from '../../../environments/environment';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { UserManagementService } from '@core/http/api';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: FirebaseAuthenticationService,
        private authFackservice: AuthfakeauthenticationService,
        private oauthService: OAuthService,
        private userService: UserManagementService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (environment.defaultauth === 'firebase') {
            const currentUser = this.authenticationService.currentUser();
            if (currentUser) {
                // logged in so return true
                return true;
            }
        } else if (environment.defaultauth === 'api') {
          const currentUser = localStorage.getItem('currentUser');
          if (currentUser) {
            // logged in so return true
            return true;
          }
        } else {
            const currentUser = this.authFackservice.currentUserValue;
            if (currentUser) {
                // logged in so return true
                return true;
            }
        }

        /**
         * OpenAPI configuration
         */
        this.configureOAuth();

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    private async configureOAuth() {
      const authConfig: AuthConfig = {
        issuer: 'https://accounts.google.com',
        clientId: environment.ssoConfig.clientId,
        redirectUri: window.location.origin,
        scope: environment.ssoConfig.scope,
        responseType: environment.ssoConfig.responseType,
        showDebugInformation: true,
        strictDiscoveryDocumentValidation: false
      };

      this.oauthService.configure(authConfig);
      this.oauthService.loadDiscoveryDocumentAndTryLogin({ customHashFragment: location.hash }).then(async (isLoggedIn) => {
        const emailAddress = this.getUserEmail();

        if (this.oauthService.hasValidAccessToken()) {
          if (!localStorage.getItem('currentUser')) {
            const users = await this.userService.showUserByEmail(emailAddress).toPromise();
            const currentUser = users.data;
            if (currentUser) {
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
              await this.router.navigate(['/dashboard']);
            } else {
              await this.router.navigate(['/account/signup'], {queryParams: {email: emailAddress}});
            }
          }
        }

        if (isLoggedIn) {
          this.oauthService.setupAutomaticSilentRefresh();
        }
      });
    }

    private getUserEmail(): string {
      const identityClaims: any = this.oauthService.getIdentityClaims();
      return identityClaims?.email || 'Email not available';
    }
}
