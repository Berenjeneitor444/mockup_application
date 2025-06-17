import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { StorageService } from '@services/storage/storage.service';
import { Environment, HotelConf } from './types';
import * as Sentry from '@sentry/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfService {
  language = 'en';
  public language$: ReplaySubject<string> = new ReplaySubject<string>(1);
  sorting: 'id' | 'bienvenida' | 'firstName' | 'lastName' | 'guestCount' = 'id';
  filters: { [key: string]: string[] } = {};
  hotel: HotelConf | undefined = undefined;

  constructor(private storageService: StorageService) {
    this.init().subscribe();
    this.setSentryEnvironment();
  }

  init(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      // get hotel from storage
      this.hotel = this.storageService.getItem('hotel');
      // set language
      this.setLanguage(this.hotel?.defaultLanguage);
      observer.next(true);
      observer.complete();
    });
  }

  private setSentryEnvironment(): void {
    Sentry.setTag('environment', this.getDefaultConf().name);
  }

  public setLanguage(lang?: string): void {
    if (!lang) {
      lang = this.getDefaultConf().defaults.language;
    }
    this.language = lang;
    this.language$.next(lang);
  }

  public setDefaultLanguage(): void {
    this.language =
      this.getDefaultConf().defaults.language || this.language || 'en';
    this.language$.next(this.language);
  }

  public setConf(conf: HotelConf): void {
    this.storageService.setItem('hotel', conf);
    this.hotel = conf;
    this.setLanguage(
      conf.defaultLanguage || this.getDefaultConf().defaults.language
    );
  }

  public getDefaultConf(): Environment {
    return environment;
  }

  public isDebug(): boolean {
    return this.getDefaultConf().debug;
  }

  public hasFilters(): boolean {
    return Object.keys(this.filters).some(
      (key: string) => this.filters[key as keyof typeof this.filters]?.length
    );
  }
}
