import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../getdata.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  constructor(private data:GetdataService) { }
  ngOnInit() {
  	this.data.deleteposts();
  	let abc = this.data.getposts();
  	console.log(abc);

  }

}
