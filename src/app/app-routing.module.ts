import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component'

const routes: Routes = [{path:'update', component: UpdateComponent},{path:'delete', component: DeleteComponent},{path:'create', component:CreateComponent },{path:'read', component: ReadComponent},
path: '**' , component: PagenotfoundComponent path:'', component: CreateComponent pathMatch:'full'];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
