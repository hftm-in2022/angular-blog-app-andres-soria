import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import {
  AuthenticationStateService,
  UserData,
} from '../services/authentication-state.service';
import { hasRole } from '../auth/authentication.guard';

@Component({
  standalone: true,
  selector: 'app-toolbar',
  imports: [
    FormsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatChipsModule,
  ],
  templateUrl: './app-toolbar.component.html',
  styleUrl: './app-toolbar.component.scss',
})
export class AppToolbarComponent {
  @Input() isAuthenticated!: boolean | null;
  @Input() userData!: UserData | null;
  @Output() authenticateEmitter = new EventEmitter<boolean>();
  title = 'Angular Blog-App';
  hasUserRoleOnly = true;

  constructor(private authenticationStateService: AuthenticationStateService) {
    this.authenticationStateService.loginResponse$.subscribe(
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
}
