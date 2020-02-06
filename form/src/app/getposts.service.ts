import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetpostsService {
  post: Object;
  constructor(private http :HttpClient) { }
  getposts(){
  	return this.http.get("https://jsonplaceholder.typicode.com/posts");
  }
  getdelete(id){
  	 this.http.delete("https://jsonplaceholder.typicode.com/posts/`${id}`");
  }
  getupdate(id,item){
    this.http.put("http://jsonplaceholder.typicode.com/posts/`${id}`",item);
  }
  getpost(data){
  	this.http.post("http://jsonplaceholder.typicode.com/posts",data);
  }
}
