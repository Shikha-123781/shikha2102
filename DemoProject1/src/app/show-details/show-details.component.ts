import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {DialogComponent} from '../dialog/dialog.component';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
declare const $:any;
@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})

export class ShowDetailsComponent implements OnInit {
  param1: any;
  obj: any;
  folderUser: any;
  object: any;
  folder:any;
  file:any;
  arr : any[];
  current :any;
  keys : any[];
  folderKey = [];
  value: any[];
  index = [];
  values = [];
  val : any[];
  vals = [];
  fileUser: any;
  fileKey = [];
  listView : boolean;;
  gridView : boolean;
  constructor(private router: ActivatedRoute,
  private route: Router,
  private dialog: MatDialog) { }

  ngOnInit() {
    if(!localStorage.getItem('userName'))
      this.route.navigateByUrl('/');
    let k =-1;
    this.router.params.forEach((params:Params) => {
      this.param1 = params.abc;
    });
    this.folderUser = this.param1+'1'; 
    this.fileUser = this.param1+'2';
    this.ngDoCheck();
    if(localStorage.getItem(this.fileUser)) {
      this.val = JSON.parse(localStorage.getItem(this.fileUser));
    } else {
        this.val = [];
    } 
    if(localStorage.getItem(this.folderUser)) {
      this.value = JSON.parse(localStorage.getItem(this.folderUser));
    } else {
        this.value = [];
    }
    if(localStorage.getItem('array')) {
      this.arr = JSON.parse(localStorage.getItem('array'));
    } else {
      this.arr = [];
    }
    if(this.arr.length) {
      this.current = true;
    }
    if(localStorage.getItem('view')) {
      let view = localStorage.getItem('view');
      if(view == 'listView')
        this.listView = true;
      else 
        this.gridView = true;
    } else {
        this.listView = true;
    }
    
  }

  ngDoCheck() {
    if(localStorage.getItem(this.folderUser))
      this.values = JSON.parse(localStorage.getItem(this.folderUser));
    else
      this.values = [];
    if(localStorage.getItem(this.fileUser))
      this.vals = JSON.parse(localStorage.getItem(this.fileUser));
    else
      this.vals = [];
    if(localStorage.getItem('array')) {
      this.arr = JSON.parse(localStorage.getItem('array'));
    } else {
      this.arr = [];
      localStorage.setItem('array',JSON.stringify(this.arr))
    }
    let length = this.arr.length;
    this.fileKey = [];
    this.folderKey = [];
    let k = 0,index =-1;
    let key;
    if(length==0) {
      for(let count=0;count<this.vals.length;count++) {
        if(typeof(this.vals[count])!='object') {
          this.fileKey[++index] = this.vals[count];
        }
      }
      index = -1;
      for(let count=0;count<this.values.length;count++) {
        this.folderKey[++index] = Object.keys(this.values[count])[0];
      }
    }
    while(length) {
      this.folderKey = [];
      for(let index=0;index<this.values.length;index++) {
        key = Object.keys(this.values[index])[0];
        if(key == this.arr[k]) {
          this.values= this.values[index][key];
          break;
        } 
      }
      if(this.values.length) { 
        for(let l=0;l<this.values.length;l++){
          this.folderKey[l]=Object.keys(this.values[l])[0];
        }
      } else {
          this.folderKey =[];
      }
      for(let index=0;index<this.vals.length;index++) {
        if(typeof(this.vals[index])=='object') {
          key = Object.keys(this.vals[index])[0];
          if(key == this.arr[k]) {
            this.vals= this.vals[index][key];
            break;
          } 
        }
      }
      let count = -1;
      this.fileKey = [];
      if(this.vals.length) { 
        for(let index=0;index<this.vals.length;index++){
            if(typeof(this.vals[index])!='object') {
              this.fileKey[++count]=this.vals[index];
            }
        }
      } else {
        this.fileKey =[];
      }
      k++;
      length--;
    }  
    if(!this.arr.length) {
      if(this.values) {
        for(let count=0;count<this.values.length;count++) {
    
          this.folderKey[count] = Object.keys(this.values[count])[0];   
        }
      }
    }
  }

  folderAdd(folderName) {
    let k=0,key,index=0,folder;
    if(localStorage.getItem(this.folderUser)) {
      this.folder = JSON.parse(localStorage.getItem(this.folderUser));
      this.file = JSON.parse(localStorage.getItem(this.fileUser));
    } else {
        this.folder = [];
        this.file = [];
    }
    if(this.current) {
      this.addFolder(this.folder,this.arr[0],folderName,index); 
      this.addFolder(this.file,this.arr[0],folderName,index);   
    } else {
      if(localStorage.getItem(this.folderUser)) {
        this.value = JSON.parse(localStorage.getItem(this.folderUser));
        this.value.push({[folderName]:[]});
        this.folder = this.value;
        if(localStorage.getItem(this.fileUser)) {
          this.file = JSON.parse(localStorage.getItem(this.fileUser));
        }
        this.file.push({[folderName]:[]});
      } else {
        this.value.push({[folderName]:[]});
        this.folder = this.value;
        if(localStorage.getItem(this.fileUser)) {
          this.file = JSON.parse(localStorage.getItem(this.fileUser));
        }
        this.file.push({[folderName]:[]});
      }
    }
    let str = JSON.stringify(this.folder);
    localStorage.setItem(this.folderUser,str);
    str = JSON.stringify(this.file);
    localStorage.setItem(this.fileUser,str);
  }

