import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-toolbar',
  imports: [
    FormsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  templateUrl: './app-toolbar.component.html',
  styleUrl: './app-toolbar.component.scss',
})
export class AppToolbarComponent {
  title = 'Angular Material Blog-App';

  userName = signal<string | null>(null);
  isAuthenticated = signal<boolean>(false);

  destroyRef = inject(DestroyRef);

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  constructor(private oidcSecurityService: OidcSecurityService) {
    this.oidcSecurityService
      .checkAuth()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ isAuthenticated }) => {
        this.isAuthenticated.set(isAuthenticated);

        if (isAuthenticated) {
          this.oidcSecurityService.userData$.subscribe((userData) => {
            this.userName.set(
              userData?.userData?.preferred_username || 'Spongebob',
            );
          });
        } else {
          this.userName.set(null);
        }
      });
  }
}