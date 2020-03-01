import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl,FormControl,FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data: any;
  loginForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private router: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    if(localStorage.getItem('userName')){
      this.route.navigateByUrl('/showDetails/'+localStorage.getItem('userName'));
    }
    this.loginForm = this.fb.group({
      userName: ['',[Validators.required,this.validUserName]],
      password: ['',Validators.required]}, 
      { validator: this.passwordMatch }
    );   
  }

  onSubmit() {   
    this.submitted = true;
    let userName = this.loginForm.get('userName').value;
    if(this.loginForm.valid) {
      localStorage.setItem('userName',userName);
      this.route.navigateByUrl('/showDetails/'+userName);
    }
  }

  validUserName(control: FormControl) {
    let data;
    let userName = control.value;
    if(localStorage.getItem(userName))
      data = localStorage.getItem(userName);
    if(!data) {
      return {validUserName:true}
    } else  {
      return null;
    }
  }

  hasPasswordError() {
    return this.loginForm.get('password').errors && this.loginForm.get('password').errors.required
  }

  passwordMatch(control:AbstractControl) {
   let userName =  control.get('userName').value;
   if(localStorage.getItem(userName)) {
    let password = JSON.parse(localStorage.getItem(userName)).password;
  if(password != control.get('password').value)
    return {passwordMatch: true};
  else
    return null;
   }
  }
}