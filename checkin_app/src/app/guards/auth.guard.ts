import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

export const isAuthenticated: CanMatchFn = (
  route: Route
):
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticated$.pipe(
    take(1), // Otherwise the Observable doesn't complete!
    tap(isAuthenticated => {
      if (isAuthenticated) {
        console.debug("[auth-guard] Access granted to '" + route.path + "'.");
        return true; // grant access
      } else {
        console.error(
          '[auth-guard] User is not authenticated. Access denied.',
          route.path
        );
        console.info('[auth-guard] Redirecting to login page...');
        return router.parseUrl('/auth');
      }
    })
    //timeout({ first: 5_000 })
  );
};
