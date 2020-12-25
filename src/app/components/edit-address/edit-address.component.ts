import { FlashMessagesService } from 'angular2-flash-messages';
import { Address } from './../../models/address';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddressService } from './../../services/address.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  OneAddress:Address
 // status:boolean=true
addressid:String
saveAddressForm=new FormGroup({
  addressid:new FormControl(null),
  country:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
  city:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
  street:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(40)]),
  type:new FormControl(null,[Validators.required])
})
  constructor(private route:ActivatedRoute,private addressService:AddressService,
    private routes:Router, private flash:FlashMessagesService) { }

  ngOnInit(): void {
    this.addressid= this.route.snapshot.paramMap.get('addressId');
    this.addressService.getOneAddress(this.route.snapshot.paramMap.get('addressId')).subscribe((res:Address)=>{
      this.OneAddress=res;
      this.saveAddressForm.patchValue({
        addressid:this.OneAddress.addressId
      })
    })
  }

  //editeaddress(OneAddress){
    //this.status=!this.status
   // this.saveAddressForm.patchValue({
    //  id:OneAddress
    //})
  //}
  modifyAddress(){
    this.addressService.updateAddress(this.saveAddressForm.value).subscribe(res=>{
      this.saveAddressForm.reset();
      this.routes.navigateByUrl('/addresses')
      this.flash.show('Address Updated with success',{cssClass:'alert-success',timeout:3000})
    })
  }


}
