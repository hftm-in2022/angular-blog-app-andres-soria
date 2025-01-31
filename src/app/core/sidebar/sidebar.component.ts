import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { RouterOutlet } from '@angular/router';
import {
  AuthenticationStateService,
  UserData,
} from '../services/authentication-state.service';
import { hasRole } from '../auth/authentication.guard';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingStateService } from '../services/loading-state.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    MatSlideToggleModule,
    MatMenuModule,
    MatDividerModule,
    MatChipsModule,
    RouterOutlet,
    MatProgressBarModule,
  ],
})
export class SidebarComponent {
  private loadingStateService = inject(LoadingStateService);
  private breakpointObserver = inject(BreakpointObserver);
  private authenticationStateService = inject(AuthenticationStateService);

  @Input() isAuthenticated!: boolean | null;
  @Input() userData!: UserData | null;
  @Output() authenticateEmitter = new EventEmitter<boolean>(); // besser mit input und output signals arbeiten
  title = 'Angular Blog-App';
  hasUserRoleOnly = true; // warum imperativ und nicht deklarativ?
  isLoading = this.loadingStateService.isLoading;

  constructor() {
    this.authenticationStateService.loginResponse$.subscribe(
      // warum subscribe und nicht pipe und ein observable zurückgeben anstelle das Property zu setzen?
      (loginResponse) => {
        this.hasUserRoleOnly =
          hasRole('user', loginResponse.accessToken) &&
          !hasRole('admin', loginResponse.accessToken);
      },
    );
  }

  login(): void {
    this.authenticateEmitter.emit(true);
  }

  logout(): void {
    this.authenticateEmitter.emit(false);
  }

  isHandsetPortrait$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.HandsetPortrait)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );
}
