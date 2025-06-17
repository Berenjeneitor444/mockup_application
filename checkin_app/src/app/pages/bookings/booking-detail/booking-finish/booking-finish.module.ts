import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingFinishComponent } from './booking-finish.component';
import { BookingFinishRoutingModule } from '@pages/bookings/booking-detail/booking-finish/booking-finish.routing';
import { LoadingModule } from 'src/app/shared-components/loading/loading.module';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherModule } from 'src/app/shared-components/language-switcher/language-switcher.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  declarations: [BookingFinishComponent],
  imports: [
    CommonModule,
    MatIcon,
    BookingFinishRoutingModule,
    LoadingModule,
    LanguageSwitcherModule,
    TranslateModule,
    MatProgressSpinnerModule,
  ],
})
export class BookingFinishModule {}
