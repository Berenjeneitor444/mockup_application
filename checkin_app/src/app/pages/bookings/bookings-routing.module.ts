import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingResolver } from '@resolvers/booking.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./booking-list/booking-list.module').then(
        m => m.BookingListModule
      ),
  },
  {
    path: ':bid',
    resolve: {
      bid: BookingResolver,
    },
    loadChildren: () =>
      import('./booking-detail/booking-detail.module').then(
        m => m.BookingDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingsRoutingModule {}
