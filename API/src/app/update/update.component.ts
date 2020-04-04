import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../getdata.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
	response: any;
	id: any;
  constructor(private data: GetdataService,private route: ActivatedRoute, private router: Router) { }
  response: any;
  ngOnInit() {
  
  }
  GetChildData(data){  
	this.route.params.forEach((params:Params) => {
      this.id = params.id;
    });
  	 this.data.updateposts(this.id,data).subscribe((response=>{
  	 	this.response = response;
  	 }));
  	 this.router.navigateByUrl("/read");
  }
}
