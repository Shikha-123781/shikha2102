import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl,FormControl,FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {SignupDialogComponent} from '../signup-dialog/signup-dialog.component';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { HttpRequestService } from '../http-request.service';

declare const $:any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  submitted = false;
  title = 'reactiveForm';
  formGroup: FormGroup;
  isHidden = false;
  value: any;
  item = 'item';
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, 
  private router: Router, private dialog: MatDialog, private service: HttpRequestService) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      userName: ['', [Validators.required, this.userExist.bind(this)]],
      age: ['', [Validators.required, this.validateAge,
      Validators.pattern('[0-9]{2}')]],
      email: ['', [Validators.required, Validators.email, 
      Validators.pattern('[^$&*()#!?/|{;<>}]+$'), this.emailExist.bind(this)]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatch }); 
  }
  
  passwordMatch(c: AbstractControl) {
    if (c.get('password').value != c.get('confirmPassword').value) {
      return { passwordMismatch: true };
    } else {
        return null ;
      }
  }
   
  validateAge(control: FormControl) {
    if (control.value < 18 ) {
      return { validAge: true };
    } else {
      return null;
    }
  }

  async userExist(control: FormControl) { 
    let response = await this.service.readPosts();
      for(let item of response) {
        if(control.value==item['userName']) {
          return {validUser: true};
        }
      }
        return null;
    
  }
  
  async emailExist(control: FormControl) {
     let response = await this.service.readPosts();
        for(let item of response) {
            if (control.value == item['email']) {
              return {emailExist: true};
            }
        }
        return null;
  }

  async onSubmit() {
    this.submitted = true;
    if (this.formGroup.valid) {
      const detail = { "name": this.formGroup.get('name').value,
      "userName": this.formGroup.get('userName').value,"age": this.formGroup.get('age').value,
      "email": this.formGroup.get('email').value,
      "password": this.formGroup.get('password').value }; 
     let response = await this.service.insertPosts(detail);

      this.dialog.open(SignupDialogComponent);
    }
  }


  resetForm() {
    this.formGroup.reset();
  }

  dataInserted() {
    this.router.navigateByUrl('/');  
  }
}
