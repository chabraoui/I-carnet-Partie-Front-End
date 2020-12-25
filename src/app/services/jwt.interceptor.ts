import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
data:any
  constructor(private tokenService:TokenService , private http : HttpClient) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

if(!this.tokenService.loggedIn()) return next.handle(request);
    let requests = request.clone({
      setHeaders:{
        authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
    return next.handle(requests);
  }
}
