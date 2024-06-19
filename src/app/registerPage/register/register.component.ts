import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginService} from "../../loginPage/shared/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router, private formBuilder: FormBuilder) {
    this.registerForm = this.createRegisterForm();
  }

  createRegisterForm(){
    return this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmitRegisterForm(){
    if(this.registerForm.valid){
      const username = this.registerForm.value.username;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;

      this.loginService.registerUser(username, email, password).subscribe({
        next: response =>{
            this.loginService.loginUser(email, password);
            this.navigateToHome()
        }
      })
    }
  }

  navigateToHome(){
    this.router.navigate(['Home']);
  }
}
