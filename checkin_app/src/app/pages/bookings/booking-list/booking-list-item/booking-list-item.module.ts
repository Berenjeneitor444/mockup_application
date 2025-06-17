import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingListItemComponent } from './booking-list-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoadingModule } from 'src/app/shared-components/loading/loading.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [BookingListItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    LoadingModule,
  ],
  exports: [BookingListItemComponent],
})
export class BookingListItemModule {}
