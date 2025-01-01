import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoadingStateService } from './core/services/loading-state.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppToolbarComponent } from './core/app-toolbar/app-toolbar.component';
import { AuthenticationStateService } from './core/services/authentication-state.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MatProgressBarModule,
    AppToolbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private loadingStateService = inject(LoadingStateService);
  authenticationStateService: AuthenticationStateService;

  isLoading = this.loadingStateService.isLoading;

  constructor(authenticationStateService: AuthenticationStateService) {
    this.authenticationStateService = authenticationStateService;
  }

  manageAuthentication(mustLogin: boolean): void {
    if (mustLogin) this.authenticationStateService.login();
    else this.authenticationStateService.logout();
  }
}
