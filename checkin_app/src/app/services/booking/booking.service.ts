import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dateToApi, isYesterday } from '@helpers/date';
import { Booking, BookingFilter } from '@models/booking.model';
import { Guest, GuestFilter } from '@models/guest.model';
import { ConfService } from '@services/conf/conf.service';
import { ServiceInterface } from '@services/service.interface';
import {
  Observable,
  ReplaySubject,
  TimeoutError,
  catchError,
  combineLatest,
  firstValueFrom,
  map,
  of,
  switchMap,
  take,
  tap,
  throwError,
  timeout,
} from 'rxjs';
import * as Sentry from '@sentry/angular';
import { handleApiError, retryWithLogging } from '@helpers/api';

const BOOKING_STATUS = {
  CONFIRMED: '03',
  NO_SHOW: '05',
};

// date with bookings in the test environment
export const SIMULATED_DATE = '2025-01-29';

@Injectable({
  providedIn: 'root',
})
export class BookingService implements ServiceInterface {
  // A public observable to indicate if service is ready to be used.
  public ready$ = new ReplaySubject<boolean>(1);

  private list: Booking[] = [];
  // Observable to subscribe to the list of Bookings.
  public list$ = new ReplaySubject<Booking[]>(1);

  private guestList: Guest[] = [];

  // uris to fetch data from the server
  private apiConf = this.confService.getDefaultConf().api;
  private guestsUrl = this.apiConf.url + '/huespedes';
  private bookingsUrl = this.apiConf.url + '/reservas';
  private uploadUrl = this.apiConf.url + '/aws/uploadDocument';
  private useSimulatedDate = false;

  constructor(
    private http: HttpClient,
    private confService: ConfService
  ) {
    this.useSimulatedDate = this.confService.isDebug();
    if (this.useSimulatedDate) {
      console.warn(
        '[booking-service] Using simulated date for bookings:',
        SIMULATED_DATE
      );
    }
  }

  /**
   * Initialize the service.
   * Fetch bookings and guests from the server for yesterday,
   * today and tomorrow.
   */
  init(): Observable<boolean> {
    console.log('[booking-service] Initializing service...');
    // queue bookings and guests fetch requests for all dates
    const bookingObservables: Observable<any>[] = [];

    const today = this.useSimulatedDate ? new Date(SIMULATED_DATE) : new Date();
    bookingObservables.push(
      this.fetchBookings({
        fechaEntrada: dateToApi(today),
        Estado: BOOKING_STATUS.CONFIRMED,
      })
    );

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    bookingObservables.push(
      this.fetchBookings({
        fechaEntrada: dateToApi(yesterday),
        Estado: BOOKING_STATUS.CONFIRMED,
      })
    );
    bookingObservables.push(
      this.fetchBookings({
        fechaEntrada: dateToApi(yesterday),
        Estado: BOOKING_STATUS.NO_SHOW,
      })
    );

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    bookingObservables.push(
      this.fetchBookings({
        fechaEntrada: dateToApi(tomorrow),
        Estado: BOOKING_STATUS.CONFIRMED,
      })
    );

    // Resolve first bookings, then guests
    //return of(true);
    return combineLatest(bookingObservables).pipe(
      take(bookingObservables.length), // Unsubscribe after all dates are fetched
      map(() => {
        // if no booking was fetched, publish empty list
        if (this.list.length === 0) {
          this.list$.next(this.list);
        }
        console.debug('[booking-service] Initialization completed!');
        this.ready$.next(true);
        return true; // Return true indicating success
      }),
      catchError(error => {
        console.error(
          '[booking-service] Error fetching data during initialization:',
          error
        );
        this.ready$.next(false);
        return of(false); // return false to indicate initialization failed
      })
    );
  }

  /**
   * Reset the service to initial state.
   * Clear the list of bookings and guests.
   */
  public reset(): void {
    this.list = [];
    this.list$.next([]);
  }

  /**************************************************************
   * GET methods
   *************************************************************/

