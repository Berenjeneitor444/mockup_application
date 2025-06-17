import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '@models/booking.model';
import { Guest, tiposPersona } from '@models/guest.model';
import { BookingService } from '@services/booking/booking.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfService } from '@services/conf/conf.service';
import { BasePageComponent } from '@pages/base.page';
import { Utils } from '@helpers/utils';
import * as Sentry from '@sentry/angular';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogFrontdeskComponent } from './dialog-frontdesk/dialog-frontdesk.component';
import { dateToApi } from '@helpers/date';
import { ConfirmDialogComponent } from 'src/app/shared-components/confirm-dialog/confirm-dialog.component';
import { catchError, finalize, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss',
})
export class BookingDetailComponent
  extends BasePageComponent
  implements OnInit
{
  booking: Booking | undefined = undefined;
  targetElement: Element | null = null;
  loading = true;
  refreshingGuests = false;
  navigatingTo: string | undefined = undefined;
  readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private translate: TranslateService,
    public confService: ConfService
  ) {
    super();
    this.activatedRoute.data.subscribe(async (response: any) => {
      this.booking = await this.bookingService.getBookingById(
        response.bid,
        true
      );
      this.loading = false;
    });
  }

  ngOnInit() {
    this.translate.use(this.confService.language);
    Sentry.setContext('Booking', { booking: this.booking });
    Sentry.logger.debug(
      Sentry.logger
        .fmt`[${this.confService.hotel?.id}-${this.booking?.NumReserva}] Entró en lista de huéspedes...`,
      {
        hotel: this.confService.hotel?.name,
        NumReserva: this.booking?.NumReserva,
      }
    );
  }

  /**
   * Return the guests grouped by TipoPersona and sorted by NumPersona
   * @returns a group per TipoPersona that contains guests
   */
  guestsByTipoPersona(
    guests: Guest[]
  ): { key: string; name: string; guests: Guest[] }[] {
    const groups: { key: string; name: string; guests: Guest[] }[] = [];
    Object.keys(tiposPersona).forEach(key => {
      const tipo = parseInt(key, 10);
      const filteredGuests = guests.filter(
        (guest: Guest) => guest.TipoPersona == key
      );
      if (filteredGuests && filteredGuests.length > 0) {
        groups.push({
          key,
          name: this.translate.instant(
            `bookingDetail.groupNames.${tiposPersona[tipo]}`
          ),
          guests: Utils.sortByNestedKey(
            filteredGuests,
            item => `${item.NumeroCliente}`
          ),
        });
      }
    });
    return groups;
  }

  /**
   * Check if the user can continue to the next step
   * @returns true if all adult guests are checked in
   */
  allCheckedIn(): boolean {
    const checkinGuests = this.booking?.guests?.filter(
      (guest: Guest) => guest.TipoPersona === '1'
    );
    return (
      (checkinGuests &&
        checkinGuests?.length > 0 &&
        checkinGuests?.every((guest: Guest) => guest.completed === true)) ||
      false
    );
  }

  /**
   * Manage click on check-in button
   * - if guest is checked in, navigate to the guest form
   * - if guest is not checked in, show frontdesk dialog
   */
  handleClickCheckIn(guest: Guest): void {
    if (!guest.checkedIn) {
      this.goTocheckInForm(guest);
    } else {
      Sentry.logger.debug(
        Sentry.logger
          .fmt`[${this.confService.hotel?.id}-${this.booking?.NumReserva}-${guest?.NumeroCliente}] Huésped no está listo para el check-in. Refrescando...`,
        {
          hotel: this.confService.hotel?.name,
          NumReserva: this.booking?.NumReserva,
          guest,
          NumeroCliente: guest?.NumeroCliente,
          IDHuesped: guest?.IDHuesped,
          displayName: guest?.displayName,
        }
      );
      this.refreshingGuests = true;
      this.refreshGuests().subscribe({
        next: () => {
          if (guest.checkedIn) {
            // guest is now checked in, navigate to the guest form
            Sentry.logger.debug(
              Sentry.logger
                .fmt`[${this.confService.hotel?.id}-${this.booking?.NumReserva}-${guest?.NumeroCliente}] Huésped está listo para el check-in después de refrescar.`,
              {
                hotel: this.confService.hotel?.name,
                NumReserva: this.booking?.NumReserva,
                guest,
                NumeroCliente: guest?.NumeroCliente,
                IDHuesped: guest?.IDHuesped,
                displayName: guest?.displayName,
              }
            );
            this.goTocheckInForm(guest);
          } else {
            // send user to frontdesk
            Sentry.logger.warn(
              Sentry.logger
                .fmt`[${this.confService.hotel?.id}-${this.booking?.NumReserva}-${guest?.NumeroCliente}] Huésped no está listo para el check-in.`,
              {
                hotel: this.confService.hotel?.name,
                NumReserva: this.booking?.NumReserva,
                guest,
                NumeroCliente: guest?.NumeroCliente,
                IDHuesped: guest?.IDHuesped,
                displayName: guest?.displayName,
              }
            );
            this.dialog.open(DialogFrontdeskComponent, {
              width: '500px',
            });
          }
        },
        complete: () => {
          this.refreshingGuests = false;
        },
        error: error => {
          console.error('Error refreshing guests', error);
          Sentry.captureException(error, {
            extra: {
              hotel: this.confService.hotel?.name,
              NumReserva: this.booking?.NumReserva,
              FechaEntrada: this.booking?.FechaEntrada,
            },
          });
        },
      });
    }
  }

  /**
   * Navigate to guest form
   * @param guest
   */
  goTocheckInForm(guest: Guest): void {
    this.navigatingTo = guest.NumeroCliente;
    this.router.navigate([
      'bookings',
      this.booking?.NumReserva,
      guest.NumeroCliente,
    ]);
  }

  /**
   * Check if the user can see the wifi button
   *  - booking has a room assigned
   *  - at least one guest is checked in
   * @returns true if the user can see the wifi password
   */
  canSeeWifi(): boolean {
    return (
      (this.booking?.Habitacion !== undefined &&
        this.booking?.guests?.some(guest => guest.completed)) ||
      false
    );
  }

  /**
   * Refresh booking
   * @param event
   * @param message
   */
  async refresh(): Promise<void> {
    this.loading = true;
    this.booking = await this.bookingService.getBookingById(
      this.booking?.NumReserva,
      true
    );
    this.loading = false;
  }

  /**
   * Refresh guests for the booking
   */
  refreshGuests(): Observable<Guest[]> {
    this.loading = true;
    return this.bookingService
      .fetchGuests({
        reservationNumber: this.booking?.NumReserva,
        fechaEntrada: dateToApi(this.booking?.FechaEntrada),
      })
      .pipe(
        tap((guests: Guest[]) => {
          if (this.booking) this.booking.guests = guests;
          console.debug('Guests fetched:', guests);
        }),
        finalize(() => (this.loading = false)),
        catchError(error => {
          console.error('Error fetching guests', error);
          Sentry.captureException(error, {
            extra: {
              hotel: this.confService.hotel?.name,
              NumReserva: this.booking?.NumReserva,
              FechaEntrada: this.booking?.FechaEntrada,
            },
          });
          this.loading = false;
          return [];
        })
      );
  }

  /**
   * Navigate back to the list of bookings.
   * Prompt for confirmation if edit mode.
   */
  back(): void {
    if (!this.booking?.completed) {
      this.dialog
        .open(ConfirmDialogComponent, {
          data: {
            message: this.translate.instant(
              'bookingDetail.dialogs.back.message'
            ),
            buttonCancel: this.translate.instant(
              'guestForm.dialogs.cancel.buttons.no'
            ),
            buttonConfirm: this.translate.instant(
              'guestForm.dialogs.cancel.buttons.yes'
            ),
            buttonsAlign: 'center',
          },
        })
        .afterClosed()
        .subscribe(result => {
          if (result) {
            this.router.navigate(['bookings']);
          }
        });
    } else {
      this.router.navigate(['bookings']);
    }
  }
}
