import { Component, OnInit } from '@angular/core';
import { GetpostsService } from '../getposts.service';
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
  constructor(private item: GetpostsService) { }

  ngOnInit() {
  }
  add(){
  this.data = {userId: this.userid, title: this.title, body: this.body};
  	this.item.getpost(this.data);
  	alert("your data is added");
  }

}
