import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReadComponent } from './read/read.component';
import { GetpostsService } from './getposts.service';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import { AddComponent } from './add/add.component';
@NgModule({
  declarations: [
    AppComponent,
    ReadComponent,
    DeleteComponent,
    UpdateComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [GetpostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