  fileAdd(fileName) {
    let k=0,key,index=0,folder;
    if(localStorage.getItem(this.fileUser)) {
      this.file= JSON.parse(localStorage.getItem(this.fileUser));
    } else {
      this.file = [];
    }
    if(this.current) {
      this.addFile(this.file,this.arr[0],fileName,index);   
    } else {
      this.file.push(fileName);
    } 
    let str = JSON.stringify(this.file);
    localStorage.setItem(this.fileUser,str);

  }

  onClick(name) {
    this.current = true;
    this.folderKey =[];
    this.fileKey = [];
    let key;
    this.arr.push(name);
    localStorage.setItem('array',JSON.stringify(this.arr));
    let k =0;
    let j = this.arr.length;
    this.values = JSON.parse(localStorage.getItem(this.folderUser));
    this.vals = JSON.parse(localStorage.getItem(this.fileUser));
    while(j) {
      for(let index=0;index<this.values.length;index++) {
        key = Object.keys(this.values[index])[0];
        if(key == this.arr[k]) {
          this.values= this.values[index][key];
          break;
        } 
      }
      for(let index=0;index<this.vals.length;index++) {
        if(typeof(this.vals[index])== 'object') {
          key = Object.keys(this.vals[index])[0];
          if(key == this.arr[k]) {
            this.vals= this.vals[index][key];
            break;
          }
        } 
      }
      let count = -1;
      if(this.vals.length) { 
        this.fileKey = [];
        for(let index=0;index<this.vals.length;index++){
          if(typeof(this.vals[index])!='object') {
            this.fileKey[++count]=this.vals[index];
          }
        }
      } else {
          this.fileKey =[];
      }
      if(this.values.length) { 
        this.folderKey = [];
        for(let index=0;index<this.values.length;index++) {
          this.folderKey[index]=Object.keys(this.values[index])[0];
        }
      } else {
          this.folderKey =[];
      }
      k++;
      j--;
    }
  }

  addFolder(directory,targetFolder,folderName,index) {
    if(directory && directory.length) {
      directory.forEach(dir => {
        if (dir[targetFolder]) {
          if(index == (this.arr.length)-1) {
            dir[targetFolder].push({
              [folderName]: []
            });
          } else {
            const innerDir = Object.values(dir);
            innerDir.forEach(d => this.addFolder(d,this.arr[++index], 
            folderName,index))
          } 
        }
      });
    }
  }

  addFile(directory,targetFolder,fileName,index) {
    if(directory && directory.length) {
      directory.forEach(dir => {
        if(typeof(dir)=='object') {
          if (dir[targetFolder]) {
            if(index == (this.arr.length)-1) {
              dir[targetFolder].push(fileName);
            } else {
              const innerDir = Object.values(dir);
              innerDir.forEach(d => this.addFile(d,this.arr[++index], 
              fileName,index))
            } 
          }
        }
      });
    }
  }

  back() {
    this.arr.pop();
    localStorage.setItem('array',JSON.stringify(this.arr));
    this.values = JSON.parse(localStorage.getItem(this.folderUser));
    this.vals = JSON.parse(localStorage.getItem(this.fileUser));
    let length = this.arr.length;
    this.fileKey = [];
    let k = 0;
    let key;
    while(length) {
      for(let index=0;index<this.values.length;index++) {
        key = Object.keys(this.values[index])[0];
        if(key == this.arr[k]) {
          this.values= this.values[index][key];
          break;
        } 
      }
      if(this.values.length) { 
        for(let index=0;index<this.values.length;index++){
          this.folderKey[index]=Object.keys(this.values[index])[0];
        }
      } else {
          this.folderKey =[];
      }
      for(let index=0;index<this.vals.length;index++) {
         if(typeof(this.vals[index])=='object') {
          key = Object.keys(this.vals[index])[0];
          if(key == this.arr[k]) {
            this.vals= this.vals[index][key];
            break;
          } 
        }
      }
      if(this.vals.length) { 
        for(let index=0;index<this.vals.length;index++){
            if(typeof(this.vals[index])!='object') {
              this.fileKey[index]=this.vals[index];
              console.log(this.fileKey[index])
            }
        }
      } else {
          this.fileKey =[];
      }
      k++;
      length--;
    }  
    if(!this.arr.length) {
      this.values = JSON.parse(localStorage.getItem(this.folderUser));
      for(let count=0;count<this.values.length;count++) {
        this.folderKey[count] = Object.keys(this.values[count])[0];   
      }
    }
  }   

  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('array');
    localStorage.removeItem('view');
    this.route.navigateByUrl("/");
  } 

  viewList() {
    this.listView = true;
    this.gridView = false;
    localStorage.setItem('view','listView');  
  }

  viewGrid() {
    this.listView = false;
    this.gridView = true;
    localStorage.setItem('view','gridView');
  }

  click(type) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      height:'300px',
      data: {type:type,username:this.param1},
      disableClose: true
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result.name) {
        if(type=="folder") {
          this.folderAdd(result.name);
        } else {
          this.fileAdd(result.name);
        }
      }
    });
  }
}