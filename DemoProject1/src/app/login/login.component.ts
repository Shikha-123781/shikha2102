import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequestService } from '../http-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data: any;
  loginForm: FormGroup;
  submitted = false;
  flag = false;;
  password = null;
  constructor(private fb: FormBuilder, private router: ActivatedRoute, 
    private route: Router, private service: HttpRequestService) { }

  ngOnInit() {
    if (localStorage.getItem('userName')){
      this.route.navigateByUrl('/showDetails/'+localStorage.getItem('userName'));
    }
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, this.validUserName.bind(this)]],
      password: ['', Validators.required]}, 
      { validator: this.passwordMatch.bind(this) }
    );   
  }

  onSubmit() {   
    this.submitted = true;
    let userName = this.loginForm.get('userName').value;
    console.log(this.loginForm);
    if (this.loginForm.valid) {
      this.route.navigateByUrl('/showDetails/'+userName);
    }
  }

  async validUserName(control: FormControl) {
    let userName = control.value;
    let response = await this.service.readPosts();
    console.log(response);
    for(let item of response) {
      if(item['userName']==userName) {
        this.flag=true;
        this.password = item['password'];
        return null;
      }
    }
       this.flag = false;
        return { validUserName: true };
      
  }

  hasPasswordError() {
    return this.loginForm.get('password').errors && this.loginForm.get('password').errors.required
  }

  passwordMatch(control:AbstractControl) {
    let password =  control.get('password').value;
    if(this.flag && password!=this.password) {
      return { passwordMatch: true };
    } 
      return null;
  }  
}

