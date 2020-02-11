import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { DetailService } from './detail.service';
import { FormComponent } from './form/form.component';
@NgModule({
  declarations: [
    AppComponent,
    ShowDetailsComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule 
  ],
  providers: [DetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
