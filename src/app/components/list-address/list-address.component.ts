import { TokenService } from './../../services/token.service';
import { CurrentUserService } from './../../services/current-user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Address } from './../../models/address';
import { AddressService } from './../../services/address.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.css']
})
export class ListAddressComponent implements OnInit {
  page: number=1;
  addres:Address
  listAddress:Address[]=[]
  userCurrent:{
    sub:"",
    id:"",
    name:"",
    exp:""
  };
  hide:boolean=true;
  constructor( private addressService:AddressService,
    private routes:Router,
    private flashmsg:FlashMessagesService,
    private userCurentService:CurrentUserService,
    private tokenService:TokenService) { 

    }

  ngOnInit(): void {
    this.getAllAddresses()
    this.userCurentService.authStatus.subscribe(res=>{
      this.userCurrent=this.tokenService.getInfos()
    })
  }
getAllAddresses(){
  this.addressService.getAll().subscribe((res:Address[]) =>{
  this.listAddress=res;})
}

deleteAddress(address){
  if(confirm('are you sure to delete')){
    this.addressService.deleteAddresse(address).subscribe(()=>{
      let index=this.listAddress.indexOf(address)
      console.log(address)
      this.listAddress.splice(index,1)
    },(error:any)=>{
      alert("la suppression ne marche pas")
    });
    this.flashmsg.show('addresses deleted', {cssClass:'alert-danger', timeout:3000})
      }
}
}
