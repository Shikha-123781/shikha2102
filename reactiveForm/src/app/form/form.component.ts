import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormControl,FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ShowDetailsComponent } from '../show-details/show-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailService } from '../detail.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  submitted = false;
  title = 'reactiveForm';
  group: FormGroup;
  isHidden= false;
  value: any;
  str: String;
  constructor(private fb: FormBuilder, private detailService: DetailService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.group = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
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
    this.submitted = true;
    console.log(this.group);
    if(this.group.valid) {
      	this.value = this.group.get('firstName').value;
      	const data = {firstName: this.group.get('firstName').value, lastName: this.group.get('lastName').value, age: this.group.get('age').value, email: this.group.get('email').value, password: this.group.get('password').value };
      	this.detailService.setData(data);
        this.router.navigateByUrl('/showDetails');
        
      }
   }
   resetForm(){
   	this.group.reset();
   }
}
