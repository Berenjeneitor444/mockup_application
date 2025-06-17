import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { BookingService } from '@services/booking/booking.service';
import {
  Observable,
  catchError,
  filter,
  forkJoin,
  of,
  retry,
  switchMap,
  take,
  tap,
  timeout,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading = true;
  error: string | null = null;
  constructor(
    private router: Router,
    private bookingService: BookingService,
    private authService: AuthService
  ) {
    // subscribe to authentication status to re-call initApp
    this.authService.isAuthenticated$
      .pipe(filter(v => v !== null))
      .subscribe(() => {
        this.init();
      });
  }

  init() {
    console.log('[app-component] Initializing services...');

    // Inicializar authService primero
    this.authService.isAuthenticated$
      .pipe(
        filter(v => v !== null),
        take(1),
        tap((isAuthenticated: boolean) => {
          if (!isAuthenticated) {
            throw new HttpErrorResponse({
              status: 401,
              statusText: 'Unauthorized',
            });
          }
        }),
        timeout(20000), // Tiempo total de inicialización
        switchMap(authInitSuccess => {
          if (!authInitSuccess) {
            throw new Error('AuthService initialization failed');
          }
          // Inicializar otros servicios en paralelo
          return forkJoin([
            //this.confService.init().pipe(this.retryOnceWithDelay()),
            this.bookingService.init().pipe(this.retryOnceWithDelay()),
            // Añadir otros servicios aquí, cada uno con retry
          ]).pipe(
            timeout(25000),
            catchError(error => {
              console.error(
                '[app-component] Error initializing services:',
                error
              );
              return of([false]);
            })
          );
        })
      )
      .subscribe({
        next: results => {
          this.loading = false;
          const allServicesInitialized = results.every(res => res === true);
          if (allServicesInitialized) {
            console.log(
              '[app-component] All services initialized successfully.'
            );
          } else {
            console.error(
              '[app-component] One or more services failed to initialize.'
            );
            this.error =
              'No se ha podido conectar con el servidor. Por favor, inténtelo de nuevo más tarde.';
          }
        },
        error: error => {
          this.loading = false;
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.router.navigate(['auth']);
          } else {
            console.error(
              '[app-component] Initialization failed after retries:',
              error
            );
            this.error = error.message;
          }
        },
      });
  }

  private retryOnceWithDelay<T>() {
    return (source: Observable<T>) =>
      source.pipe(
        retry({
          count: 1, // try one more time
          delay: (error, retryCount) => {
            console.log(
              `[app-component] Retry attempt ${retryCount} due to error:`,
              error
            );
            return timer(1000); // wait 1 second before retry
          },
        })
      );
  }
}
