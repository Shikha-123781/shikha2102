import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { GetdataService } from '../getdata.service';
@Component({
selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
 posts: Object;
 str: String;
  constructor( private data:GetdataService, private router: Router) { }

  ngOnInit() {
    this.data.getposts().subscribe(item=> {
      this.posts = item;  
    })
  }
  put(id) {
  this.router.navigateByUrl("/update/"+id)
  }

  delete(id) {
  this.router.navigateByUrl("/delete/"+id)
  }

}
