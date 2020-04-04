import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../getdata.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  response: any;
  constructor(private data: GetdataService) { }
  ngOnInit() {
  }
  GetChildData(data){  
   this.data.readposts(data).subscribe((response)=>{ this.response = response;});  
  }  
}

