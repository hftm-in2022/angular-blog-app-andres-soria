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
  ],
})
export class SidebarComponent {
  private breakpointObserver = inject(BreakpointObserver);

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

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );
}
