import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  handleError(error: Error): void {
    const message = error.message ? error.message : error.toString();
    this.postErrorData(error, message);
    if (!environment.development) {
      window.location.href = '/error';
    } else {
      console.log('ERROR ->', error);
    }
  }

  postErrorData(error: Error, message: string) {
    // For now, we will just log it to the console
    console.log('Error Message ->', message);
    console.log('Error Stack ->', error.stack);
  }
}
