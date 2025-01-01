import { Injectable, signal } from '@angular/core';
import { StateService } from './state.service';

interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: true,
};

/**
 * Service to manage the loading state of the application.
 *
 * This service extends the `StateService` to provide a centralized
 * way to manage and access the loading state.
 *
 * @extends StateService<LoadingState>
 *
 * @example
 * // Injecting the LoadingStateService in a component
 * constructor(private loadingStateService: LoadingStateService) {}
 *
 * // Setting the loading state
 * this.loadingStateService.setLoadingState(true);
 *
 * // Getting the loading state
 * const isLoading = this.loadingStateService.isLoading;
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingStateService extends StateService<LoadingState> {
  initialState = signal(false);

  constructor() {
    super(initialState);
  }

  get isLoading() {
    return this.initialState;
  }

  setLoadingState(isLoading: boolean) {
    this.initialState.set(isLoading);
  }
}
