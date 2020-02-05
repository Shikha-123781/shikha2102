import { Component, OnInit } from '@angular/core';
import { GetpostsService } from '../getposts.service';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  str: String;
  posts: Object;
  constructor(private data:GetpostsService) { }

  ngOnInit() {
  	this.data.getposts().subscribe(item=> {
  		this.posts = item;
  		this.str = JSON.stringify(this.posts);
  })

}
}
