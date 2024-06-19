import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {CarListComponent} from "./cars/car-list/car-list.component";
import {LoginComponent} from "./loginPage/login/login.component";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./registerPage/register/register.component";
import {AuthGuard} from "./AuthenticationGuard/authentication-guard.service";
import {AddCarPageComponent} from "./add-car-page/add-car-page.component";


export const routes: Routes = [
  {
    path: 'Home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Register',
    component: RegisterComponent
  },
  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'add-a-car',
    component: AddCarPageComponent
  },

  {
    path: 'update-a-car',
    component: AddCarPageComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
