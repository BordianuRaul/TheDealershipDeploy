import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginService} from "../shared/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder,private router: Router) {
    this.loginForm = this.createLoginForm();
    this.autoRedirectHome();
  }

  createLoginForm() {
    return this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmitLoginForm() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.loginService.loginUser(email, password).subscribe({
        next: response => {
          if (response && response.token) {
            localStorage.setItem('authToken', response.token);
            this.navigateToHome();
          } else {
            console.log('Login failed');
          }
        },
        error: err => {
          console.error('An error occurred:', err);
          console.log('Login failed');
        }
      });
    }
  }
  navigateToHome(){
    this.router.navigate(['Home']);
  }
  autoRedirectHome(){
    if(this.loginService.isUserLoggedIn()){
      this.navigateToHome();
    }
  }
  navigateToRegister(){
    this.router.navigate(['Register']);
  }
}
