import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDetailComponent } from './booking-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { BookingDetailRoutingModule } from './booking-detail.routing';
import { provideHttpClient } from '@angular/common/http';
import { LoadingModule } from 'src/app/shared-components/loading/loading.module';
import { MatButtonModule } from '@angular/material/button';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DialogFrontdeskComponent } from './dialog-frontdesk/dialog-frontdesk.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HeaderModule } from 'src/app/shared-components/header/header.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [BookingDetailComponent, DialogFrontdeskComponent],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    BookingDetailRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    LoadingModule,
    PipesModule,
    TranslateModule,
    HeaderModule,
  ],
  providers: [provideHttpClient()],
})
export class BookingDetailModule {}
