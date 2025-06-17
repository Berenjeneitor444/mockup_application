import { Component, OnInit } from '@angular/core';
import { isSameDay } from '@helpers/date';
import { Utils } from '@helpers/utils';
import { Booking, BookingStatuses } from '@models/booking.model';
import { BasePageComponent } from '@pages/base.page';
import { AuthService } from '@services/auth/auth.service';
import {
  BookingService,
  SIMULATED_DATE,
} from '@services/booking/booking.service';
import { ConfService } from '@services/conf/conf.service';
import { tap } from 'rxjs';
import packageJson from '../../../../../package.json';
import { SimpleDialogComponent } from 'src/app/shared-components/simple-dialog/simple-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

export interface Filter {
  label: string;
  key: string;
  multiple?: boolean;
  counters?: boolean;
  options: {
    text: string;
    value?: string;
  }[];
  callback: (booking: Booking, value: string | string[]) => boolean;
}

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.scss',
})
export class BookingListComponent extends BasePageComponent implements OnInit {
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  filterCounters: { [key: string]: { [key: string]: number } } = {};
  yesterdayBookings: Booking[] = [];
  todayBookings: Booking[] = [];
  tomorrowBookings: Booking[] = [];
  selectedTabIndex = 1;
  query = ''; // search value
  loading = true;
  error = '';

  filters = [
    {
      label: 'Régimen',
      key: 'regimen',
      options: [{ text: 'AISTAD' }, { text: 'AICLUB' }],
      callback: (booking, values: string[]) => {
        if (values.length > 0) {
          return values?.some((value: string) => booking.THFactura === value);
        }
        return true;
      },
    },
    {
      label: 'VIP',
      key: 'vip',
      options: [
        { text: 'Genius' },
        { text: 'VIP1' },
        { text: 'VIP2' },
        { text: 'VIP3' },
        { text: 'Rep2-5' },
        { text: 'Rep6-9' },
        { text: 'Rep+10' },
        { text: 'Expedia VIP' },
        { text: 'ExpPremium VIP' },
        { text: 'VIP2B sin flores' },
      ],
      callback: (booking, values: string[]) => {
        if (values.length > 0) {
          return values?.some((value: string) => booking.holder?.Vip === value);
        }
        return true;
      },
    },
    {
      label: 'Estado',
      key: 'status',
      placeholder: 'Status',
      options: [
        { text: 'Pendientes', value: BookingStatuses.PENDING },
        { text: 'Pre-checkin', value: BookingStatuses.PRECHECKIN },
        { text: 'En espera', value: BookingStatuses.WAITING },
        { text: 'En curso', value: BookingStatuses.INPROGRESS },
        { text: 'Completados', value: BookingStatuses.COMPLETED },
      ],
      callback: (booking, values: string[]) => {
        if (values.length > 0) {
          return values?.some(
            (value: string) => booking.checkinStatus === value
          );
        }
        return true;
      },
    },
  ] as Filter[];

  today: Date;
  yesterday: Date;
  tomorrow: Date;

  constructor(
    private bookingServervice: BookingService,
    public authService: AuthService,
    public confService: ConfService,
    public dialog: MatDialog
  ) {
    super();

    this.today = this.confService.isDebug()
      ? new Date(SIMULATED_DATE)
      : new Date();
    this.yesterday = new Date(this.today);
    this.yesterday.setDate(this.today.getDate() - 1);
    this.tomorrow = new Date(this.today);
    this.tomorrow.setDate(this.today.getDate() + 1);

    // subscribe to bookings list updates
    this.subscriptions.push(
      this.bookingServervice.list$
        .pipe(
          tap((bookings: Booking[]) => (this.bookings = bookings)),
          tap(() => this.applyFilters()),
          tap(() => this.updateFilterCounters()),
          tap(() => (this.loading = false))
        )
        .subscribe()
    );
  }

  ngOnInit() {
    this.confService.setDefaultLanguage();
  }

  /**
   * Group bookings by checkin status
   */
  updateFilterCounters(): void {
    const bookingsOnSelectedTab =
      this.selectedTabIndex === 0
        ? this.yesterdayBookings
        : this.selectedTabIndex === 1
          ? this.todayBookings
          : this.tomorrowBookings;

    this.filters.forEach(filter => {
      this.filterCounters[filter.key] = {};
      filter.options.forEach(option => {
        this.filterCounters[filter.key][option.value ?? option.text] =
          bookingsOnSelectedTab.filter((booking: Booking) =>
            filter.callback(booking, [option.value ?? option.text])
          ).length || 0;
      });
    });
  }

  /**
   * Group bookings by date (today, yesterday, tomorrow)
   */
  groupBookingsByDate(): void {
    this.todayBookings = this.applySorting(
      this.filteredBookings.filter(booking =>
        isSameDay(booking.FechaEntrada, this.today)
      )
    );
    this.yesterdayBookings = this.applySorting(
      this.filteredBookings.filter(booking =>
        isSameDay(booking.FechaEntrada, this.yesterday)
      )
    );
    this.tomorrowBookings = this.applySorting(
      this.filteredBookings.filter(booking =>
        isSameDay(booking.FechaEntrada, this.tomorrow)
      )
    );
  }

  applySorting(bookings: Booking[]): Booking[] {
    const sorting = this.confService.sorting;

    if (sorting === 'firstName') {
      return Utils.sortByNestedKey(
        bookings,
        item => `${item.holder?.Nombre_Pila}`
      );
    } else if (sorting === 'bienvenida') {
      return Utils.sortByNestedKey(bookings, item => `${item.FechaHoraBienv}`);
    } else if (sorting === 'lastName') {
      return Utils.sortByNestedKey(bookings, item => `${item.holder?.Nombre}`);
    } else if (sorting === 'guestCount') {
      return Utils.sortByNestedKey(bookings, item => `${item.guests?.length}`);
    } else {
      return Utils.sortByNestedKey(bookings, item => `${item.NumReserva}`);
    }
  }

  applyFilters(): void {
    this.filteredBookings = this.bookings?.filter(booking => {
      return this.filters
        ? this.filters.every(filter => {
            if (this.confService.filters[filter.key]) {
              return filter.callback(
                booking,
                this.confService.filters[filter.key]
              );
            }
            return true;
          })
        : true;
    });
    this.groupBookingsByDate();
  }

  resetFilters() {
    this.confService.filters = {};
    this.applyFilters();
  }

  refresh(): void {
    this.loading = true;
    let selectedDate = this.today;
    if (this.selectedTabIndex === 0) {
      selectedDate = this.yesterday;
    } else if (this.selectedTabIndex === 1) {
      selectedDate = this.today;
    } else {
      selectedDate = this.tomorrow;
    }
    this.bookingServervice.refreshBookingsByDate(selectedDate).subscribe({
      next: () => {
        console.log('Bookings refreshed');
        this.loading = false;
      },
      error: error => {
        console.error('Error refreshing bookings', error);
        this.error = error;
        this.loading = false;
      },
    });
  }

  changeDay($event: number) {
    this.selectedTabIndex = $event;
    this.updateFilterCounters();
  }

  infoDialog() {
    this.dialog.open(SimpleDialogComponent, {
      data: {
        title: 'Version',
        message: `${packageJson.version} (${environment.name})`,
        button: 'OK',
      },
      width: '250px',
    });
  }
}
