import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  //persister en localstorage
  set(data: any) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('id', data.id);
    localStorage.setItem('admin', data.admin);
  }

  handle(data) {
    this.set(data);
  }

  getAdmin() {
    
    return localStorage.getItem('admin');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getId() {
    return localStorage.getItem('id');
  }

  remove() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('admin');
  }

  //decode le token puisque il ne peut decrypté 
  decode(payload) {
    return JSON.parse(atob(payload));
  }

  //recuperer le contenu qui est dans le payload pour le decodé
  payload(token) {
    const payload = token.split('.')[1];
    console.log('payload : ', payload);
    return this.decode(payload);
  }

//verifi" si le token est valid
  isValid() {
    const token = this.getToken();
    const id = this.getId();

    if (token) {

      const payload = this.payload(token);
      if (payload) {
        return id == payload.id;
      }
    }
    return false;
  }

  getInfos() {

    const token = this.getToken();

    if (token) {
      const payload = this.payload(token);
      return payload ? payload : null;
    }

    return null
  }

//verifie si le token est valid
  loggedIn() {
    return this.isValid();
  }
}
