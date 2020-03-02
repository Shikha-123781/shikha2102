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
  userName: any;
  folderUser: any;
  folderChain : any[];
  isInsideFolder :any;
  folderList = [];
  folder = [];
  folderValue = [];
  fileValue = [];
  file = [];
  fileUser: any;
  fileList = [];
  listView = true;
  gridView = false;

  constructor(private router: ActivatedRoute,
  private route: Router,
  private dialog: MatDialog) { }

  ngOnInit() {
    if (!localStorage.getItem('userName')) {
      this.route.navigateByUrl('/');
    }
    this.router.params.forEach((userName: Params) => {
      this.userName = userName.userName;
    });
    this.folderUser = this.userName + '1'; 
    this.fileUser = this.userName + '2';
    if (localStorage.getItem('folderChain')) {
      this.folderChain = JSON.parse(localStorage.getItem('folderChain'));
    } else {
      this.folderChain = [];
    }
    if (this.folderChain.length) {
      this.isInsideFolder = true;
    }
    if (localStorage.getItem('view')) {
      const view = localStorage.getItem('view');
      if (view == 'listView') {
        this.listView = true;
      } else {
        this.gridView = true;
        this.listView = false;
      }
    }
  }

  ngDoCheck() {
    if (localStorage.getItem(this.folderUser)) {
      this.folderValue = JSON.parse(localStorage.getItem(this.folderUser));
      this.folder = this.folderValue;
    } 
    if (localStorage.getItem(this.fileUser)) {
      this.fileValue = JSON.parse(localStorage.getItem(this.fileUser));
      this.fileValue = this.fileValue;
    }
    if (localStorage.getItem('folderChain')) {
      this.folderChain = JSON.parse(localStorage.getItem('folderChain'));
    } else {
      this.folderChain = [];
      localStorage.setItem('folderChain',JSON.stringify(this.folderChain))
    }
    let folderChainLength = this.folderChain.length;
    this.fileList = [];
    this.folderList = [];
    if (folderChainLength==0) {
      this.forLengthZero();
    } else {
      this.forLengthExist(folderChainLength);
    } 
  }

  forLengthZero() {
    let index = -1;
    for (let count=0;count<this.fileValue.length;count++) {
      if (typeof(this.fileValue[count])!='object') {
        this.fileList[++index] = this.fileValue[count];
      }
    }
    index = -1;
    for (let count=0;count<this.folderValue.length;count++) {
      this.folderList[++index] = Object.keys(this.folderValue[count])[0];
    }
  }

  forLengthExist(folderChainLength) {
    let key,folderChainIndex = 0;
    while(folderChainLength) {
      this.folderList = [];
      this.fileList = [];
      for (let index in this.folderValue) {
        key = Object.keys(this.folderValue[index])[0];
        if (key == this.folderChain[folderChainIndex]) {
          this.folderValue= this.folderValue[index][key];
          break;
        } 
      }
      if (this.folderValue.length) { 
        for (let index = 0; index < this.folderValue.length; index++){
          this.folderList[index]=Object.keys(this.folderValue[index])[0];
        }
      } 
      for (let index in this.fileValue) {
        if (typeof(this.fileValue[index])=='object') {
          const key = Object.keys(this.fileValue[index])[0];
          if (key == this.folderChain[folderChainIndex]) {
            this.fileValue= this.fileValue[index][key];
            break;
          } 
        }
      }
      let count = -1;
      this.fileList = [];
      if (this.fileValue.length) { 
        for (let index in this.fileValue){
            if (typeof(this.fileValue[index])!='object') {
              this.fileList[++count]=this.fileValue[index];
            }
        }
      } 
      folderChainIndex++;
      folderChainLength--;
    }  
  }

  folderAdd(folderName) {
    let index = 0;
    if (this.isInsideFolder) {
      this.addFolder(this.folder,this.folderChain[0],folderName,index); 
      this.addFolder(this.file,this.folderChain[0],folderName,index);   
    } else {
      if (localStorage.getItem(this.folderUser)) {
        this.folder = JSON.parse(localStorage.getItem(this.folderUser));
        this.folder.push({[folderName]:[]});
        if (localStorage.getItem(this.fileUser)) {
          this.file = JSON.parse(localStorage.getItem(this.fileUser));
        }
        this.file.push({[folderName]:[]});
      } else {
        this.folder.push({[folderName]:[]});
        if (localStorage.getItem(this.fileUser)) {
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
    let index=0;
    if (localStorage.getItem(this.fileUser)) {
      this.file= JSON.parse(localStorage.getItem(this.fileUser));
    } else {
      this.file = [];
    }
    if (this.isInsideFolder) {
      this.addFile(this.file,this.folderChain[0],fileName,index);   
    } else {
      this.file.push(fileName);
    } 
    let str = JSON.stringify(this.file);
    localStorage.setItem(this.fileUser,str);
  }

  onClick(name) {
    this.isInsideFolder = true;
    this.folderChain.push(name);
    localStorage.setItem('folderChain',JSON.stringify(this.folderChain));
  }

  addFolder(directory,targetFolder,folderName,index) {
    if (directory && directory.length) {
      directory.forEach(dir => {
        if (dir[targetFolder]) {
          if (index == (this.folderChain.length)-1) {
            dir[targetFolder].push({
              [folderName]: []
            });
          } else {
            const innerDir = Object.values(dir);
            innerDir.forEach(d => this.addFolder(d,this.folderChain[++index], 
            folderName,index))
          } 
        }
      });
    }
  }

  addFile(directory,targetFolder,fileName,index) {
    if (directory && directory.length) {
      directory.forEach(dir => {
        if(typeof(dir)=='object') {
          if (dir[targetFolder]) {
            if (index == (this.folderChain.length)-1) {
              dir[targetFolder].push(fileName);
            } else {
              const innerDir = Object.values(dir);
              innerDir.forEach(d => this.addFile(d,this.folderChain[++index], 
              fileName,index))
            } 
          }
        }
      });
    }
  }

  back() {
    this.folderChain.pop();
    localStorage.setItem('folderChain',JSON.stringify(this.folderChain));
  }   

  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('folderChain');
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

  dialogOpen(type) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      height:'300px',
      data: {type:type,userName:this.userName, title: 'Enter ' + type + ' name'},
      disableClose: true
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (type=="folder") {
          this.folderAdd(result.name);
        } else {
          this.fileAdd(result.name);
        }
      }
    });
  }
}
