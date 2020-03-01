import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule,MatFormFieldModule, 
  MatButtonModule, MatIconModule, MatInputModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ShowDetailsComponent,
    DialogComponent,
    SignupDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StorageServiceModule ,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,MatInputModule
  ],
  entryComponents: [
    DialogComponent,
    SignupDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }