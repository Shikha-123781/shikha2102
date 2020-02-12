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
  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
  	this.form = this.fb.group({
      userName: ['',Validators.required],
      password: ['',Validators.required]
    }); 
  }
  
  onSubmit() {
  	let userName = this.form.get('userName').value;
  	this.data = localStorage.getItem(this.form.get('userName').value);
  	let obj = JSON.parse(this.data);
    if(this.data == null)
      alert('UserName does not match to any registered name')
    else if(obj.password != this.form.get('password').value)
      alert('wrong password')
    else 
      alert('valid username and password')
  }

}
