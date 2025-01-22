import { TestBed } from '@angular/core/testing';
import { LoadingStateService } from './loading-state.service';

describe('LoadingStateService', () => {
  let service: LoadingStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingStateService],
    });
    service = TestBed.inject(LoadingStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial loading state as false', () => {
    expect(service.isLoading()).toBeFalse();
  });

  it('should set loading state to true', () => {
    service.setLoadingState(true);
    expect(service.isLoading()).toBeTrue();
  });

  it('should set loading state to false', () => {
    service.setLoadingState(true);
    service.setLoadingState(false);
    expect(service.isLoading()).toBeFalse();
  });
});