  /**
   * Get booking by ID from the local list
   * or fetch it from the server.
   *
   * @param id Booking id (NumReserva)
   * @param fetch If true, fetch booking from the server
   * @returns Promise to return a Booking object
   */
  async getBookingById(
    id: string | undefined,
    fetch = false
  ): Promise<Booking | undefined> {
    if (!id) {
      return undefined;
    }
    const booking = this.list.find(item => item.NumReserva === id);
    if (fetch && booking) {
      return firstValueFrom(
        this.fetchBookings({
          reservationNumber: id,
          fechaEntrada: dateToApi(booking.FechaEntrada),
        }).pipe(map(() => this.list.find(item => item.NumReserva === id)))
      );
    } else {
      return new Promise((resolve, reject) => {
        if (booking) {
          booking.guests = this.guestList.filter(
            guest => guest.NumReserva === id
          );
          resolve(booking);
        } else {
          reject(undefined);
        }
      });
    }
  }

  /**
   * Get guest by ID from the local list
   * or fetch it from the server.
   *
   * @param id Guest id (IDHuesped)
   * @param fetch If true, fetch booking from the server
   * @returns Promise to return a Guest object
   */
  async getGuestById(
    id: string | undefined,
    fetch = false
  ): Promise<Guest | undefined> {
    if (!id) {
      return undefined;
    }
    if (fetch) {
      return firstValueFrom(
        this.fetchGuests({ IDHuesped: id }).pipe(
          map((guestList: Guest[]) =>
            guestList.find(guest => guest.IDHuesped === id)
          )
        )
      );
    } else {
      return new Promise((resolve, reject) => {
        const guest = this.guestList.find(item => item.IDHuesped === id);
        if (guest) {
          resolve(guest);
        } else {
          reject(undefined);
        }
      });
    }
  }

  /**************************************************************
   * UPDATE methods
   *************************************************************/
  public updateGuest(
    booking: Booking | undefined,
    guest: Guest | undefined
  ): Observable<unknown> {
    if (!booking || !guest) return of();
    const body = {
      d: {
        DatosComunicacion: {
          Telefono: guest.DatosComunicacion.Telefono,
          EMail: guest.DatosComunicacion.EMail,
          Pais: guest.DatosComunicacion.Pais,
          Provincia: guest.DatosComunicacion.Provincia,
        },
        HotelFactura: this.confService.hotel?.id,
        NumReserva: booking.NumReserva,
        NumeroCliente: guest.NumeroCliente,
        IDHuesped: guest.IDHuesped,
        TipoPersona: guest.TipoPersona,
        Nombre_Pila: guest.Nombre_Pila,
        Nombre: guest.Nombre,
        Email: guest.DatosComunicacion.EMail,
        FechaNacimiento: dateToApi(guest.FechaNacimiento),
        PaisNacimiento: guest.PaisNacimiento ?? '',
        TipoDocumento: guest.TipoDocumento,
        FechaExpedicion: dateToApi(guest.FechaExpedicion),
        FechaCaducidad: dateToApi(guest.FechaCaducidad),
        Comentarios: guest.Comentarios,
        IDDocumento: guest.IDDocumento,
        TipoCliente: guest.TipoCliente,
        Sexo: guest.Sexo,
        FechaEntrada: dateToApi(booking.FechaEntrada),
        FechaSalida: dateToApi(booking.FechaSalida),
        //Firma: guest.Firma,
      },
    };
    console.log('[booking-service] Updating guest...', body);
    /*
    Sentry.addBreadcrumb({
      category: 'booking',
      message: 'Updating guest...',
      data: {
        body,
      },
      level: 'info',
    });
    */
    return this.http.post(this.guestsUrl + '/modificar', body).pipe(
      timeout({
        each: 8_000,
      }),
      retryWithLogging({
        count: 2,
        delayMs: 1000,
        message: 'Error updating guest',
        data: body,
      }),
      tap((response: any) => {
        console.debug(
          '[booking-service] Guest successfully updated:',
          response
        );
        Sentry.logger.info(
          Sentry.logger
            .fmt`[${this.confService.hotel?.id}-${booking.NumReserva}-${guest.NumeroCliente}] Huésped ${guest.displayName} actualizado correctamente.`,
          {
            hotel: this.confService.hotel?.name,
            NumReserva: booking.NumReserva,
            NumeroCliente: guest.NumeroCliente,
            IDHuesped: guest.IDHuesped,
            Nombre: guest.displayName,
          }
        );
        /*
        Sentry.addBreadcrumb({
          category: 'guest',
          message: 'Guest successfully updated!',
          data: {
            body,
          },
          level: 'info',
        });
        */
      }),
      handleApiError({
        action: 'Update guest',
        body,
      })
    );
  }

