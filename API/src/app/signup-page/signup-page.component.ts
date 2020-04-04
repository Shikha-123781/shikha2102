import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AbstractControl,FormControl,FormGroup, FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  formGroup: FormGroup;
  @Output() signupInfo:EventEmitter<string>= new EventEmitter();

  constructor(private router: Router,private fb: FormBuilder) { }
 
  ngOnInit() {
  	this.formGroup = this.fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email, Validators.pattern('[^$&*()#!?/|{;<>}]+$')]],
      password: ['',[Validators.required]],
      gender: ['',[Validators.required]],
    });
  }

 submitForm(form) {
  if(this.formGroup.valid) {
   	let firstName = form.controls.firstName.value;
   	let lastName = form.controls.lastName.value;
   	let email = form.controls.email.value;
   	let password = form.controls.password.value;
   	let gender = form.controls.gender.value;
   	let data = {"firstName":firstName,"lastName":lastName,
   	"email":email,"password":password,"gender":gender}
   	this.signupInfo.emit(data);
  } else {
    alert("invalid form details");
  }
 }
}
