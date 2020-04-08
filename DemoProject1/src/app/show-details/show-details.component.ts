import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {DialogComponent} from '../dialog/dialog.component';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { HttpRequestService } from '../http-request.service';
declare const $:any;
@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})

export class ShowDetailsComponent implements OnInit {
  userName: any;
  folderUser: any;
  folderChain = [];
  isInsideFolder = false;
  folderList = [];
  folder = [];
  folderValue = [];
  fileValue = [];
  file = [];
  fileUser: any;
  fileList = [];
  view: string;
  listView = true;
  gridView = false;
  response: any;
  res: any;
  id: any;
  isLogin: any;

  constructor(private router: ActivatedRoute,
  private route: Router,
  private dialog: MatDialog, private service: HttpRequestService) { }

  async ngOnInit() {
    this.router.params.forEach((userName: Params)=>{
      this.userName = userName.userName;
    });
    let result = await this.service.readPostByuserName(this.userName);
      if(result['folderChain']) {
        this.folderChain = JSON.parse(result['folderChain']);
      } else {
        this.folderChain = [];
      }
      this.view = result['view'];
      this.id = result['id'];
      this.isLogin = result['isLogin'];
    if (this.folderChain.length) {
      this.isInsideFolder = true;
    }
      if (this.view == 'listView') {
       this.listView = true;
       } else {
         this.gridView = true;
        this.listView = false;
      }
  }

   async ngDoCheck() {
    let result = await this.service.readPostByuserName(this.userName);
    this.res = result;
    if(this.res['folder']) {
        this.folderValue = JSON.parse(this.res['folder']);
        this.folder = this.folderValue;
      }
      if(this.res['file']) {
        this.fileValue = JSON.parse(this.res['file']);
        this.file = this.fileValue;
      }
      if(this.res['folderChain']) {
        this.folderChain = JSON.parse(this.res['folderChain']);
      } else {
        this.folderChain = [];
       let result = await this.service.updateStructure(JSON.stringify(this.folder),JSON.stringify(this.file),JSON.stringify(this.folderChain),this.view,this.userName);
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
     this.fetchFolderAndFile();
      this.folder.push({[folderName]:[]});
      this.file.push({[folderName]:[]});
    }
    this.updateStructure();
  }

  async fetchFolderAndFile() {
    let result = await this.service.readPostByuserName(this.userName);
      this.response = result;
    if(this.response['folder']) {
      this.folder = JSON.parse(this.response['folder']);
    } else {
      this.folder =[];
    }
    if(this.response['file']) {
      this.file = JSON.parse(this.response['file']);
    } else {
      this.file = [];
    }
  }

  async updateStructure() {
    let folder = JSON.stringify(this.folder);
    let file = JSON.stringify(this.file);
    let result = await this.service.updateStructure(folder,file,JSON.stringify(this.folderChain),this.view,this.userName);
  }

  fileAdd(fileName) {
    let index=0;
    this.fetchFolderAndFile();
    if (this.isInsideFolder) {
      this.addFile(this.file,this.folderChain[0],fileName,index);   
    } else {
      this.file.push(fileName);
    } 
    this.updateStructure();
  }

  async onClick(name) {
    this.isInsideFolder = true;
    this.folderChain.push(name);
   let result = await this.service.updateStructure(JSON.stringify(this.folder),JSON.stringify(this.file),JSON.stringify(this.folderChain),this.view,this.userName);
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

  async back() {
    this.folderChain.pop();
   let result = await this.service.updateStructure(JSON.stringify(this.folder),JSON.stringify(this.file),JSON.stringify(this.folderChain),this.view,this.userName);
  }   

  async logout() {
    await this.service.remove(this.id);
    this.route.navigateByUrl("/");
  } 

  async viewList() {
    this.listView = true;
    this.gridView = false;
    await this.service.updateStructure(JSON.stringify(this.folder),JSON.stringify(this.file),JSON.stringify(this.folderChain),'listView',this.userName);  
  }

  async viewGrid() {
    this.listView = false;
    this.gridView = true;
    // localStorage.setItem('view','gridView');
     let result = await this.service.updateStructure(JSON.stringify(this.folder),JSON.stringify(this.file),JSON.stringify(this.folderChain),'gridView',this.userName);  
  }

  dialogOpen(type) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      height:'300px',
      data: {type:type, title: 'Enter ' + type + ' name', userName: this.userName},
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
