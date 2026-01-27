import { Injectable, Inject, InjectionToken } from '@angular/core';
import { catchError, defer, delay, iif, map, Observable, of, tap, throwError } from 'rxjs';

export const WINDOW = new InjectionToken<Window>('');

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private minDelay = 1000; 
  private maxDelay = 3000;

  constructor(@Inject(WINDOW) private window: Window) {}

  private randomDelay(): number {
    return Math.floor(Math.random() * (this.maxDelay - this.minDelay + 1)) + this.minDelay;
  }

  private handleError(error: unknown): Observable<never> {
    console.error('Error accessing local storage:', error);
    return throwError(() => new Error('Local Storage operation failed'));
  }

  public set<T>(key: string, value: T): Observable<void> {
    const mockDelay = this.randomDelay();

    return defer(() => {
      const serializedValue = JSON.stringify(value);
      this.window.localStorage.setItem(key, serializedValue);
      return of(void 0);
    }).pipe(
      delay(mockDelay),
      catchError(this.handleError),
    );
  }

  public get<T>(key: string): Observable<T | null> {
    const mockDelay = this.randomDelay();

    return defer(() => {
      const serializedValue = this.window.localStorage.getItem(key);     
      return iif(
        () => serializedValue === null, 
        of(null),
        of(JSON.parse(serializedValue!) as T)
      )
    }).pipe(
      delay(mockDelay),
      catchError(this.handleError)
    );
  }
  
  public remove(key: string): Observable<void> {
    const mockDelay = this.randomDelay();

    return defer(() => {
      this.window.localStorage.removeItem(key);
      return of(void 0); 
    }).pipe(
      delay(mockDelay),
      catchError(this.handleError)
    );
  }
}