import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingFinishComponent } from './booking-finish.component';

const routes: Routes = [
  {
    path: '',
    component: BookingFinishComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingFinishRoutingModule {}
