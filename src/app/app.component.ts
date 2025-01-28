import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingStateService } from './core/services/loading-state.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthenticationStateService } from './core/services/authentication-state.service';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

// export const supportedLanguages = ['EN', 'DE'];

export interface AppLanguage {
  name: string;
  code: string;
  imageUrl: string;
}

export const supportedLanguages: AppLanguage[] = [
  {
    name: 'English',
    code: 'en',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg',
  },
  {
    name: 'Deutsch',
    code: 'de',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg',
  },
];

const defaultLanguageCode = supportedLanguages[0].code;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    SidebarComponent,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private loadingStateService = inject(LoadingStateService);
  authenticationStateService = inject(AuthenticationStateService);
  translate = inject(TranslateService);

  isLoading = this.loadingStateService.isLoading;

  constructor() {
    // Sprachen konfigurieren und Standard-Sprache setzen
    this.translate.addLangs(supportedLanguages.map((lang) => lang.code));
    this.translate.setDefaultLang(defaultLanguageCode);
    this.translate.use(defaultLanguageCode);
  }

  manageAuthentication(mustLogin: boolean): void {
    if (mustLogin) this.authenticationStateService.login();
    else this.authenticationStateService.logout();
  }
}
