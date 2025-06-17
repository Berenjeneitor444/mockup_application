import { Component, Input } from '@angular/core';
import { Booking } from '@models/booking.model';

@Component({
  selector: 'app-booking-header',
  templateUrl: './booking-header.component.html',
  styleUrl: './booking-header.component.scss',
})
export class BookingHeaderComponent {
  @Input() booking: Booking | undefined;
}
