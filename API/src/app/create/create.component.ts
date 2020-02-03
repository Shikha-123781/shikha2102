import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../getdata.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
 posts: Object;
 str: String;
  constructor( private data:GetdataService) { }

  ngOnInit() {
  	this.data.getposts().subscribe(item=> {
  		this.posts = item;

  		this.str = JSON.stringify(this.posts);
  		console.log(this.posts);
  		
  	})
  }

}
