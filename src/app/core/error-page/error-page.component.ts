import { Component } from '@angular/core';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss',
})
export class ErrorPageComponent {
  errorCode?: string;
  name?: string;
  message?: string;

  constructor() {
    this.errorCode = this.getErrorCode();
    this.name = this.getErrorName();
    this.message = this.getErrorMessage();
  }

  toOverview() {
    window.location.href = '/overview';
  }

  private getErrorCode(): string | undefined {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('errorCode') || undefined;
  }

  private getErrorName(): string | undefined {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('errorName') || undefined;
  }

  private getErrorMessage(): string | undefined {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('errorMessage') || undefined;
  }
}
