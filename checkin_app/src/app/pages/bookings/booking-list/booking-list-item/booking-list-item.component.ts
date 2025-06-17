import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Guest } from '@models/guest.model';
import { BookingService } from '@services/booking/booking.service';
import { IonItemSliding } from '@ionic/angular';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

@Component({
  selector: 'app-booking-list-item',
  templateUrl: './booking-list-item.component.html',
  styleUrl: './booking-list-item.component.scss',
})
export class BookingListItemComponent implements OnInit, OnDestroy {
  @Input() booking: any;
  togglingArrival = false;
  @ViewChild('slidingItem', { static: false }) slidingItem!: IonItemSliding;
  waitingTime: string = '';
  private intervalId: any;

  constructor(
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.calculateWaitingTime();

    // refresh waiting time every minute
    this.intervalId = setInterval(() => {
      this.calculateWaitingTime();
    }, 60_000); // 60.000 ms = 1 min
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  /**
   * Update the waiting time in minutes.
   * Use local time and compare with this.booking.FechaHoraBienvenida which is in GMT+0100.
   * '' if the booking is already checked in.
   */
  private calculateWaitingTime(): void {
    if (!this.booking?.Bienvenida) {
      this.waitingTime = '';
      return;
    }
    // stop the timer when the first guest has checked in
    if (this.booking.guests.some((guest: Guest) => guest.completed)) {
      clearInterval(this.intervalId);
      this.waitingTime = '';
      return;
    }

    // convert api date to dayjs
    const arrivalTime = dayjs(this.booking.FechaHoraBienv).tz(
      'Europe/Madrid',
      true
    );
    const serverTime = dayjs();
    const diff = serverTime.diff(arrivalTime, 'minute');
    // show waiting time in minutes or hours and minutes
    this.waitingTime =
      diff < 60 ? `${diff} min` : `${Math.floor(diff / 60)} h ${diff % 60} min`;
  }

  checkIn() {
    this.router.navigate(['bookings', this.booking.NumReserva]);
  }

  toggleArrival() {
    this.togglingArrival = true;
    this.slidingItem.close();
    this.bookingService.toggleArrival(this.booking).subscribe({
      next: booking => {
        this.booking = booking;
        this.togglingArrival = false;
      },
      error: err => {
        this.togglingArrival = false;
        console.error('Error en toggleArrival', err);
      },
    });
  }

  /**
   * Return non-holder guests as a CSV string
   * Limit to two guests for brevity. Add '...' if there are more guests.
   * @returns
   */
  getOtherGuestsCsv() {
    return (
      this.booking.guests
        .filter((guest: Guest) => !guest.isHolder)
        .slice(0, 2)
        .map((guest: Guest) => guest.displayName)
        .join(', ') + (this.booking.guests.length > 2 ? '...' : '')
    );
  }
}
