import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingGuestFormComponent } from './booking-guest-form.component';
import { SurveyModule } from 'survey-angular-ui';
import { BookingGuestFormRoutingModule } from './booking-guest-form.routing';
import { LoadingModule } from 'src/app/shared-components/loading/loading.module';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from 'src/app/shared-components/header/header.module';
import { BookingHeaderModule } from 'src/app/shared-components/booking-header/booking-header.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [BookingGuestFormComponent, ErrorModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    SurveyModule,
    BookingGuestFormRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    LoadingModule,
    HeaderModule,
    BookingHeaderModule,
    TranslateModule,
  ],
})
export class BookingGuestFormModule {}