  public updateBooking(
    booking: Booking | undefined
  ): Observable<Booking | void> {
    if (!booking) return of();
    const body = {
      d: {
        HotelFactura: this.confService.hotel?.id,
        NumReserva: booking.NumReserva,
        CheckIn: booking.CheckIn,
        MotivoViaje: booking.MotivoViaje,
      },
    };
    console.debug('[booking-service] Updating booking...', body);
    return this.http.post(this.bookingsUrl + '/modificar', body).pipe(
      timeout({
        each: 8_000,
      }),
      retryWithLogging({
        count: 2,
        delayMs: 1000,
        message: 'Error updating booking',
        data: body,
      }),
      tap((response: any) => {
        console.debug(
          '[booking-service] Booking successfully updated!',
          response
        );
        Sentry.logger.info(
          Sentry.logger
            .fmt`[${this.confService.hotel?.id}-${booking.NumReserva}] Reserva actualizada correctamente.`,
          {
            hotel: this.confService.hotel?.name,
            NumReserva: booking.NumReserva,
            CheckIn: booking.CheckIn,
            MotivoViaje: booking.MotivoViaje,
          }
        );
        /*
        Sentry.addBreadcrumb({
          category: 'booking',
          message: 'Booking successfully updated!',
          data: {
            body,
          },
          level: 'info',
        });
        */
      }),
      handleApiError({
        action: 'Update booking',
        body,
      })
    );
  }

  public toggleArrival(
    booking: Booking | undefined
  ): Observable<Booking | void> {
    if (!booking) return of();
    const body = {
      d: {
        HotelFactura: this.confService.hotel?.id,
        NumReserva: booking.NumReserva,
        Bienvenida: 'X',
      },
    };
    console.debug('[booking-service] Toggling arrival time...', body);
    return this.http.post(this.bookingsUrl + '/modificar', body).pipe(
      timeout({
        each: 8_000,
      }),
      retryWithLogging({
        count: 2,
        delayMs: 1000,
        message: 'Error toggling arrival time',
        data: body,
      }),
      tap(() => {
        console.debug('[booking-service] Booking arrival updated!');
        Sentry.logger.info(
          Sentry.logger
            .fmt`[${this.confService.hotel?.id}-${booking.NumReserva}] ${booking?.Bienvenida === 'X' ? 'Desmarcada' : 'Marcada'} llegada.`,
          {
            hotel: this.confService.hotel?.name,
            NumReserva: booking.NumReserva,
          }
        );
        /*
        Sentry.addBreadcrumb({
          category: 'booking',
          message: 'Booking arrival updated!',
          data: {
            body,
          },
          level: 'info',
        });
        */
      }),
      // call getBookingById to update booking arrival time
      switchMap(() => this.getBookingById(booking.NumReserva, true)),
      handleApiError({
        action: 'Toggle booking arrival time',
        body,
      })
    );
  }

