import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WifiComponent } from './wifi.component';
import { WifiRoutingModule } from '@pages/bookings/booking-detail/wifi/wifi.routing';
import { LoadingModule } from 'src/app/shared-components/loading/loading.module';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherModule } from 'src/app/shared-components/language-switcher/language-switcher.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { QRCodeModule } from 'angularx-qrcode';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [WifiComponent],
  imports: [
    CommonModule,
    IonicModule,
    MatIcon,
    WifiRoutingModule,
    LoadingModule,
    LanguageSwitcherModule,
    TranslateModule,
    MatProgressSpinnerModule,
    QRCodeModule,
  ],
})
export class WifiModule {}
