import { Component } from '@angular/core';
import { AbstractControl,FormControl,FormGroup, FormBuilder,Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  submitted = false;
  title = 'reactiveForm';
  group: FormGroup;
  isHidden= false;

  constructor(private fb: FormBuilder){
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
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required],
      confirmPassword: ['',[Validators.required]]
    }, { validator: this.passwordMatch });
  }

  passwordMatch(c: AbstractControl) {
    if(c.get('password').value != c.get('confirmPassword').value) {
      return { passwordMismatch: true };
    } else {
        return { passwordMismatch: false };
     }
  }

  onSubmit() {
    this.submitted = true;
  }
}
