import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent implements OnInit {

  constructor(private router: Router, public dialogRef: MatDialogRef<SignupDialogComponent> ) { }

  ngOnInit() {
  }

  submit(){
  	this.dialogRef.close();
    this.router.navigateByUrl('/');
  }

}
