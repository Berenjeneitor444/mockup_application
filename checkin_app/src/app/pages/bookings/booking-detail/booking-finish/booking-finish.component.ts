import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BasePageComponent } from '@pages/base.page';
import { ConfService } from '@services/conf/conf.service';

@Component({
  selector: 'app-booking-finish',
  templateUrl: './booking-finish.component.html',
  styleUrl: './booking-finish.component.scss',
})
export class BookingFinishComponent extends BasePageComponent {
  constructor(
    private router: Router,
    public confService: ConfService,
    private translate: TranslateService,
    public dialog: MatDialog
  ) {
    super();
    this.subscriptions.push(
      this.confService.language$.subscribe((language: string) => {
        this.translate.setDefaultLang(language);
      })
    );
  }

  async init() {
    this.translate.setDefaultLang(this.confService.language);
  }

  goHome(): void {
    this.router.navigate(['bookings']);
  }
}
