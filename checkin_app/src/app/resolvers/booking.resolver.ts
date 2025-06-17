import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BookingResolver {
  resolve(route: ActivatedRouteSnapshot): string {
    return `${route.paramMap.get('bid')}`;
  }
}
