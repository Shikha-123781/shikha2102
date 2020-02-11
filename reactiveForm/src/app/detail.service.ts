import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DetailService {
  userName = new Subject<any>();
  data: any;
  constructor() { }
   
  setData(value){
    this.data = value;
  }

}
