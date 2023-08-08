import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addToken(request);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>) {
    const token = '123456';
    if (token) {
      const authReq = request.clone({
        headers: request.headers.set('authorId', `${token}`)
      });
      return authReq;
    }
    return request;
  }
}
