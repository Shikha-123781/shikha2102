import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadComponent } from './read/read.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import {AddComponent} from './add/add.component';
const routes: Routes = [{path:"add", component:AddComponent},
  {path:"", component:ReadComponent}, {path:"delete/:abc",
  component:DeleteComponent}, {path:"add", component: AddComponent},
  {path:"update/:abc", component: UpdateComponent}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
