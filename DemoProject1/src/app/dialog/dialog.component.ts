import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { AbstractControl, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
declare const $:any;
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @Output() folderAdd = new EventEmitter(); 
  @Output() fileAdd = new EventEmitter(); 
  @Input() folderFlag: boolean;
  @Input() fileFlag: boolean;
  folderName: any;
  fileName: any;
  form : FormGroup;
  folderChain: any[];
  isNameAlreadyExist = false;
  notExistName = false;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', []]
    });
  }
 
  onClick() {
    this.folderAdd.emit(this.folderName);
  }

  click() {
    this.fileAdd.emit(this.fileName); 
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    let name = this.form.get('name').value;
    let key;
    let count;
    let directory = [];
    if(name) {
      this.folderChain = JSON.parse(localStorage.getItem('folderChain'));
      if (this.data.type == 'folder') {
        directory = JSON.parse(localStorage.getItem(this.data.userName+'1'));
      } else {
        directory = JSON.parse(localStorage.getItem(this.data.userName+'2'));
      }
      for (let index in this.folderChain) {
        key = this.folderChain[index];
        for (count = 0; count < directory.length; count++) {
          if (typeof(directory[count]) === 'object') {
            if (Object.keys(directory[count])[0]==key) {
              break;
            }
          }
        }
        directory = directory[count][key];
      }
      if (this.data.type == 'folder') {
        if (directory) {
          for (let index in directory) {
            if (name == Object.keys(directory[index])[0]) {
              this.isNameAlreadyExist = true;
              break;
            }
          }
        }
      } else {
        for (let index in directory) {
          if (typeof(directory[index])!= 'object') { 
            if(name == directory[index]) {
              this.isNameAlreadyExist = true;
                break;
            }
          }
        } 
      }
        if (this.isNameAlreadyExist != true) {
          this.dialogRef.close(this.form.value);
        }
    } else {
      this.notExistName = true;
    }
  }
}
