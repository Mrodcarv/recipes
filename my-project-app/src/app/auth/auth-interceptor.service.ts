import { HttpHandler, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { take, exhaustMap } from "rxjs";


@Injectable()
export class AuthInterceptorService{
constructor(private authservice:AuthService){}

intercept(req: HttpRequest<any>, next: HttpHandler){
    return this.authservice.user.pipe(
        take(1),
        exhaustMap(user => {
            if(!user){
                return next.handle(req)
            }
          const modifiedReq = req.clone({
            params: new HttpParams().set('auth', user.token)
          })
          return next.handle(modifiedReq) 
        }))
}

}