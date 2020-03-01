import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ShowDetailsComponent } from './show-details/show-details.component';

const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'signup', component: SignupComponent },
  {path:'showDetails/:abc', component: ShowDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }