import {
  MonoTypeOperatorFunction,
  of,
  timer,
  catchError,
  Observable,
  throwError,
  TimeoutError,
} from 'rxjs';
import { retry } from 'rxjs/operators';
import * as Sentry from '@sentry/angular';

/**
 * Helper function to retry an observable with logging
 * @param options
 * @param options.count Number of retries
 * @param options.delayMs Delay in milliseconds between retries
 * @param options.message Message to log
 * @param options.data Data to log
 * @returns MonoTypeOperatorFunction
 * @description Retry operator with logging
 */
export function retryWithLogging<T>(options: {
  count?: number;
  delayMs?: number;
  message?: string;
  data?: any;
}): MonoTypeOperatorFunction<T> {
  const {
    count = 1,
    delayMs = 1000,
    message = 'Retrying API call',
    data = {},
  } = options;

  return retry({
    count,
    delay: (error, retryCount) => {
      const msg = `${message} (attempt ${retryCount})`;
      console.warn(`[RetryWithLogging] ${msg}`, error);

      // Sentry breadcrumb en cada intento
      Sentry.addBreadcrumb({
        category: 'api',
        message: msg,
        data,
        level: 'warning',
      });

      // Delay configurable entre reintentos
      return timer(delayMs);
    },
  });
}

/**
 * Helper function to handle API errors with Sentry and logging
 * @param options
 * @param options.action Action name
 * @param options.body Request body
 * @param options.module Module name (default: 'booking-service')
 * @param options.returnValue Value to return in case of error (default: rethrow)
 * @description Handle API errors with Sentry and logging
 * @returns
 */
export function handleApiError<T>(options: {
  action: string;
  body: any;
  module?: string;
  returnValue?: T | Observable<T>; // por si quieres devolver un valor custom (ej: false)
}): MonoTypeOperatorFunction<T> {
  const { action, body, module = 'booking-service', returnValue } = options;

  return catchError<T, Observable<T>>((error: any) => {
    Sentry.addBreadcrumb({
      category: 'api',
      message: `Error during ${action}`,
      data: { body },
      level: 'error',
    });

    Sentry.captureMessage(`Error during ${action}`, {
      tags: {
        module,
        action,
      },
      extra: {
        body,
        error,
      },
    });

    if (error instanceof TimeoutError) {
      console.error(`[${module}] Timeout during ${action}`, body, error);
    } else {
      console.error(`[${module}] Error during ${action}`, body, error);
    }

    if (returnValue !== undefined) {
      return returnValue instanceof Observable ? returnValue : of(returnValue);
    } else {
      return throwError(() => error);
    }
  });
}
