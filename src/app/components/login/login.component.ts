import { FlashMessagesService } from 'angular2-flash-messages';
import { CurrentUserService } from './../../services/current-user.service';
import { TokenService } from './../../services/token.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status:boolean=false;
id:any;
  constructor(private authService:AuthService, 
              private tokenService:TokenService,
              private router:Router,
              private currentService:CurrentUserService,
              private flash:FlashMessagesService) { }
  mode:boolean=false
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(12)])
  });
  passwordForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(12)])
  });
  ngOnInit(): void {
  }
  login(){
    this.authService.login(this.loginForm.value).subscribe((res:{token:string,id:string})=>
     {
       this.saveTokenInLocalStorage(res)
       //this.id=res.id;
      },(error:any)=>{
        this.mode=true
        this.loginForm.reset()
        })
      
  }

  saveTokenInLocalStorage(res){
    this.tokenService.handle(res);
    this.currentService.changeStatus(true);
    this.router.navigateByUrl('/addresses')
    this.flash.show('Welcome, you are sign-in',{cssClass:'alert-success',timeout:3000})
  }

  updatePassword(){
    this.authService.passwordupdated(this.passwordForm.value).subscribe(()=>{
      this.passwordForm.reset()
      this.router.navigateByUrl('/login')
      this.flash.show('Congratulation , your password is updated',{cssClass:'alert-success',timeout:3000})
      this.status=false
    })
  }

}
