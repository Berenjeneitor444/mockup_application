import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingDetailComponent } from './booking-detail.component';
import { GuestResolver } from '@resolvers/guest.resolver';

const routes: Routes = [
  {
    path: '',
    component: BookingDetailComponent,
  },
  {
    path: 'wifi',
    loadChildren: () => import('./wifi/wifi.module').then(m => m.WifiModule),
  },
  {
    path: 'finish',
    loadChildren: () =>
      import('./booking-finish/booking-finish.module').then(
        m => m.BookingFinishModule
      ),
  },
  {
    path: ':gid',
    resolve: {
      gid: GuestResolver,
    },
    loadChildren: () =>
      import('./booking-guest-form/booking-guest-form.module').then(
        m => m.BookingGuestFormModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingDetailRoutingModule {}
