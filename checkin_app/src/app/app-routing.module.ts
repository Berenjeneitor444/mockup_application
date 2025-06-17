import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'bookings',
    //canMatch: [isAuthenticated],
    loadChildren: () =>
      import('./pages/bookings/bookings.module').then(m => m.BookingsModule),
  },
  {
    path: '',
    redirectTo: '/bookings',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
