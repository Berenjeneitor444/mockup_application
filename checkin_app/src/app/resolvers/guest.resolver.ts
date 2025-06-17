import { Injectable } from '@angular/core';
import { BookingService } from '../services/booking/booking.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GuestResolver {
  constructor(private bookingService: BookingService) {}

  resolve(route: ActivatedRouteSnapshot): string {
    return `${route.paramMap.get('gid')}`;
  }
}
