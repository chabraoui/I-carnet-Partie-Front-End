import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListUsersService {

  constructor(private http:HttpClient) { }

  getAllUsers(){
    return this.http.get("http://localhost:5859/users");
  }

  updateUser(data){
    return this.http.patch("http://localhost:5859/users/"+data.userId,data)
  }

  delete(data){
    return this.http.delete("http://localhost:5859/users/"+data.userId)
  }
}
