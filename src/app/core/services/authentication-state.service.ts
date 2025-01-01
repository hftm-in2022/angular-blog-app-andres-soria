import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { Observable } from 'rxjs';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';

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
