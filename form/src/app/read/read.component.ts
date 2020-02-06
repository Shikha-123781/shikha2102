import { Component, OnInit } from '@angular/core';
import { GetPostsService } from '../getposts.service';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  str: String;
  posts: Object;
  constructor(private data:GetPostsService) { }
  ngOnInit() {
  	this.data.getPosts().subscribe(item=> {
  		this.posts = item;	
    })
  }
}
