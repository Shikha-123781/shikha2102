import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GetpostsService } from '../getposts.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  x: any;
  constructor( private route: ActivatedRoute, private data: GetpostsService) { }

  ngOnInit() {
    console.log(this.route);
  	this.route.params.forEach((params:Params)=>{
   	this.data.getdelete(params['abc']);
 	});
   }
}
 