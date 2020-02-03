import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GetdataService } from './getdata.service';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { ReadComponent } from './read/read.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    UpdateComponent,
    DeleteComponent,
    ReadComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [GetdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
