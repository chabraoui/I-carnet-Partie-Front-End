import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
url:any='http://localhost:5859'
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(this.url+'/addresses');
  }
  saveAddress(data){
    return this.http.post(this.url+'/addresses',data);
  }

  updateAddress(data){
    return this.http.patch(this.url+'/addresses/'+data.addressid,data);
  }

  getOneAddress(id:string){
    return this.http.get(this.url+'/addresses/'+id);
  }

  deleteAddresse(addressId:string){
    return this.http.delete(this.url+'/addresses/'+addressId);
  }

}
