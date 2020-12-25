import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class RegisteruserService {
  constructor(private http:HttpClient) { }

  save(data){
    return this.http.post("http://localhost:5859/users",data);
  }
}
