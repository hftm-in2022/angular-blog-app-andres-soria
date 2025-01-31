import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { Observable } from 'rxjs';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { hasRole } from '../auth/authentication.guard';

const defaultState: LoginResponse = {
  isAuthenticated: false,
  userData: '',
  accessToken: '',
  idToken: '',
  configId: '',
  errorMessage: '',
};

export interface UserData {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  preferred_username: string;
  sub: string;
}

/**
 * Service to manage the authentication state of the application.
 * Extends the StateService with a LoginResponse type.
 *
 * @extends StateService<LoginResponse>
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationStateService extends StateService<LoginResponse> {
  /**
   * Observable that emits the current login response.
   */
  loginResponse$: Observable<LoginResponse> = this.select(
    (loginResponse) => loginResponse,
  );

  /**
   * Constructor that initializes the service and subscribes to the authentication check.
   *
   * @param securityService - The OidcSecurityService used for authentication.
   */
  constructor(private securityService: OidcSecurityService) {
    super(defaultState);

    this.securityService
      .checkAuth()
      .subscribe((loginResponse: LoginResponse) => {
        this.setLoginResponse(loginResponse);
      });
  }

  /**
   * Sets the login response state.
   *
   * @param loginResponse - The login response to set.
   */
  private setLoginResponse(loginResponse: LoginResponse): void {
    this.setState(loginResponse);
  }

  /**
   * Gets the current login response state.
   *
   * @returns The current login response.
   */
  getLoginResponse(): LoginResponse {
    return this.state;
  }

  /**
   * Gets the current authentication state.
   *
   * @returns A boolean indicating whether the user is authenticated.
   */
  getAuthenticationState(): boolean {
    return this.state.isAuthenticated;
  }

  /**
   * Checks if the current user has the specified role.
   *
   * @param role - The role to check for the current user.
   * @returns A boolean indicating whether the user has the specified role.
   */
  userHasRole(role: string): boolean {
    return hasRole(role);
  }

  /**
   * Initiates the login process.
   */
  login(): void {
    this.securityService.authorize();
  }

  /**
   * Initiates the logout process.
   */
  logout(): void {
    this.securityService.logoff().subscribe();
  }
}

// warum den OidcSecurityService wrappen, es sind ja schon Observables?
