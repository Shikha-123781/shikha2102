import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormControl,FormGroup, FormBuilder,Validators } from '@angular/forms';
import { DetailService } from '../detail.service';
@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {
  firstName: String;
  userData: any;
  data: any;
  constructor(private detailService: DetailService) {
  }

  ngOnInit() {
    console.log(this.data); 
    this.data = this.detailService.data;
  }

}
