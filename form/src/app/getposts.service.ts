import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetPostsService {
  post: Object;
  constructor(private http :HttpClient) { }
  getPosts(){
  	return this.http.get("https://jsonplaceholder.typicode.com/posts");
  }
  getDelete(id){
  	 this.http.delete("https://jsonplaceholder.typicode.com/posts/`${id}`");
  }
  getUpdate(id,item){
    this.http.put("http://jsonplaceholder.typicode.com/posts/`${id}`",item);
  }
  getPost(data){
  	this.http.post("http://jsonplaceholder.typicode.com/posts",data);
  }
}
