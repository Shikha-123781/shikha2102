import { Component, OnInit } from '@angular/core';
import { GetPostsService } from '../getposts.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
userid: String;
title: String;
body: String;

data: Object;
  constructor(private item: GetPostsService) { }

  ngOnInit() {
  }
  add(){
  this.data = {userId: this.userid, title: this.title, body: this.body};
  	this.item.getPost(this.data);
  	alert("your data is added");
  }

}
