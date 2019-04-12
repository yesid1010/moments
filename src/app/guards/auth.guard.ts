import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from 'util';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {
  constructor(private auth : AngularFireAuth, private route : Router){}

  // dar permiso al home si el usuario esta autenticado
  canActivate(
    next: ActivatedRouteSnapshot,
    state : RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
      return this.auth.authState.pipe(map(user =>{
          if(isNullOrUndefined(user)){
            this.route.navigate(['/login']);
            return false;
          }else{
            return true;
          }
      }))
    }

}