  public uploadDocument(
    document: any,
    filename: string,
    type: 'contract' | 'cardex' | 'privacy' | 'turismo' = 'cardex',
    booking: Booking | undefined = undefined,
    guest: Guest | undefined = undefined
  ): Observable<boolean> {
    const body = {
      document,
      documentName: filename,
      documentType: type,
      hotel: this.confService.hotel?.id,
    };
    return this.http.post(this.uploadUrl, body).pipe(
      timeout({
        each: 12_000,
      }),
      retryWithLogging({
        count: 2,
        delayMs: 1000,
        message: 'Error uploading document',
        data: body,
      }),
      map((response: any) => response.result === 'OK'),
      tap(() => {
        /*
        Sentry.addBreadcrumb({
          category: 'documents',
          message: 'Document successfully uploaded!',
          data: {
            body,
          },
          level: 'info',
        });
        */
        Sentry.logger.info(
          Sentry.logger
            .fmt`[${this.confService.hotel?.id}-${booking?.NumReserva}-${guest?.NumeroCliente}] Documento ${type} "${filename}" subido correctamente.`,
          {
            hotel: this.confService.hotel?.name,
            NumReserva: booking?.NumReserva,
            NumeroCliente: guest?.NumeroCliente,
            IDHuesped: guest?.IDHuesped,
            displayName: guest?.displayName,
            filename,
            documentType: type,
          }
        );
      }),
      // capturar error y reenviar para handleApiError
      catchError(error => {
        Sentry.logger.error(
          Sentry.logger
            .fmt`[${this.confService.hotel?.id}-${booking?.NumReserva}-${guest?.NumeroCliente}] Error al subir el documento ${type} "${filename}".`,
          {
            hotel: this.confService.hotel?.name,
            NumReserva: booking?.NumReserva,
            NumeroCliente: guest?.NumeroCliente,
            IDHuesped: guest?.IDHuesped,
            displayName: guest?.displayName,
            filename,
            documentType: type,
          }
        );
        return throwError(() => error);
      }),
      handleApiError({
        action: `Upload ${type} file`,
        body,
      })
    );
  }

  /**************************************************************
   * Private methods to fetch data from the server
   *************************************************************/

  /**
   * Fetch bookings from the server.
   * Update and publish local list.
   *
   * @param     filters  Filters to fetch bookings
   * @returns   Fetched booking objects
   */
  private fetchBookings(
    filters: BookingFilter
  ): Observable<boolean | undefined> {
    const body = {
      ...filters,
      hotel: this.confService.hotel?.id, // hotel is mandatory
    };
    let newBookings = 0;
    let updatedBookings = 0;
    console.debug('[booking-service] Fetching bookings...', filters);
    return this.http.post(this.bookingsUrl + '/lista', body).pipe(
      // process bookings
      switchMap((response: any) => {
        if (response.result === 'OK') {
          const bookings = response.reservations || [];
          bookings.forEach((booking: any) => {
            const created = this.updateOrCreate(
              this.list,
              new Booking(booking),
              'NumReserva'
            );
            if (created) {
              newBookings++;
            } else {
              updatedBookings++;
            }
          });
          this.list$.next(this.list);
          console.debug(
            '[booking-service] Received bookings for:',
            body.fechaEntrada,
            'New:',
            newBookings,
            'Updated:',
            updatedBookings
          );

          const guestFilters: GuestFilter = {
            fechaEntrada: filters.fechaEntrada,
          };
          if (filters.reservationNumber) {
            guestFilters.fechaEntrada = response.reservations?.[0].FechaEntrada;
            guestFilters.reservationNumber = filters.reservationNumber;
          }
          return this.fetchGuests(guestFilters).pipe(
            map(() => true),
            catchError(error => {
              console.error(
                '[booking-service] Error al obtener huéspedes después de reservas:',
                error
              );
              return of(false); // return false to indicate initialization failed
            })
          );
        } else {
          // returned with error
          console.warn(
            '[booking-service] Bookings returned KO for',
            body.fechaEntrada,
            body,
            response.errors
          );
          return of(false);
        }
      }),
      catchError(error => {
        if (error instanceof TimeoutError) {
          console.error('[booking-service] Request timed out.', error);
        } else {
          console.error(
            '[booking-service] Error fetching bookings or guests:',
            error
          );
          const errorMessage = error?.errors?.[0];
          Sentry.captureMessage(`Error fetching bookings: ${errorMessage}`, {
            level: 'error',
            tags: {
              module: 'booking-service',
              action: 'fetch bookings',
            },
            extra: {
              body,
              error,
            },
          });
        }
        this.list$.next([]);
        return throwError(() => error); // rethrow the error for retry to work
      })
    );
  }

  /**
   * Fetch bookings from the server for a specific date.
   * @param date
   * @returns
   */
  public refreshBookingsByDate(date: Date): Observable<boolean | undefined> {
    if (!date) {
      return this.init();
    }
    const requests: Observable<boolean | undefined>[] = [
      this.fetchBookings({
        fechaEntrada: dateToApi(date),
        Estado: BOOKING_STATUS.CONFIRMED,
      }),
    ];
    // Fetch NO_SHOW bookings only if date is yesterday
    const today = this.useSimulatedDate ? new Date(SIMULATED_DATE) : new Date();
    if (isYesterday(date, today)) {
      requests.push(
        this.fetchBookings({
          fechaEntrada: dateToApi(date),
          Estado: BOOKING_STATUS.NO_SHOW,
        })
      );
    }
    return combineLatest(requests).pipe(
      take(requests.length), // Unsubscribe after all dates are fetched
      map(() => true),
      catchError(error => {
        console.error(
          '[booking-service] Error refreshBookingsByDate:',
          date,
          error
        );
        return of(false);
      })
    );
  }

  /**
   * Fetch guests from the server and update local list.
   *
   * @param   filters  Filters to fetch guests
   * @returns  List of guests
   */
  public fetchGuests(filters: GuestFilter): Observable<Guest[]> {
    const body = {
      ...filters,
      hotel: this.confService.hotel?.id, // hotel is mandatory
    } as GuestFilter;
    console.debug('[booking-service] Fetching guests...', filters);
    const endpoint = filters.reservationNumber ? '/listar' : '/listarByDate';
    return this.http.post(this.guestsUrl + endpoint, body).pipe(
      map((response: any) => {
        const newGuests: Guest[] = [];
        let addedGuests = 0;
        if (response.result === 'OK') {
          if (response.results && response.results.length > 0) {
            // add or update guests to the list of guests
            response.results.map(async (guest: any) => {
              const newGuest = new Guest(guest);
              newGuests.push(newGuest);
              const added = this.updateOrCreateGuest(newGuest);
              if (added) {
                addedGuests++;
              }
            });
            this.publishBookings();
          }
          console.debug(
            '[booking-service] Received guests:',
            filters,
            response.results?.length,
            'New:',
            addedGuests
          );
        } else {
          // returned with error
          console.warn(
            '[booking-service] Guests returned KO for',
            body.fechaEntrada,
            body,
            response.errors
          );
        }
        // filter guests by reservation number (API doesn't support it)
        if (filters.reservationNumber) {
          return newGuests.filter(
            guest => guest.NumReserva === filters.reservationNumber
          );
        }
        return newGuests;
      }),
      catchError(error => {
        if (error instanceof TimeoutError) {
          console.error(
            '[booking-service] Fetch guest request timed out.',
            error
          );
        } else {
          console.error('[booking-service] Error fetching guests:', error);
          const errorMessage = error.errors?.[0];
          Sentry.captureMessage(`Error fetching guests: ${errorMessage}`, {
            level: 'error',
            tags: {
              module: 'booking-service',
              action: 'fetch guests',
            },
            extra: {
              body,
              error,
            },
          });
        }
        this.list$.next([]);
        return throwError(() => error);
      })
    );
  }

  /**
   * Add or update an element in a list.
   * @param list    List of elements
   * @param element Element to add or update
   * @param key     Key to compare elements
   * @returns       True if element was created, false if updated
   */
  private updateOrCreate(list: any[], element: any, key = 'id'): boolean {
    const index = list.findIndex(item => item[key] === element[key]);
    let created: boolean;
    if (index > -1) {
      list[index] = element;
      created = false;
    } else {
      list.push(element);
      created = true;
    }
    return created;
  }

  /**
   * Add or update a guest in the list of Guests.
   * @param guest     Key to compare elements
   * @returns       True if element was created, false if updated
   */
  private updateOrCreateGuest(guest: Guest): boolean {
    let created: boolean;
    const index = this.guestList.findIndex(
      item =>
        item.NumReserva === guest.NumReserva &&
        item.NumeroCliente === guest.NumeroCliente
    );
    if (index > -1) {
      // update guest
      this.guestList[index] = guest;
      created = false;
    } else {
      // add guest
      this.guestList.push(guest);
      created = true;
    }
    return created;
  }

  /**
   * Publish the list of bookings with guests.
   */
  private publishBookings(): void {
    this.list.forEach(booking => {
      booking.guests = this.guestList.filter(
        guest => guest.NumReserva === booking.NumReserva
      );
    });
    this.list$.next(this.list);
  }
}
