import { Component, OnInit } from '@angular/core';
import { GetPostsService } from '../getposts.service';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  item: Object;
  userid: any;
  title: any;
  body: any;
  dt: any;
  constructor(private data: GetPostsService, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.forEach((params:Params)=>{
 	 	this.dt=params['abc']; 
  	});
  }
  update(){
this.item = { userId: this.userid, title: this.title, body: this.body };
  	this.data.getUpdate(this.dt,this.item);
  	alert("your data is updated");
  }

}
