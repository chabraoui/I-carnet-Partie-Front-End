import { CurrentUserService } from './../services/current-user.service';
import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AfterAuthGuard implements CanActivate {

  constructor(private tokenService:TokenService,
     private currentService:CurrentUserService ,
      private route:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.tokenService.loggedIn()){
      this.route.navigateByUrl("/");
      return false;

    }
    return true;
  }
  
}
