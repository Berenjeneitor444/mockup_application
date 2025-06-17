import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfService } from '@services/conf/conf.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(private confService: ConfService) {}
  private apiConf = this.confService.getDefaultConf().api;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add header with basic auth credentials if user is logged in and request is to the api url
    const isApiUrl = request.url.startsWith(this.apiConf.url);
    if (isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${btoa(`${this.apiConf.user}:${this.apiConf.password}`)}`,
        },
      });
    }

    return next.handle(request);
  }
}
