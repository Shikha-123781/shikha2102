import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http :HttpClient) { }
  
  readPosts() {
    return this.http.get("http://localhost/signupPageAPI/get.php").toPromise();
  }

  insertPosts(data) {
  	return this.http.post("http://localhost/signupPageAPI/post.php",data).toPromise();
  }

  deletePosts(id) {
    return this.http.delete("http://localhost/signupPageAPI/delete.php/"+id).toPromise();
  }

  updatePosts(id,data) {
   	return this.http.put("http://localhost/signupPageAPI/put.php/"+id,data).toPromise();
  }

  readPostByuserName(userName) {
    return this.http.post("http://localhost/signupPageAPI/getInfoByUsername.php",userName).toPromise();
  }

  updateStructure(folder,file,folderChain,view,userName) {
    let data = {"folder":folder,"file":file,"folderChain":folderChain,"view":view,"userName":userName};
    return this.http.put("http://localhost/signupPageAPI/updateFolderStructure.php",data).toPromise();
  }
   
  remove(id) {
    return this.http.delete("http://localhost/signupPageAPI/deleteLoginCredential.php/"+id).toPromise();
  }
}
