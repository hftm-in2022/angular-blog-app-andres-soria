import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

/**
 * A generic state management service that uses a BehaviorSubject to manage state.
 *
 * @template T - The type of the state.
 */
export class StateService<T> {
  /**
   * The BehaviorSubject that holds the state.
   *
   * @private
   */
  private state$: BehaviorSubject<T>;

  /**
   * Creates an instance of StateService.
   *
   * @param initialState - The initial state.
   */
  constructor(initialState: T) {
    this.state$ = new BehaviorSubject<T>(initialState);
  }

  /**
   * Selects a slice of the state based on the provided mapping function.
   *
   * @template K - The type of the selected slice.
   * @param mapFn - A function that maps the state to the selected slice.
   * @returns An Observable of the selected slice.
   */
  protected select<K>(mapFn: (state: T) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged(),
    );
  }

  /**
   * Gets the current state.
   *
   * @protected
   * @returns The current state.
   */
  protected get state(): T {
    return this.state$.getValue(); // getvalue sollte nicht verwendet werden. Besser ein Observable zurückgeben.
  }

  /**
   * Sets a new state by merging the current state with the provided partial state.
   *
   * @protected
   * @param newState - The partial state to merge with the current state.
   */
  protected setState(newState: Partial<T>) {
    this.state$.next({
      ...this.state,
      ...newState,
    });
  }
}

// warum benötigt es diesen Wrapper, BehaviorSubject bietet doch schon alles nötige... und ist auch generic
