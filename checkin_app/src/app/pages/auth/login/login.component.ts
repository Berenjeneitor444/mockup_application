import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { BookingService } from '@services/booking/booking.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  password = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private bookingService: BookingService
  ) {}

  login() {
    if (!this.password) {
      return;
    }
    this.authService
      .login(this.password)
      .pipe(
        tap((success: boolean) => {
          if (!success) {
            throw new Error('Unauthorized');
          }
        })
      )
      .subscribe({
        next: () => {
          console.log('Login success');
          this.bookingService.reset();
          this.router.navigate(['bookings']);
        },
        error: error => {
          console.error('Login error:', error);
          this.password = '';
        },
      });
  }
}
