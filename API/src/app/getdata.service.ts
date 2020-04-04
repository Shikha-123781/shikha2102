import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor( private http :HttpClient) { }
  getposts(){
  //	return this.http.get("https://cors-anywhere.herokuapp.com/http://localhost/signupAPI/get.php");
    return this.http.get("http://localhost/signupPageAPI/get.php");
  }
  readposts(data){
  	return this.http.post("http://localhost/signupPageAPI/post.php",data);
  }
  deleteposts(id){
  return this.http.delete("http://localhost/signupPageAPI/delete.php/"+id);
  }
   updateposts(id,data){
   	return this.http.put("http://localhost/signupPageAPI/put.php/"+id,data);
   }
}
