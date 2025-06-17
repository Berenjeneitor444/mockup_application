import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingListItemModule } from './booking-list-item/booking-list-item.module';
import { BookingListComponent } from './booking-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { BookingListRoutingModule } from './booking-list.routing';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from 'src/app/shared-components/loading/loading.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [BookingListComponent],
  imports: [
    CommonModule,
    IonicModule,
    BookingListRoutingModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatMenuModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    BookingListItemModule,
    PipesModule,
    TranslateModule,
    LoadingModule,
  ],
})
export class BookingListModule {}
