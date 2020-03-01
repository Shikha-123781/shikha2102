import { Component, OnInit,Input, Output, EventEmitter, Inject } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { AbstractControl,FormControl,FormGroup, FormBuilder,Validators } from '@angular/forms';
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
  @Input() folderFlag:boolean;
  @Input() fileFlag:boolean;
  folderName: any;
  fileName: any;
  form : FormGroup;
  arr: any[];
  flag: boolean;
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
    let key,count,folder;
    this.arr = JSON.parse(localStorage.getItem('array'));
    if(this.data.type == 'folder')
      folder = JSON.parse(localStorage.getItem(this.data.username+'1'));
    else
      folder = JSON.parse(localStorage.getItem(this.data.username+'2'));
    for(let index=0;index<this.arr.length;index++) {
      key = this.arr[index];
      for(count=0;count<folder.length;count++) {
        if(typeof(folder[count]) == 'object') {
          if(Object.keys(folder[count])[0]==key) {
            break;
          }
        }
      }
      folder = folder[count][key];
    }
    if(this.data.type == 'folder') {
      if(folder) {
        for(let index=0;index<folder.length;index++) {
          if(name == Object.keys(folder[index])[0]) {
            this.flag = true;
            break;
          }
        }
      }
      if(!this.flag) {
        this.flag = false;
      }
    } else {
      for(let index=0;index<folder.length;index++) {
        if(typeof(folder[index])!= 'object') { 
          if(name == folder[index]) {
            this.flag = true;
              break;
          }
        }
      } 
      if(this.flag!= true)
        this.flag = false;
    }
    if(this.flag == false) {
      this.dialogRef.close(this.form.value);
    }
  }
}