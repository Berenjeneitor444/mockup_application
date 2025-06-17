import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '@models/booking.model';
import { TranslateService } from '@ngx-translate/core';
import { BasePageComponent } from '@pages/base.page';
import { BookingService } from '@services/booking/booking.service';
import { ConfService } from '@services/conf/conf.service';
import { combineLatest } from 'rxjs';
import { WifiService } from '@services/wifi/wifi.service';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrl: './wifi.component.scss',
})
export class WifiComponent extends BasePageComponent {
  booking: Booking | undefined = undefined;
  wifiPassword: string | undefined | null = undefined;
  wifiQr: string | undefined | null = undefined;
  wifiUser: string | undefined | null = undefined;
  qrCodeBase64: string | undefined | null = undefined;
  errors: string[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private wifiService: WifiService,
    public confService: ConfService,
    private translate: TranslateService,
    public dialog: MatDialog
  ) {
    super();
    this.activatedRoute.data.subscribe(async (response: any) => {
      this.booking = await this.bookingService.getBookingById(response.bid);
      this.wifiUser = parseInt(this.booking?.NumReserva || '0') + '';
      this.init();
    });
    this.subscriptions.push(
      this.confService.language$.subscribe((language: string) => {
        this.translate.setDefaultLang(language);
      })
    );
  }

  init() {
    combineLatest([
      this.wifiService.getPassword(this.booking),
      this.wifiService.getQrCode(this.booking),
    ]).subscribe({
      next: response => {
        this.wifiPassword = response[0];
        this.qrCodeBase64 = response[1];
      },
      error: error => {
        console.error('error', error);
        throw error;
      },
    });
  }

  /**
   * Navigate back to list of guests
   */
  back(): void {
    this.router.navigate(['bookings', this.booking?.NumReserva]);
  }
}
