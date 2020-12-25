import { TokenService } from './../../services/token.service';
import { CurrentUserService } from './../../services/current-user.service';
import { Component, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
admin
recId:string;
  userCurrent:{
    sub:"",
    id:"",
    name:"",
    exp:""
  };

  //propos:any={
    //userId:"",
    //firstName:"",
    //lastName:"",
    //email:"",
    //admin:""
  //}
  userCurrentName:string;
  userCurrentNameOrPrenom:string;
  constructor(private currentService:CurrentUserService,
              private tokenService:TokenService,
              private router:Router) { }

  ngOnInit(): void {
    this.currentService.authStatus.subscribe(res=> {
      this.userCurrent=this.tokenService.getInfos()
      this.recId=this.tokenService.getId()
      this.admin= this.tokenService.getAdmin()
    } )
    //this.currentService.getParamOneUserLogin(this.recId).subscribe(res=>{
    // this.propos=res
    //})

  }



  loggedOut(){
    this.tokenService.remove();
    this.router.navigateByUrl('/login');
    this.currentService.changeStatus(false);
  }

}
