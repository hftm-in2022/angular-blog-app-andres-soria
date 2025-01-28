import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppLanguage, supportedLanguages } from '../../app.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  standalone: true,
  selector: 'app-lang-select',
  imports: [
    TranslateModule,
    MatMenuModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  templateUrl: './lang-select.component.html',
  styleUrl: './lang-select.component.scss',
})
export class LangSelectComponent {
  languages = supportedLanguages;
  translate = inject(TranslateService);
  selectedLanguage: string;

  constructor() {
    const foundLanguage = this.languages.find(
      (language) => language.code === this.translate.currentLang,
    );
    this.selectedLanguage = foundLanguage ? foundLanguage.code : '';
  }

  onToggleChange(language: AppLanguage): void {
    this.translate.use(language.code);
    this.selectedLanguage = language.code;
  }
}
