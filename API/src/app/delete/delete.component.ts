import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../getdata.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  constructor(private data:GetdataService, private router: Router,private route: ActivatedRoute) { }
  response: any;
  id: any;
  ngOnInit() {
  	this.route.params.forEach((params:Params) => {
      this.id = params.id;
    });
  	 this.data.deleteposts(this.id).subscribe((response=>{
  	 	this.response = response;
  	 }));
  	 this.router.navigateByUrl("/read");

  }

}
