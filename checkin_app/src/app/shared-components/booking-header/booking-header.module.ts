import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingHeaderComponent } from './booking-header.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [BookingHeaderComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [BookingHeaderComponent],
})
export class BookingHeaderModule {}
