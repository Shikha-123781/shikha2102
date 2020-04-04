import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { ReadComponent } from './read/read.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupPageComponent } from './signup-page/signup-page.component';


const routes: Routes = [
{path:"", component:CreateComponent},
{path:"update/:id", component:UpdateComponent},
{path:"delete/:id", component:DeleteComponent},
{path:"read", component:ReadComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
