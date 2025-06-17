import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '@models/booking.model';
import { ConfService } from '@services/conf/conf.service';
import { Observable, catchError, map, of, timeout } from 'rxjs';
import * as Sentry from '@sentry/angular';
import { retryWithLogging } from '@helpers/api';

@Injectable({
  providedIn: 'root',
})
export class WifiService {
  private apiConf = this.confService.getDefaultConf().api;
  private usernameWavesUri = this.apiConf.url + '/wifi/username';

  constructor(
    private http: HttpClient,
    private confService: ConfService
  ) {}

  public getPassword(booking: Booking | undefined): Observable<string | null> {
    if (!booking) {
      return of(null);
    }
    return this.http
      .get(this.usernameWavesUri + '/' + parseInt(booking?.NumReserva || '0'))
      .pipe(
        timeout(5000),
        map((data: any) => {
          const password = data.content.find(
            (item: any) => item.attribute === 'Cleartext-Password'
          )?.value;
          return password ?? null;
        }),
        catchError((error: any) => {
          console.error('error', error);
          Sentry.captureMessage('Error getting WIFI password', {
            level: 'error',
            tags: {
              module: 'wifi-service',
              action: 'Get WIFI password',
            },
            extra: {
              error,
              NumReserva: booking?.NumReserva,
            },
          });
          return of(null);
        })
      );
  }

  public getQrCode(booking: Booking | undefined): Observable<string | null> {
    if (!booking) {
      return of(null);
    }
    const room = booking?.Habitacion;
    let url = '';
    if (this.confService.hotel?.id === 'M4') {
      // prefix room with '1' for M4
      url = `https://proxymex.majestic-resorts.com/gs?room=1${room}`;
    } else {
      const proxy = 'https://proxyrd.majestic-resorts.com';
      if (this.confService.hotel?.id === 'M1') {
        url = `${proxy}/gs?room=4${room}`;
      } else if (this.confService.hotel?.id === 'M2') {
        url = `${proxy}/gs?room=5${room}`;
      } else if (this.confService.hotel?.id === 'M3') {
        url = `${proxy}/gs?room=6${room}`;
      }
    }
    return this.http.get(url).pipe(
      timeout({
        each: 5_000,
      }),
      retryWithLogging({
        count: 6,
        delayMs: 1000,
        message: 'Error getting WIFI QR',
        data: url,
      }),
      map((response: any) => {
        const qrCodeBase64 = response.response;
        console.debug('qrCodeBase64', qrCodeBase64);
        return qrCodeBase64;
      }),
      catchError((error: any) => {
        const errorMessage = 'Error getting WIFI QR';
        console.error('[wifi-service]', errorMessage, url, error);
        Sentry.logger.error(
          Sentry.logger
            .fmt`[${this.confService.hotel?.id}-${booking?.NumReserva}] Error al recuperar QR WIFI.`,
          {
            hotel: this.confService.hotel?.name,
            NumReserva: booking?.NumReserva,
          }
        );
        Sentry.captureMessage(errorMessage, {
          level: 'error',
          tags: {
            module: 'wifi-service',
            action: 'Get WIFI QR',
          },
          extra: {
            room,
            error,
            url,
          },
        });
        return of(null);
      })
    );
  }
}
