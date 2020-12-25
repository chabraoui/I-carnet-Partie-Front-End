import { CurrentUserService } from './../services/current-user.service';
import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService:TokenService,
     private currentService:CurrentUserService ,
      private route:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(!this.tokenService.loggedIn()){
      this.tokenService.remove();
      this.currentService.changeStatus(false);
      this.route.navigateByUrl("/login");
      return false;

    }
    return true;
  }
  
}
