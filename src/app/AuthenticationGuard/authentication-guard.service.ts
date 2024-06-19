import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {LoginService} from "../loginPage/shared/login.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.loginService.getToken()) {
      return true;
    } else {
      this.router.navigate(['']); // Redirect to the login page
      return false;
    }
  }
}
