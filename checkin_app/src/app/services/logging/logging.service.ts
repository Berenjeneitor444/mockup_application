import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfService } from '@services/conf/conf.service';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor(
    private http: HttpClient,
    private confService: ConfService
  ) {}
}
