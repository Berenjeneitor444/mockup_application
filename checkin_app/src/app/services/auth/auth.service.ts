import { Injectable } from '@angular/core';
import { ConfService } from '@services/conf/conf.service';
import { StorageService } from '@services/storage/storage.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private confService: ConfService,
    private storageService: StorageService
  ) {
    const isAuthenticated = this.storageService.getItem('isAuthenticated');
    if (isAuthenticated) {
      this.isAuthenticated$.next(true);
    } else {
      this.isAuthenticated$.next(false);
    }
  }

  login(password: string): Observable<boolean> {
    console.log('Login with password:', password);
    const defaultConf = this.confService.getDefaultConf();
    console.log('Default conf:', defaultConf);
    const match = defaultConf.hotels.find(hotel => hotel.password === password);
    if (!match) {
      return of(false);
    }
    this.confService.setConf(match);
    this.storageService.setItem('isAuthenticated', true);
    this.isAuthenticated$.next(true);
    return of(true);
  }

  logout(): void {
    this.storageService.removeItem('isAuthenticated');
    this.isAuthenticated$.next(false);
  }
}
