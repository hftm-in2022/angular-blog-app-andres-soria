import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-toolbar',
  imports: [
    FormsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatChip,
  ],
  templateUrl: './app-toolbar.component.html',
  styleUrl: './app-toolbar.component.scss',
})
export class AppToolbarComponent {
  title = 'Angular Material Blog-App';
  userName = signal<string | null>(null);
  isAuthenticated = signal<boolean>(false);
  destroyRef = inject(DestroyRef);
  userRole = signal<string | null>(null);

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe();
  }

  constructor(private oidcSecurityService: OidcSecurityService) {
    this.oidcSecurityService
      .checkAuth()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ isAuthenticated }) => {
        this.isAuthenticated.set(isAuthenticated);

        if (isAuthenticated) {
          this.oidcSecurityService.userData$.subscribe((loginResponse) => {
            this.userName.set(
              loginResponse?.userData?.preferred_username || '...',
            );

            this.userRole.set(loginResponse?.userData?.role || 'N/A');
          });
        } else {
          this.userName.set(null);
          this.userRole.set(null);
        }
      });
  }
}
