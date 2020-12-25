import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AddressService } from './../../services/address.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  constructor(private addressService:AddressService,private route:Router,private flash:FlashMessagesService) { }

  saveAddressForm=new FormGroup({
    country:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
    city:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
    street:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(40)]),
    type:new FormControl(null,[Validators.required])
  })

  ngOnInit(): void {
  }
createAddress(){
  this.addressService.saveAddress(this.saveAddressForm.value).subscribe(res =>{
    this.saveAddressForm.reset();
    this.route.navigateByUrl('/addresses')
    this.flash.show('Address Created with success',{cssClass:'alert-success',timeout:3000})
  })
}
}
