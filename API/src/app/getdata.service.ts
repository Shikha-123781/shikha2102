import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor( private http :HttpClient) { }
  getposts(){
  	return this.http.get("https://jsonplaceholder.typicode.com/posts");
  }
  readposts(){
  	let data ='{"name":"sh","salary":"1000","age":"31"}';
  	this.http.post("https://jsonplaceholder.typicode.com/posts/101 ",data);
  }
  deleteposts(){
  	this.http.delete("https://jsonplaceholder.typicode.com/posts/1");
  }
  updateposts(){
  	let data ='{"name":"sh","salary":"1000","age":"31"}';
  	this.http.put("https://jsonplaceholder.typicode.com/posts/1",data);
  }
}
