import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GetPostsService } from '../getposts.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  x: any;
  constructor( private route: ActivatedRoute, private data: GetPostsService) { }

  ngOnInit() {
    console.log(this.route);
  	this.route.params.forEach((params:Params)=>{
   	this.data.getDelete(params['abc']);
 	});
   }
}
 