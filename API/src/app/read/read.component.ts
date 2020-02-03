import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../getdata.service';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  constructor(private data: GetdataService) { }
  ngOnInit() {
  	this.data.readposts();
  }

}
