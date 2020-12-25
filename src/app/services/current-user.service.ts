import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
private loggedIn=new BehaviorSubject<boolean>(this.tokenService.loggedIn());

//pour le convertir en observoble
authStatus=this.loggedIn.asObservable();
  constructor(private tokenService:TokenService, private http:HttpClient) { }

  changeStatus(value:boolean){
    this.loggedIn.next(value);
  }


getParamOneUserLogin(userid:string){
return this.http.get("http://localhost:5859/users/"+userid);
}

}
