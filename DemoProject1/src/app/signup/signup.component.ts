import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl,FormControl,FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

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
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
  private fb: FormBuilder, private activatedRoute: ActivatedRoute, 
  private router: Router) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      Name: ['',Validators.required],
      userName: ['',Validators.required],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: ['']
      }),
      age: ['',[Validators.required, this.validateAge,Validators.pattern('[0-9]{2}')]],
      email: ['',[Validators.required,Validators.email, Validators.pattern('[^$&*()#!?/|{;<>}]+$')]],
      password: ['',Validators.required],
      confirmPassword: ['',[Validators.required]]
    }, { validator: this.passwordMatch }); 
  }
  
  passwordMatch(c: AbstractControl) {
    if(c.get('password').value != c.get('confirmPassword').value) {
      return { passwordMismatch: true };
    } else {
        return null ;
      }
  }
   
  validateAge(control: FormControl) {
    if(control.value < 18 )
      return { validAge: true };
    else
      return null;
  }

  onSubmit() {
  	let flag = 0;
    this.submitted = true;
    if(this.formGroup.valid) {	
      const data = {
       Name: this.formGroup.get('Name').value, userName: this.formGroup.get('userName').value, age: this.formGroup.get('age').value,
        email: this.formGroup.get('email').value,
        password: this.formGroup.get('password').value 
      };    
     let str = JSON.stringify(data);
     const length = localStorage.length;
     for(let i=0;i<length;i++) {
     	let item = localStorage.getItem(localStorage.key(i));
     	item = JSON.parse(item);
       if(data.userName == localStorage.key(i)||data.email == item.email) {
       	flag = 1;
       	break;
       }
     }
     if(flag == 0)
     localStorage.setItem(data.userName, str);
     else
       alert('userName or email already registerd');
    }

    this.router.navigateByUrl('/');
  }

  resetForm() {
    this.formGroup.reset();
  }
}
