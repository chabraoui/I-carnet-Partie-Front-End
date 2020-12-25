import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RegisteruserService } from 'src/app/services/reegisteruser.service';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})
export class RegisterAccountComponent implements OnInit {

  constructor(private registerservice:RegisteruserService,
    private route:Router,
    private flash:FlashMessagesService) { }

    checkEmail:boolean=false

  registerForm=new FormGroup({
    firstName:new FormControl(null, [Validators.required,Validators.minLength(4), Validators.maxLength(12)]),
    lastName:new FormControl(null, [Validators.required,Validators.minLength(3), Validators.maxLength(18)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(12)])
  })

  ngOnInit(): void {

  }

  save(){
    this.registerservice.save( this.registerForm.value).subscribe(res=>{
      if(res){
        this.flash.show('Congratulation, you are sign-up',{cssClass:'alert-success',timeout:3000})
        this.route.navigate(['/login'])
      }

    },(error:any)=>{
      this.checkEmail=true;
    }
    )
  }

}


