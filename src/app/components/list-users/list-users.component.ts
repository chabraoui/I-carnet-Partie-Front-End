import { FlashMessagesService } from 'angular2-flash-messages';
import { listUser } from './../../models/listUser';
import { ListUsersService } from './../../services/list-users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
status:boolean=false;
  listUsers:listUser[]
  user:{
    userId:null
    firstName:"",
    lastName:""
  }
    
  constructor(private listService:ListUsersService, private flash:FlashMessagesService) { }

  ngOnInit(): void {
this.listService.getAllUsers().subscribe((res:listUser[])=>{
 this.listUsers=res;

})
  }

  edite(list){
this.user=list
this.status = !this.status
  }

  update(){
    this.listService.updateUser(this.user).subscribe(res=>{
this.status= !this.status
this.flash.show('User Updated with success',{cssClass:'alert-success',timeout:3000})
    })
  }
  annuler(){
    this.user={
        userId:null,
        firstName:"",
        lastName:""
    }
    this.status= !this.status
  }

  delet(list){
    if(confirm('are you sure to delete')){
      this.listService.delete(list).subscribe(()=>{
        let index=this.listUsers.indexOf(list)
        this.listUsers.splice(index,1)
      },(error:any)=>{
        alert("la suppression ne marche pas")
      });
      this.flash.show('User deleted wuth succes', {cssClass:'alert-danger', timeout:3000})
    }

  }

}
