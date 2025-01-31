import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppErrorHandler implements ErrorHandler {
  constructor(private router: Router) {}

  handleError(error: Error): void {
    const message = error?.message || error?.toString() || 'Unknown Error';
    const stack = error?.stack || 'No stack trace available';
    const name = error?.name || 'UNKNOWN';

    this.postErrorData(message, stack);
    this.router.navigate(['/error'], { queryParams: { name, message } }); // könnte sein, dass angular nicht mehr funktioniert so auch der Router...
  }

  private postErrorData(message: string, stack: string) {
    const errorDetails = {
      message,
      stack,
      timestamp: new Date().toISOString(),
    };
    console.error('Error Report:', errorDetails);
  }
}
