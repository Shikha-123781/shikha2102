import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl,FormControl,FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {SignupDialogComponent} from '../signup-dialog/signup-dialog.component';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
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
  private router: Router, private dialog: MatDialog ) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      userName: ['', [Validators.required, this.userExist]],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: ['']
      }),
      age: ['', [Validators.required, this.validateAge,
      Validators.pattern('[0-9]{2}')]],
      email: ['', [Validators.required, Validators.email, 
      Validators.pattern('[^$&*()#!?/|{;<>}]+$'), this.emailExist]],
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

  userExist(control: FormControl) { 
    const length = localStorage.length;
    for (let i = 0; i < length; i++) {
      if (control.value == localStorage.key(i)) {
        return {validUser: true};
        break;
      }
    }
    return null;
  }
  
  emailExist(control: FormControl) {
    let item;
    const length = localStorage.length;
    for (let i = 0; i < length; i++) {
      item = localStorage.getItem(localStorage.key(i));
      item = JSON.parse(item);
      if (typeof(item) == 'object' && item['email']) { 
        if (control.value == item.email) {
          return {emailExist: true};
          break;
        }
      }
    }
    return null;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formGroup.valid) {
      const detail = { "name": this.formGroup.get('name').value,
      "userName": this.formGroup.get('userName').value,"age": this.formGroup.get('age').value,
      "email": this.formGroup.get('email').value,
      "password": this.formGroup.get('password').value }; 
      localStorage.setItem(this.formGroup.get('userName').value, JSON.stringify(detail));
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
