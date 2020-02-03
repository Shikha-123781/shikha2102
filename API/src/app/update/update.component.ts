import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../getdata.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  constructor(private item: GetdataService) { }
  ngOnInit() {
  	this.item.updateposts();
  }

}
