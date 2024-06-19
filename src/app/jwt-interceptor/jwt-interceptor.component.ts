import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginService} from "../loginPage/shared/login.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add the JWT token to the request headers if available
    const token = this.loginService.getToken(); // Implement getToken method in LoginService
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
